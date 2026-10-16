import { describe, expect, it } from "vitest";
import {
  PageIntroSchema,
  ProjectListSchema,
  ProjectSchema,
  ResumePageSchema,
  RoleSchema,
} from "@/content/schemas";

// Each test starts from a valid object and changes one field, so a failure points at that field.
const validRole = {
  company: "Acme",
  title: "Engineer",
  start: "2020-01",
  end: "2021-06",
  bullets: ["Did a thing"],
};

const validCaseStudy = {
  kind: "case-study",
  slug: "my-project",
  title: "My project",
  summary: "What it was.",
  stack: ["TypeScript"],
};

describe("RoleSchema", () => {
  it("accepts a valid role", () => {
    expect(RoleSchema.safeParse(validRole).success).toBe(true);
  });

  it("accepts a current role with no end date", () => {
    // `...` copies every field; `end: undefined` then overrides one.
    expect(RoleSchema.safeParse({ ...validRole, end: undefined }).success).toBe(
      true,
    );
  });

  it("rejects an end date before the start date", () => {
    const result = RoleSchema.safeParse({ ...validRole, end: "2019-12" });
    expect(result.success).toBe(false);
    // `result.error` only exists when `success` is false; the `if` lets TypeScript know that.
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["end"]);
    }
  });

  it("rejects dates that aren't YYYY-MM", () => {
    for (const start of ["2023-13", "2023-6", "June 2023"]) {
      expect(RoleSchema.safeParse({ ...validRole, start }).success).toBe(false);
    }
  });
});

describe("PageIntroSchema path", () => {
  const intro = { command: "ls", description: "A page.", placeholder: "Soon." };

  it("accepts ~ and ~/page", () => {
    for (const path of ["~", "~/resume", "~/projects/ecs-migration"]) {
      expect(PageIntroSchema.safeParse({ ...intro, path }).success).toBe(true);
    }
  });

  it("rejects paths that don't start at ~ or use other characters", () => {
    for (const path of ["/resume", "~/Resume", "~/", "resume"]) {
      expect(PageIntroSchema.safeParse({ ...intro, path }).success).toBe(false);
    }
  });
});

describe("ResumePageSchema download link", () => {
  const page = {
    path: "~/resume",
    command: "cat resume.md",
    description: "My resume.",
    sections: {
      summary: "Summary",
      experience: "Experience",
      skills: "Skills",
      education: "Education",
    },
  };

  it("accepts a PDF in public/", () => {
    const download = { label: "download", href: "/resume.pdf" };
    expect(ResumePageSchema.safeParse({ ...page, download }).success).toBe(
      true,
    );
  });

  it("rejects links that aren't a root-level PDF", () => {
    for (const href of ["resume.pdf", "/resume.docx", "https://x.com/r.pdf"]) {
      const download = { label: "download", href };
      expect(ResumePageSchema.safeParse({ ...page, download }).success).toBe(
        false,
      );
    }
  });
});

describe("ProjectSchema", () => {
  it("requires a slug on case studies", () => {
    expect(ProjectSchema.safeParse(validCaseStudy).success).toBe(true);
    expect(
      ProjectSchema.safeParse({ ...validCaseStudy, slug: undefined }).success,
    ).toBe(false);
  });

  it("requires a link on side projects", () => {
    const sideProject = { ...validCaseStudy, kind: "side-project" };
    expect(ProjectSchema.safeParse(sideProject).success).toBe(false);
    expect(
      ProjectSchema.safeParse({
        ...sideProject,
        link: { label: "github", href: "https://github.com/x/y" },
      }).success,
    ).toBe(true);
  });

  it("rejects an unknown kind", () => {
    expect(
      ProjectSchema.safeParse({ ...validCaseStudy, kind: "blog" }).success,
    ).toBe(false);
  });
});

describe("ProjectListSchema", () => {
  it("rejects two case studies with the same slug", () => {
    const result = ProjectListSchema.safeParse([
      validCaseStudy,
      { ...validCaseStudy, title: "Another" },
    ]);
    expect(result.success).toBe(false);
  });
});
