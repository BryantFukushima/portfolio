import Link from "next/link";
import type { Project } from "@/content/schemas";

type ProjectCardProps = {
  project: Project;
  // Call to action on case study cards, e.g. "read case study".
  readLabel: string;
};

// The title's link stretches over the whole card (the `after:` overlay), so the card is one
// click target but screen readers still hear a single link named after the project.
export function ProjectCard({ project, readLabel }: ProjectCardProps) {
  const linkClass = "after:absolute after:inset-0";

  return (
    <article className="relative flex flex-col border border-line bg-surface p-5 focus-within:border-teal hover:border-teal">
      <h3 className="font-bold text-teal sm:text-lg">
        {/* Checking `kind` narrows the type: inside each branch TypeScript knows which fields exist. */}
        {project.kind === "case-study" ? (
          // prefetch={true} loads this case study's content (not just the shared shell) before the
          // click, so the page appears at once instead of showing its loading fallback.
          <Link
            href={`/projects/${project.slug}`}
            prefetch={true}
            className={linkClass}
          >
            {project.title}
          </Link>
        ) : (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {project.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </h3>
      <p className="mt-2 leading-relaxed">{project.summary}</p>
      <p className="mt-4 text-sm text-muted">{project.stack.join(" · ")}</p>
      <p aria-hidden="true" className="mt-4 text-sm text-teal">
        {project.kind === "case-study"
          ? `${readLabel} →`
          : `${project.link.label} ↗`}
      </p>
    </article>
  );
}
