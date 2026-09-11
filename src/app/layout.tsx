import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Melvorix — Automate. Educate. Elevate.",
    template: "%s | Melvorix",
  },

  description:
    "Melvorix is a technology education and digital solutions company helping people and businesses automate, build, and grow with modern technology.",

  applicationName: "Melvorix",

  keywords: [
    "Melvorix",
    "AI Automation",
    "n8n",
    "Cybersecurity",
    "Digital Marketing",
    "Social Media Automation",
    "Data Analytics",
    "Software Development",
    "Tech Academy",
    "AI Education",
    "Technology Institute",
  ],

  authors: [
    {
      name: "Melvorix",
    },
  ],

  creator: "Melvorix",
  publisher: "Melvorix",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Melvorix — Automate. Educate. Elevate.",
    description:
      "Tech academy and software studio empowering the next generation of builders and innovators.",
    siteName: "Melvorix",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Melvorix — Automate. Educate. Elevate.",
    description:
      "Tech academy and software studio empowering the next generation of builders and innovators.",
  },

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          rel="icon"
          href="/favicon.png"
          type="image/png"
        />

        <link
          rel="shortcut icon"
          href="/favicon.png"
          type="image/png"
        />

        <link
          rel="apple-touch-icon"
          href="/favicon.png"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}