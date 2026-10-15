import { z } from "zod";
import { educationData } from "@/content/education";
import { experienceData } from "@/content/experience";
import { profileData } from "@/content/profile";
import {
  EducationSchema,
  ProfileSchema,
  RoleSchema,
  SiteSchema,
  SkillGroupSchema,
} from "@/content/schemas";
import { siteData } from "@/content/site";
import { skillsData } from "@/content/skills";

// Validates a content file against its schema. Pages import from here, so this runs during
// `next build`: an invalid entry fails the build with a message naming the file and field.
function parseContent<T extends z.ZodType>(
  file: string,
  schema: T,
  data: unknown,
): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid content in src/content/${file}:\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}

export const site = parseContent("site.ts", SiteSchema, siteData);
export const profile = parseContent("profile.ts", ProfileSchema, profileData);
export const experience = parseContent(
  "experience.ts",
  z.array(RoleSchema).min(1),
  experienceData,
);
export const skills = parseContent(
  "skills.ts",
  z.array(SkillGroupSchema).min(1),
  skillsData,
);
export const education = parseContent(
  "education.ts",
  z.array(EducationSchema).min(1),
  educationData,
);
