type LogoProps = {
  className?: string;
};

// "bf" mark, inlined from public/bf_logo.svg. Strokes use currentColor, so color it with text-* classes.
// Decorative: hidden from screen readers wherever it's used.
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 142 221.14"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={18}
      strokeMiterlimit={10}
      className={`inline-block h-[1em] w-[0.64em] align-[-0.1em] ${className ?? ""}`}
    >
      <circle cx="71" cy="150.14" r="62" />
      <g strokeLinecap="round">
        <line x1="67.2" y1="128.21" x2="91.44" y2="128.21" />
        <line x1="67.68" y1="149.97" x2="81.48" y2="149.97" />
        <path d="M9.02,144.28V30.84c0-12.06,12.28-21.84,27.42-21.84h0c15.14,0,27.42,9.78,27.42,21.84v145.57c0,10.94-10.46,22.84-23.71,24.95" />
      </g>
    </svg>
  );
}
