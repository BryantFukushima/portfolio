import type { Project } from "@/content/schemas";

// Each case study also needs src/content/projects/<slug>.mdx for its page.
export const projectsData: Project[] = [
  {
    kind: "case-study",
    slug: "ecs-migration",
    title: "ECS migration",
    summary:
      "Moved a production platform from a single server to containers on AWS, with zero-downtime deploys.",
    stack: ["AWS ECS", "Docker", "CI/CD"],
  },
  {
    kind: "side-project",
    title: "bryantfukushima.com",
    summary:
      "This portfolio website: terminal-style, built step by step, with typed content validated at build time.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Zod", "MDX"],
    link: {
      label: "github",
      href: "https://github.com/BryantFukushima/portfolio",
    },
  },
];
