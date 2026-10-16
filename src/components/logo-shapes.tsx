import type { ReactElement } from "react";

// The "bf" mark's shapes, shared by the inline Logo and the generated images (OG card, Apple
// icon). Draw them inside an <svg viewBox={LOGO_VIEWBOX}> with a stroke color and width 18.
export const LOGO_VIEWBOX = "0 0 142 221.14";
export const LOGO_ASPECT = 142 / 221.14;

// A plain function returning a list of SVG elements (not a component): the image renderer only
// accepts built-in SVG tags inside <svg>, so it can't render a <LogoShapes /> component.
export function logoShapes(): ReactElement[] {
  return [
    <circle key="ring" cx="71" cy="150.14" r="62" />,
    <line
      key="f-top"
      x1="67.2"
      y1="128.21"
      x2="91.44"
      y2="128.21"
      strokeLinecap="round"
    />,
    <line
      key="f-mid"
      x1="67.68"
      y1="149.97"
      x2="81.48"
      y2="149.97"
      strokeLinecap="round"
    />,
    <path
      key="b-stem"
      d="M9.02,144.28V30.84c0-12.06,12.28-21.84,27.42-21.84h0c15.14,0,27.42,9.78,27.42,21.84v145.57c0,10.94-10.46,22.84-23.71,24.95"
      strokeLinecap="round"
    />,
  ];
}
