import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Schema Vis — PostgreSQL Schema Design Tool",
  description:
    "Design PostgreSQL schemas visually. Tables, relations, indexes, and SQL export — all in the browser. Free, no login required.",
  openGraph: {
    title: "Schema Vis",
    description: "Design PostgreSQL schemas visually.",
    url: "https://schemaviz.mystaline.dev",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
