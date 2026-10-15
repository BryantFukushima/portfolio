import type { Site } from "@/content/schemas";

export const siteData: Site = {
  prompt: "bryant_fukushima@portfolio",
  description: "Portfolio of Bryant Fukushima.",
  copyrightYear: 2026,
  nav: [
    { label: "home", href: "/" },
    { label: "resume", href: "/resume" },
    { label: "projects", href: "/projects" },
    { label: "contact", href: "/contact" },
  ],
  pages: {
    home: { command: "whoami", placeholder: "Coming soon." },
    resume: { command: "cat resume.md", placeholder: "Coming soon." },
    projects: { command: "ls projects", placeholder: "Coming soon." },
    contact: { command: "cat contact.txt", placeholder: "Coming soon." },
  },
};
