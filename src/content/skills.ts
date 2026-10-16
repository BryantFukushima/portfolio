import type { SkillGroup } from "@/content/schemas";

export const skillsData: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      "Ruby",
      "JavaScript",
      "TypeScript",
      "SQL",
      "HTML",
      "CSS/Sass",
      "Bash",
    ],
  },
  {
    label: "Backend",
    items: [
      "Ruby on Rails",
      "ActiveRecord",
      "Sidekiq",
      "Devise",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "Redis/Valkey",
    ],
  },
  {
    label: "Frontend",
    items: ["React", "Vue.js", "Nuxt.js", "Material UI", "Ant Design"],
  },
  {
    label: "Testing & Security",
    items: [
      "RSpec",
      "FactoryBot",
      "Playwright",
      "Brakeman",
      "bundler-audit",
      "gitleaks",
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS (ECS, ECR, EC2, RDS, ElastiCache, S3, CloudFront, SES, CodePipeline)",
      "Docker",
      "CircleCI",
      "Sentry",
    ],
  },
  {
    label: "Integrations & AI",
    items: [
      "Claude / Claude Code",
      "OpenAI API",
      "Twilio",
      "CoreDial & SkySwitch VoIP",
      "WordPress",
    ],
  },
];
