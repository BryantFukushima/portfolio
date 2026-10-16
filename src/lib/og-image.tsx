import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import {
  LOGO_ASPECT,
  LOGO_VIEWBOX,
  logoShapes,
} from "@/components/logo-shapes";
import { site } from "@/content";
import { ogSize } from "@/lib/metadata";
import { colors } from "@/lib/theme";

type OgImageInput = {
  // Shell path and command for the prompt line, e.g. "~" and "whoami".
  path: string;
  command: string;
  heading: string;
  subheading: string;
};

// The image renderer can't use next/font, so it loads JetBrains Mono from the repo. Reading the
// files once at module level (not inside the render) lets Next.js build the images ahead of time.
function loadFont(file: string) {
  return readFile(path.join(process.cwd(), "src/assets/fonts", file));
}
const [regular, bold] = await Promise.all([
  loadFont("JetBrainsMono-Regular.ttf"),
  loadFont("JetBrainsMono-Bold.ttf"),
]);

// Draws a link-preview card in the site's terminal style. It's rendered to a PNG at build time,
// so it supports only inline styles and flexbox (no Tailwind classes).
export function renderOgImage({
  path: promptPath,
  command,
  heading,
  subheading,
}: OgImageInput) {
  // Long prompts (case studies) shrink to stay on one line: ~0.6em per monospace character,
  // across the 1056px between the side padding.
  const promptChars =
    site.prompt.length + promptPath.length + command.length + 4;
  const promptSize = Math.min(36, Math.floor(1056 / (promptChars * 0.6)));
  const logoHeight = promptSize * 1.2;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: colors.bg,
        color: colors.fg,
        fontFamily: "JetBrains Mono",
        borderTop: `12px solid ${colors.magenta}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: promptSize,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: colors.teal }}>{site.prompt}</span>
        <span style={{ color: colors.muted }}>:{promptPath}</span>
        <svg
          viewBox={LOGO_VIEWBOX}
          width={logoHeight * LOGO_ASPECT}
          height={logoHeight}
          fill="none"
          stroke={colors.magenta}
          strokeWidth={18}
          style={{ margin: "0 0.5em 0 0.3em" }}
        >
          {logoShapes()}
        </svg>
        <span>{command}</span>
        <span
          style={{
            width: "0.55em",
            height: "1.1em",
            marginLeft: "0.2em",
            background: colors.yellow,
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
          {heading}
        </div>
        <div style={{ marginTop: 24, fontSize: 36, color: colors.teal }}>
          {subheading}
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400 },
        { name: "JetBrains Mono", data: bold, weight: 700 },
      ],
    },
  );
}
