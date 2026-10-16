// The palette from globals.css, for places CSS can't reach: generated images (OG card, Apple icon)
// are drawn outside the page, so Tailwind classes and CSS variables don't apply there.
// theme.test.ts checks these against globals.css, so the two can't drift apart.
export const colors = {
  bg: "#1a0f29",
  surface: "#261838",
  line: "#3a2a52",
  fg: "#ece6f5",
  muted: "#b3a8c7",
  teal: "#5ee6d0",
  magenta: "#ff71ce",
  yellow: "#f9e27d",
} as const;
