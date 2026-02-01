import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AUTHOR_NAME, SITE_NAME, SITE_URL, buildJsonLd } from "../lib/seo";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  referrer: "strict-origin-when-cross-origin",
  themeColor: "#121212",
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
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { lang?: string };
}>) {
  const pageKey = params?.lang === "cz" ? "cz" : params?.lang === "en" ? "en" : "root";
  const htmlLang = pageKey === "cz" ? "cs" : "en";
  const jsonLd = buildJsonLd(pageKey);
  return (
    <html lang={htmlLang}>
      <body className={`${jakarta.variable} antialiased`}>
        <script
          type="application/ld+json"
          id="archeon-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
