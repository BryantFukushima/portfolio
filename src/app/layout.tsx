import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile, site } from "@/content";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Lets pages use relative URLs (canonical links, preview images); Next.js prefixes this domain.
  metadataBase: new URL(site.url),
  title: {
    default: profile.name,
    template: `%s | ${profile.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg font-mono text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-10 focus:bg-surface focus:px-3 focus:py-2 focus:text-teal"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
