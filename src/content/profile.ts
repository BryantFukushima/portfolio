import type { Profile } from "@/content/schemas";

export const profileData: Profile = {
  name: "Bryant Fukushima",
  title: "Full-Stack Engineer",
  location: "Hawaii, USA - Remote",
  summary:
    "Full-stack developer with 4+ years of experience building and scaling production web applications. Part of a small team building and maintaining a HIPAA-compliant patient communications and online scheduling platform used daily by 250+ dental and orthodontic practices, built on Ruby on Rails, React, PostgreSQL, and AWS. Migrated the platform from a legacy single-server deployment to a fully containerized AWS architecture, and currently working on a full frontend and backend rewrite to modernize the stack.",
  pitch:
    "7+ years building for the web, from pixel-perfect frontends to the AWS infrastructure behind them. Currently I help run a HIPAA-compliant scheduling and patient communications platform used by 250+ dental and orthodontic practices.",
  about: [
    "I've been at Rooster Grin Media since 2019, growing from web developer to frontend engineering manager to full-stack engineer. The platform I currently work on sends 17,800+ texts and 8,800+ emails a day for dental and orthodontic practices.",
    "I came to engineering through a graphic design degree from the University of San Francisco and then a full-stack bootcamp at UC Berkeley Extension. I care about how things look as much as how they work, which helped me lead a team of 5 developers and 2 designers during my time at Rooster Grin Media.",
    "I currently work remotely from Kaneohe, Hawaii. Off the clock, I enjoy a good round of golf and soaking up the sun at the beach. I also like dabbling in mechanical keyboards and building fun projects and tools, this site being one of them.",
  ],
  links: [
    { label: "github", href: "https://github.com/BryantFukushima" },
    { label: "linkedin", href: "https://www.linkedin.com/in/bryant-fukushima" },
  ],
};
