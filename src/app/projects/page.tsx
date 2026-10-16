import type { Metadata } from "next";
import { MarkdownHeading } from "@/components/markdown-heading";
import { ProjectCard } from "@/components/project-card";
import { PromptHeading } from "@/components/prompt-heading";
import { caseStudies, sideProjects, site } from "@/content";
import type { Project } from "@/content/schemas";
import type { CSSVars } from "@/lib/css";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: site.pages.projects.description,
  path: "/projects",
});

export default function ProjectsPage() {
  const { path, command, sections, readLabel } = site.pages.projects;
  // The reveal waits for the title's command to finish typing, so it needs the command's length.
  const style: CSSVars = { "--chars": command.length };

  // Both lists are subtypes of Project, so they can share one array type.
  const groups: { heading: string; items: Project[] }[] = [
    { heading: sections.caseStudies, items: caseStudies },
    { heading: sections.sideProjects, items: sideProjects },
  ];

  return (
    <div style={style}>
      <PromptHeading path={path} command={command} />
      <div className="motion-safe:animate-reveal">
        {groups
          .filter((group) => group.items.length > 0)
          .map((group) => (
            <section key={group.heading} className="mt-12">
              <MarkdownHeading>{group.heading}</MarkdownHeading>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {group.items.map((project) => (
                  <li key={project.title} className="flex">
                    <ProjectCard project={project} readLabel={readLabel} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
      </div>
    </div>
  );
}
