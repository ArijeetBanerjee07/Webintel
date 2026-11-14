import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebIntel",
  description:
    "Turn any public business website into an actionable intelligence profile.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#030805] font-sans text-white">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
