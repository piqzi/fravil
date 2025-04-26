import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken_grotesk = Hanken_Grotesk({
  display: "auto",
  preload: true,
  style: ["normal"],
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Fravil",
  description: "Micro-workout suggestion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={hanken_grotesk.className}>{children}</body>
    </html>
  );
}
