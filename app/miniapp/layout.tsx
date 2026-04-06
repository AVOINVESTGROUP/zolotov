import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "@/app/globals.css";
import { TWAProvider } from "@/components/miniapp/TWAProvider";
import { MiniAppI18nProvider } from "./i18n/context";
import { MiniAppNavigation } from "@/components/miniapp/MiniAppNavigation";
import React from 'react';

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zolotov | Telegram Mini App",
  description: "Official Zolotov High Jewelry Store in Telegram",
};

export default function MiniAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorantGaramond.variable} ${montserrat.variable} bg-black font-sans text-cream min-h-screen relative`}>
      <TWAProvider>
        <MiniAppI18nProvider>
          <MiniAppNavigation />
          <main>
            {children}
          </main>
        </MiniAppI18nProvider>
      </TWAProvider>
    </div>
  );
}
