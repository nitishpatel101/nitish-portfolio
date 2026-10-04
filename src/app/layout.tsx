import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollProvider } from "@/lib/scroll";

const interTight = localFont({
  src: "../fonts/InterTight-VariableFont_wght.woff2",
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-VariableFont_wght.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nitishkumar.dev"),
  title: "Nitish Kumar — Full Stack Web Developer & AI Systems Engineer",
  description: "Personal portfolio of Nitish Kumar, Full Stack Developer and BCA graduate from University of Delhi (8.1 CGPA). Engineering high-performance web systems, autonomous AI agents, and real-time voice automation.",
  keywords: ["Nitish Kumar", "Full Stack Developer", "Next.js", "React", "Python", "WhatsApp AI Agent", "Twilio", "Vapi"],
  authors: [{ name: "Nitish Kumar" }],
  openGraph: {
    title: "Nitish Kumar — Full Stack Web Developer & AI Systems Engineer",
    description: "Quiet luxury portfolio featuring autonomous AI agents, full-duplex telephony pipelines, and modern web applications.",
    type: "website",
    url: "https://nitishkumar.dev",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Nitish Kumar - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitish Kumar — Full Stack Web Developer",
    description: "Quiet luxury portfolio featuring autonomous AI agents and modern web applications.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/portrait-bust.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[#f4f2ee] text-[#0d0d0d]">
        <ScrollProvider>
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}
