import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AUTHOR_NAME, SITE_NAME, SITE_URL, buildJsonLd } from "../lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  referrer: "strict-origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  authors: [{ name: AUTHOR_NAME }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
      { url: "/favicons/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    title: SITE_NAME,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121212",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: Promise<{ lang?: string | string[] }>;
}>) {
  const resolvedParams = params ? await params : undefined;
  const rawLang = typeof resolvedParams?.lang === "string" ? resolvedParams.lang : undefined;
  const pageKey = rawLang === "cz" ? "cz" : rawLang === "en" ? "en" : "root";
  const htmlLang = pageKey === "cz" ? "cs" : "en";
  return (
    <html lang={htmlLang}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
