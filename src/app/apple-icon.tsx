import { ImageResponse } from "next/og";
import {
  LOGO_ASPECT,
  LOGO_VIEWBOX,
  logoShapes,
} from "@/components/logo-shapes";

// iPhone/iPad home-screen icon. Same design as favicon.ico (the mark inside a ring), on an opaque
// background because iOS fills transparency with black. iOS rounds the corners itself, so the ring
// keeps clear of the edges.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const markHeight = 96;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
      }}
    >
      <div
        style={{
          width: 150,
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "8px solid black",
          borderRadius: "50%",
        }}
      >
        <svg
          viewBox={LOGO_VIEWBOX}
          width={markHeight * LOGO_ASPECT}
          height={markHeight}
          fill="none"
          stroke="black"
          strokeWidth={18}
        >
          {logoShapes()}
        </svg>
      </div>
    </div>,
    size,
  );
}
