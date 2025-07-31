import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Karla, Prompt } from "next/font/google";

const karla = Karla({ weight: "200", subsets: ["latin"] });
const prompt = Prompt({ weight: "600", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gokul P R - Software Engineer",
  description:
    "Portfolio website showcasing modern web development skills and projects",
  keywords: [
    "software engineer",
    "web development",
    "react",
    "next.js",
    "portfolio",
  ],
  authors: [{ name: "Gokul P R" }],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a1a",
};

// Service Worker Registration
const registerServiceWorker = () => {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Register service worker on client side
  if (typeof window !== "undefined") {
    registerServiceWorker();
  }

  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/project-placeholder.svg" as="image" />
        <link rel="preload" href="/dots.svg" as="image" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${karla.className} antialiased`}>{children}</body>
    </html>
  );
}
