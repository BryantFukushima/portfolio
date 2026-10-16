// "https://www.linkedin.com/in/x" → "linkedin.com/in/x", like the resume's contact line.
export function displayUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "");
}

// Long paths would overflow the 404 page's one-line heading on phones.
const MAX_TARGET = 20;

// A URL path as a shell argument: "/projects/zzz/" → "projects/zzz", decoded and shortened.
export function toShellTarget(pathname: string): string {
  let target = pathname.replace(/^\/+|\/+$/g, "");
  try {
    target = decodeURIComponent(target);
  } catch {
    // Malformed escapes (e.g. "%E0"): show them as typed.
  }
  return target.length > MAX_TARGET
    ? `${target.slice(0, MAX_TARGET - 1)}…`
    : target;
}
