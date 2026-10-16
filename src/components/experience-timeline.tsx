import type { Role } from "@/content/schemas";
import { formatYearMonth } from "@/lib/dates";

type ExperienceTimelineProps = {
  roles: Role[];
};

// Roles down a vertical line, most recent first, with a dot marking each one.
export function ExperienceTimeline({ roles }: ExperienceTimelineProps) {
  return (
    <ol className="space-y-10 border-l border-line">
      {roles.map((role) => (
        <li key={`${role.title}-${role.start}`} className="relative pl-6">
          <span
            aria-hidden="true"
            className="absolute top-2 -left-[5px] size-[9px] rounded-full bg-teal"
          />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h3 className="font-bold text-teal sm:text-lg">{role.title}</h3>
            <p className="text-sm text-muted">
              <time dateTime={role.start}>{formatYearMonth(role.start)}</time>
              {" – "}
              {role.end ? (
                <time dateTime={role.end}>{formatYearMonth(role.end)}</time>
              ) : (
                "Present"
              )}
            </p>
          </div>
          <p className="text-muted">{role.company}</p>
          <ul className="mt-3 max-w-[65ch] space-y-2 leading-relaxed">
            {role.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span aria-hidden="true" className="text-magenta">
                  -
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
