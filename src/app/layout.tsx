import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import { AttributionCapture } from "@/components/analytics/AttributionCapture";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { TrackingScripts } from "@/components/analytics/TrackingScripts";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { revealBootScript } from "@/lib/motion";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
// Fonte mono só aparece abaixo da dobra (selos de tecnologia e mockups): sem preload,
// para não disputar banda com o conteúdo inicial no mobile.
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.seo.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  applicationName: siteConfig.name,
  // Canonical, Open Graph e Twitter são definidos por página (src/lib/seo.ts),
  // pois o Next substitui esses objetos em vez de mesclá-los.
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0f1d36",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: o script abaixo marca <html data-motion> antes da hidratação.
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      {/* suppressHydrationWarning: extensões (ex.: ColorZilla) injetam atributos no <body>. */}
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
        {children}
        <RevealObserver />
        <ConsentBanner />
        <AttributionCapture />
        <TrackingScripts />
      </body>
    </html>
  );
}
