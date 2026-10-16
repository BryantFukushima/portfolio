import type { Profile } from "@/content/schemas";

export const profileData: Profile = {
  name: "Bryant Fukushima",
  title: "Full-Stack Engineer",
  location: "Hawaii, USA - Remote",
  summary:
    "Full-stack engineer with 7+ years building for the web, including 3+ years on a production Rails/React platform. Part of a small team maintaining a HIPAA-compliant patient communications and scheduling platform used daily by 250+ dental and orthodontic practices. Migrated the platform from a legacy single-server deployment to containerized AWS ECS with CI/CD and security scanning, and currently working on a full-stack rewrite with AI-assisted features.",
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
