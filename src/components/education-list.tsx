import type { Education } from "@/content/schemas";

type EducationListProps = {
  entries: Education[];
};

export function EducationList({ entries }: EducationListProps) {
  return (
    <ul className="space-y-4">
      {entries.map((entry) => (
        <li key={entry.school}>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h3 className="font-bold text-teal">{entry.school}</h3>
            <p className="text-sm text-muted">{entry.year}</p>
          </div>
          <p>{entry.credential}</p>
        </li>
      ))}
    </ul>
  );
}
