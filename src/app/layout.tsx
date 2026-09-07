import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { MotionProvider } from "@/components/site/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://cucuzzalab.example";
const SITE_TITLE = "cucuzzalab — 3D Construction Training Simulators";
const SITE_DESCRIPTION =
  "Browser-based 3D training simulators for construction, surveying and civil engineering education. Help students practice real-world procedures before the physical lab.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "construction training simulator",
    "construction simulation",
    "construction education technology",
    "3D construction simulator",
    "construction surveying simulator",
    "surveying training simulator",
    "civil engineering simulator",
    "construction training software",
    "technical education simulation",
    "TAFE construction training",
    "browser-based 3D training",
    "vocational training simulator",
  ],
  authors: [{ name: "cucuzzalab" }],
  creator: "cucuzzalab",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "cucuzzalab",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport = {
  themeColor: "#0a0c11",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <MotionProvider>{children}</MotionProvider>
        <Toaster />
      </body>
    </html>
  );
}
