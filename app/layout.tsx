import type { Metadata } from "next";
import "./globals.css";
import "./module-pages.css";
import "./astral-modules.css";

export const metadata: Metadata = {
  title: "Mythic Studio — Astral Elements Engine",
  description:
    "Create, evolve, and master the elements in Mythic Studio, an original modular digital experience platform."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
