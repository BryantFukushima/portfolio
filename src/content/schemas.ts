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
  command: text,
  placeholder: text,
});

export const SiteSchema = z.object({
  prompt: text,
  description: text,
  copyrightYear: z.number().int().min(2026),
  nav: z.array(InternalLinkSchema).min(1),
  pages: z.object({
    home: PageIntroSchema,
    resume: PageIntroSchema,
    projects: PageIntroSchema,
    contact: PageIntroSchema,
  }),
});

export const ProfileSchema = z.object({
  name: text,
  title: text,
  location: text,
  summary: text,
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

// TypeScript types generated from the schemas, so the shape is only defined once.
export type InternalLink = z.infer<typeof InternalLinkSchema>;
export type ExternalLink = z.infer<typeof ExternalLinkSchema>;
export type Site = z.infer<typeof SiteSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type SkillGroup = z.infer<typeof SkillGroupSchema>;
export type Education = z.infer<typeof EducationSchema>;
