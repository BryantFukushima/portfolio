import type { CSSProperties } from "react";

// React's CSSProperties doesn't know about CSS custom properties, so allow any `--name` key too.
export type CSSVars = CSSProperties & Record<`--${string}`, number>;
