import { z } from "zod";

// Shared building blocks.
const text = z.string().trim().min(1, "Can't be empty");
// Year + month, e.g. "2023-06". Sorts correctly as a plain string, so dates can be compared with < and >.
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM, e.g. 2023-06");

// A link to another page on this site, e.g. "/resume".
export const InternalLinkSchema = z.object({
  label: text,
  href: z.string().startsWith("/", "Internal links start with /"),
});

// A link to another website.
export const ExternalLinkSchema = z.object({
  label: text,
  href: z.url(),
});

export const PageIntroSchema = z.object({
  // Shell path shown in the page title's prompt, e.g. "~" or "~/resume".
  path: z
    .string()
    .regex(/^~(\/[a-z0-9-]+)*$/, 'Use "~" or "~/page", e.g. ~/resume'),
  command: text,
  // Search results and link previews show this under the page title.
  description: text,
  placeholder: text,
});

// Home has real content instead of a placeholder, plus the about section's command.
export const HomePageSchema = PageIntroSchema.omit({
  placeholder: true,
}).extend({
  aboutCommand: text,
  resumeLinkLabel: text,
});

// Resume has real content instead of a placeholder: the PDF link and the section headings.
export const ResumePageSchema = PageIntroSchema.omit({
  placeholder: true,
}).extend({
  download: InternalLinkSchema.extend({
    // Files in public/ are served from the site root, e.g. public/resume.pdf → /resume.pdf.
    href: z
      .string()
      .regex(/^\/[\w-]+\.pdf$/, "Use a PDF in public/, e.g. /resume.pdf"),
  }),
  // Listed in the order they appear on the page.
  sections: z.object({
    summary: text,
    experience: text,
    skills: text,
    education: text,
  }),
});

// Contact has real content instead of a placeholder. The email itself isn't here: the repo is
// public, so it lives in the CONTACT_EMAIL environment variable and is only sent after a click.
export const ContactPageSchema = PageIntroSchema.omit({
  placeholder: true,
}).extend({
  emailLabel: text,
  revealLabel: text,
  loadingLabel: text,
  errorMessage: text,
});

// Projects has real content instead of a placeholder: section headings and link labels.
export const ProjectsPageSchema = PageIntroSchema.omit({
  placeholder: true,
}).extend({
  sections: z.object({
    caseStudies: text,
    sideProjects: text,
  }),
  readLabel: text,
  // Link from a case study back to /projects.
  backLabel: text,
});

// The 404 page reads like a failed `cd`: "cd projects/zzz" → "cd: no such file or directory: …".
export const NotFoundPageSchema = PageIntroSchema.omit({
  placeholder: true,
  description: true,
}).extend({
  title: text,
  // Shown in place of the typed path until the browser fills it in.
  fallbackTarget: text,
  error: text,
  message: text,
  homeLabel: text,
  homeHint: text,
});

export const SiteSchema = z.object({
  // Production address, used to build full URLs for link previews, canonical links and the sitemap.
  url: z.url().refine((url) => !url.endsWith("/"), "No trailing slash"),
  prompt: text,
  description: text,
  copyrightYear: z.number().int().min(2026),
  nav: z.array(InternalLinkSchema).min(1),
  pages: z.object({
    home: HomePageSchema,
    resume: ResumePageSchema,
    projects: ProjectsPageSchema,
    contact: ContactPageSchema,
    notFound: NotFoundPageSchema,
  }),
});

export const ProfileSchema = z.object({
  name: text,
  title: text,
  location: text,
  // Resume summary (resume page). The home page uses the shorter pitch and about instead.
  summary: text,
  pitch: text,
  // One string per paragraph.
  about: z.array(text).min(1),
  links: z.array(ExternalLinkSchema).min(1),
});

export const RoleSchema = z
  .object({
    company: text,
    title: text,
    start: yearMonth,
    // Leave out for a current role ("Present").
    end: yearMonth.optional(),
    bullets: z.array(text).min(1),
  })
  // A rule TypeScript can't express: the end date can't come before the start date.
  .refine((role) => role.end === undefined || role.end >= role.start, {
    message: "end can't be before start",
    path: ["end"],
  });

export const SkillGroupSchema = z.object({
  label: text,
  items: z.array(text).min(1),
});

export const EducationSchema = z.object({
  school: text,
  credential: text,
  year: z.number().int().min(1900).max(2100),
});

// Fields every project has.
const projectBase = z.object({
  title: text,
  summary: text,
  stack: z.array(text).min(1),
});

// A case study gets its own page at /projects/<slug>, written in src/content/projects/<slug>.mdx.
export const CaseStudySchema = projectBase.extend({
  kind: z.literal("case-study"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Use lowercase-and-dashes"),
});

// A side project links out (e.g. to its GitHub repo) instead of having its own page.
export const SideProjectSchema = projectBase.extend({
  kind: z.literal("side-project"),
  link: ExternalLinkSchema,
});

// `kind` decides which of the two shapes a project must match.
export const ProjectSchema = z.discriminatedUnion("kind", [
  CaseStudySchema,
  SideProjectSchema,
]);

export const ProjectListSchema = z
  .array(ProjectSchema)
  .min(1)
  // Two case studies with the same slug would share one URL.
  .refine(
    (list) => {
      const slugs = list.flatMap((p) =>
        p.kind === "case-study" ? [p.slug] : [],
      );
      return new Set(slugs).size === slugs.length;
    },
    { message: "Case study slugs must be unique" },
  );

// TypeScript types generated from the schemas, so the shape is only defined once.
export type InternalLink = z.infer<typeof InternalLinkSchema>;
export type ExternalLink = z.infer<typeof ExternalLinkSchema>;
export type Site = z.infer<typeof SiteSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type SkillGroup = z.infer<typeof SkillGroupSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type CaseStudy = z.infer<typeof CaseStudySchema>;
export type SideProject = z.infer<typeof SideProjectSchema>;
export type Project = z.infer<typeof ProjectSchema>;
