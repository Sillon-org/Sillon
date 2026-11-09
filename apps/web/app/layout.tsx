import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import "@sillon/ui/button.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sillon",
    template: "%s · Sillon",
  },
  description: "Découvre et partage la musique : hits et artistes émergents dans un même fil.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
