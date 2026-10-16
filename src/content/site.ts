import type { Site } from "@/content/schemas";

export const siteData: Site = {
  url: "https://bryantfukushima.com",
  prompt: "bryant@fukushima",
  description:
    "Full-stack engineer in Hawaii building web apps with Ruby on Rails, React, TypeScript and AWS.",
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
      description:
        "Full-stack engineer in Hawaii with 7+ years building for the web, from pixel-perfect frontends to the AWS infrastructure behind them.",
      aboutCommand: "cat about.txt",
      resumeLinkLabel: "view resume",
    },
    resume: {
      path: "~/resume",
      command: "cat resume.md",
      description:
        "Experience, skills and education, with a downloadable PDF resume.",
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
      description: "Case studies and projects by Bryant Fukushima.",
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
      description:
        "Get in touch with Bryant Fukushima by email, GitHub or LinkedIn.",
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
