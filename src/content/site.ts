import type { Site } from "@/content/schemas";

export const siteData: Site = {
  prompt: "bryant@fukushima",
  description: "Portfolio of Bryant Fukushima.",
  copyrightYear: 2026,
  nav: [
    { label: "home", href: "/" },
    { label: "resume", href: "/resume" },
    { label: "projects", href: "/projects" },
    { label: "contact", href: "/contact" },
  ],
  pages: {
    home: {
      path: "~",
      command: "whoami",
      aboutCommand: "cat about.md",
      resumeLinkLabel: "view resume",
    },
    resume: {
      path: "~/resume",
      command: "cat resume.md",
      download: {
        label: "download resume",
        href: "/BryantFukushima_Resume_2026.pdf",
      },
      sections: {
        summary: "Summary",
        experience: "Experience",
        skills: "Skills",
        education: "Education",
      },
    },
    projects: {
      path: "~/projects",
      command: "ls projects",
      placeholder: "Coming soon.",
    },
    contact: {
      path: "~/contact",
      command: "cat contact.txt",
      placeholder: "Coming soon.",
    },
  },
};
