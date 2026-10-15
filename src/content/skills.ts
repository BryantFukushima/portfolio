import type { SkillGroup } from "@/content/schemas";

export const skillsData: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Ruby", "JavaScript", "TypeScript", "HTML", "CSS/Sass"],
  },
  {
    label: "Backend",
    items: ["Ruby on Rails", "Sidekiq", "PostgreSQL", "Node.js", "REST APIs"],
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Vue.js",
      "Nuxt.js",
      "Vite",
      "TanStack",
      "Tailwind",
      "shadcn/ui",
    ],
  },
  {
    label: "Testing",
    items: ["Vitest", "Playwright"],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS (ECS, ECR, EC2, RDS, ElastiCache, SES, CodePipeline, CodeBuild)",
      "Docker",
      "Git/GitHub",
      "Sentry",
    ],
  },
  {
    label: "Other",
    items: ["AI integration (Claude)", "WordPress"],
  },
];
