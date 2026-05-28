import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Schema Vis — PostgreSQL Schema Design Tool",
  description:
    "Design PostgreSQL schemas visually. Tables, relations, indexes, and SQL export — all in the browser. Free, no login required.",
  metadataBase: new URL("https://schemaviz.mystaline.dev"),
  alternates: {
    canonical: "https://schemaviz.mystaline.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Schema Vis — PostgreSQL Schema Design Tool",
    description:
      "Design PostgreSQL schemas visually. Tables, relations, indexes, and SQL export — all in the browser. Free, no login required.",
    url: "https://schemaviz.mystaline.dev",
    siteName: "Schema Vis",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schema Vis — PostgreSQL Schema Design Tool",
    description:
      "Design PostgreSQL schemas visually. Tables, relations, indexes, and SQL export — all in the browser. Free, no login required.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Schema Vis",
  url: "https://app.schemaviz.mystaline.dev",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Design PostgreSQL schemas visually. Tables, relations, indexes, and SQL export — all in the browser. Free, no login required.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
