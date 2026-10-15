import type { Profile } from "@/content/schemas";

export const profileData: Profile = {
  name: "Bryant Fukushima",
  title: "Full-Stack Engineer",
  location: "Hawaii, USA - Remote",
  summary:
    "Full-stack developer with 4+ years of experience building and scaling production web applications. Part of a small team building and maintaining a HIPAA-compliant patient communications and online scheduling platform used daily by 250+ dental and orthodontic practices, built on Ruby on Rails, React, PostgreSQL, and AWS. Migrated the platform from a legacy single-server deployment to a fully containerized AWS architecture, and currently working on a full frontend and backend rewrite to modernize the stack.",
  links: [
    { label: "github", href: "https://github.com/BryantFukushima" },
    { label: "linkedin", href: "https://www.linkedin.com/in/bryant-fukushima" },
  ],
};
