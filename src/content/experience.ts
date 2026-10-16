import type { Role } from "@/content/schemas";

// Most recent first, matching the PDF resume.
export const experienceData: Role[] = [
  {
    company: "Rooster Grin Media",
    title: "Full-Stack Engineer",
    start: "2023-06",
    bullets: [
      "Part of the full-stack team building and maintaining a HIPAA-compliant patient reminders and online scheduling platform used by 250+ dental and orthodontic practices, sending roughly 17,800 automated texts (Twilio) and 8,800 automated emails (SES) per day",
      "Migrated the application from a legacy, single-instance EC2 deployment to a fully containerized architecture on AWS (ECS, ECR, RDS/PostgreSQL, ElastiCache) with CI/CD through CodePipeline and CodeBuild",
      "Build and maintain Ruby on Rails backend services, using Sidekiq for background job orchestration and Sentry for error monitoring and observability",
      "Build and maintain integrations with leading practice management systems (Cloud9, Dolphin, Greyfinch, TOPS, Open Dental, Carestream)",
      "Shipped new-patient online scheduling features driving roughly 14 new patient bookings per day through the self-serve widget",
      "Working on an in-progress v2 frontend rewrite: React, TypeScript, Vite, TanStack, Tailwind, shadcn/ui, tested with Vitest and Playwright",
      "Contributing to a backend refactor to retire legacy code and improve performance, and to new AI-assisted features built with Claude",
    ],
  },
  {
    company: "Rooster Grin Media",
    title: "Frontend Engineering Manager",
    start: "2022-04",
    end: "2023-06",
    bullets: [
      "Led a team of 5 frontend developers and 2 designers, building fully responsive, production websites from fully custom designs built by in-house designers, while maintaining the 2,000+ site portfolio",
      "Built custom WordPress backend features, including custom themes, REST API endpoints for headless sites, custom post types, and custom admin features per client requests",
      "Built Rooster Grin's next-generation templated build system, incorporating a component library and flexible content management to build new sites quickly and efficiently from a custom template",
      "Managed and maintained the shared Vue.js/Nuxt.js boilerplate codebase, and researched and implemented new design systems and reusable base components to improve site turnaround time and code efficiency",
      "Reviewed code and completed sites before client presentations, worked with designers to ensure designs translated effectively into development, and mentored team members to grow their skills and support career growth",
    ],
  },
  {
    company: "Rooster Grin Media",
    title: "Web Developer",
    start: "2019-06",
    end: "2022-04",
    bullets: [
      "Worked with internal design teams to turn design mockups into fully responsive, production websites using Vue.js, Nuxt.js, and Headless WordPress",
      "Deployed and maintained a portfolio of 2,000+ client websites",
    ],
  },
];
