import { type NextRequest, NextResponse } from "next/server";
import { findCaseStudy } from "@/content";

// Runs before /projects/<slug> renders. An unknown slug would otherwise get a 200: the page's
// static shell starts streaming before notFound() runs, and the status can't change after that.
// Rewriting to a path that matches no route and no file serves the site's 404 page with a real
// 404 status. Not "/404": on Vercel that matches the prerendered 404 page as a static file, which
// is served with a 200.
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (!findCaseStudy(slug)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
}

export const config = {
  matcher: "/projects/:slug",
};
