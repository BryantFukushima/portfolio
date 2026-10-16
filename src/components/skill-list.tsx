import type { SkillGroup } from "@/content/schemas";

type SkillListProps = {
  groups: SkillGroup[];
};

// One row per group: the label, then its skills separated by dots.
export function SkillList({ groups }: SkillListProps) {
  return (
    <dl className="space-y-3 leading-relaxed">
      {groups.map((group) => (
        <div key={group.label} className="sm:flex sm:gap-4">
          <dt className="shrink-0 text-teal sm:w-48">{group.label}</dt>
          <dd>{group.items.join(" · ")}</dd>
        </div>
      ))}
    </dl>
  );
}
