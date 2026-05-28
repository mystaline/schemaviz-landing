import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Schema Viz — PostgreSQL Schema Design Tool",
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
    title: "Schema Viz — PostgreSQL Schema Design Tool",
    description:
      "Design PostgreSQL schemas visually. Tables, relations, indexes, and SQL export — all in the browser. Free, no login required.",
    url: "https://schemaviz.mystaline.dev",
    siteName: "Schema Viz",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schema Viz — PostgreSQL Schema Design Tool",
    description:
      "Design PostgreSQL schemas visually. Tables, relations, indexes, and SQL export — all in the browser. Free, no login required.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Schema Viz",
  url: "https://app.schemaviz.mystaline.dev",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Design PostgreSQL schemas visually. Tables, relations, indexes, and SQL export — all in the browser. Free, no login required.",
};

const redirectGuardScript = `(function(){
  var APP="https://app.schemaviz.mystaline.dev";
  var params=new URLSearchParams(window.location.search);
  var hash=window.location.hash;
  var host=window.location.hostname;
  if(params.has("embed")){window.location.replace(APP+"?embed");return;}
  if(hash.indexOf("#data=")===0){window.location.replace(APP+hash);return;}
  if(host==="schemavis.mystaline.dev"){
    document.documentElement.style.visibility="hidden";
    if("serviceWorker" in navigator){
      navigator.serviceWorker.register("/sw.js").catch(function(){});
    }
    return;
  }
  try{
    var raw=localStorage.getItem("db_schema_visualizer");
    var mg=localStorage.getItem("schemaviz_migrated");
    if(raw&&!mg){document.documentElement.style.visibility="hidden";}
  }catch(e){}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Render-blocking redirect guard — fires before browser paints anything */}
        <script dangerouslySetInnerHTML={{ __html: redirectGuardScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
