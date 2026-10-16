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
      aboutCommand: "cat about.txt",
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
      sections: {
        caseStudies: "Case studies",
        sideProjects: "Projects",
      },
      readLabel: "read case study",
      backLabel: "cd ..",
    },
    contact: {
      path: "~/contact",
      command: "cat contact.txt",
      emailLabel: "email",
      revealLabel: "show email",
      loadingLabel: "loading…",
      errorMessage: "Couldn't load the email. Try LinkedIn instead.",
    },
    notFound: {
      path: "~",
      command: "cd",
      title: "Not found",
      fallbackTarget: "not-found",
      error: "no such file or directory",
      message: "This page doesn't exist or has moved.",
      homeLabel: "cd ~",
      homeHint: "(return home)",
    },
  },
};
