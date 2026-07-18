import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Costera — Néstor Lluvias",
  description: "Galería de arte online de Néstor Lluvias.",
  openGraph: {
    title: "Costera — Néstor Lluvias",
    description: "Galería de arte online de Néstor Lluvias.",
    siteName: "Costera",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
