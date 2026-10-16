type Stage = {
  label: string;
  // Top to bottom: each item points to the next one.
  nodes: string[];
};

type ArchitectureDiagramProps = {
  stages: Stage[];
  caption: string;
};

// A boxes-and-arrows diagram built from HTML lists, used inside case study MDX. Being real text
// (not an image), it's readable by screen readers, scales with the font, and stacks on mobile.
export function ArchitectureDiagram({
  stages,
  caption,
}: ArchitectureDiagramProps) {
  return (
    <figure className="my-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {stages.map((stage) => (
          <div key={stage.label} className="border border-line bg-surface p-4">
            <p className="text-sm text-muted">{stage.label}</p>
            <ol className="mt-3 flex flex-col items-center">
              {stage.nodes.map((node, i) => (
                <li key={node} className="flex w-full flex-col items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-magenta">
                      ↓
                    </span>
                  )}
                  <span className="w-full border border-teal px-3 py-2 text-center text-sm">
                    {node}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}
