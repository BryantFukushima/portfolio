import { LOGO_VIEWBOX, logoShapes } from "@/components/logo-shapes";

type LogoProps = {
  className?: string;
};

// "bf" mark, inlined from public/bf_logo.svg. Strokes use currentColor, so color it with text-* classes.
// Decorative: hidden from screen readers wherever it's used.
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={18}
      strokeMiterlimit={10}
      className={`inline-block h-[1em] w-[0.64em] align-[-0.1em] ${className ?? ""}`}
    >
      {logoShapes()}
    </svg>
  );
}
