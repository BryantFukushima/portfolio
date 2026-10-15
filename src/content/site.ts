export type SiteLink = {
  label: string;
  href: string;
};

export type PageIntro = {
  command: string;
  placeholder: string;
};

export type Site = {
  name: string;
  prompt: string;
  description: string;
  copyrightYear: number;
  nav: readonly SiteLink[];
  socials: readonly SiteLink[];
  pages: {
    home: PageIntro;
    resume: PageIntro;
    projects: PageIntro;
    contact: PageIntro;
  };
};

export const site: Site = {
  name: "Bryant Fukushima",
  prompt: "bryant_fukushima@portfolio",
  description: "Portfolio of Bryant Fukushima.",
  copyrightYear: 2026,
  nav: [
    { label: "home", href: "/" },
    { label: "resume", href: "/resume" },
    { label: "projects", href: "/projects" },
    { label: "contact", href: "/contact" },
  ],
  socials: [
    { label: "github", href: "https://github.com/BryantFukushima" },
    { label: "linkedin", href: "https://www.linkedin.com/in/bryant-fukushima" },
  ],
  pages: {
    home: { command: "whoami", placeholder: "Coming soon." },
    resume: { command: "cat resume.md", placeholder: "Coming soon." },
    projects: { command: "ls projects", placeholder: "Coming soon." },
    contact: { command: "cat contact.txt", placeholder: "Coming soon." },
  },
};
