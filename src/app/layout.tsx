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

  keywords: [
    "Melvorix",
    "AI Automation",
    "n8n",
    "Cybersecurity",
    "Digital Marketing",
    "Social Media",
    "Data Analytics",
    "Software Development",
  ],

  applicationName: "Melvorix",

  robots: {
    index: true,
    follow: true,
  },
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
      <body>{children}</body>
    </html>
  );
}