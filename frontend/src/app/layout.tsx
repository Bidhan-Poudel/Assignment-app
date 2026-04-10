import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppInitializer from "@/components/AppInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real Estate Buyer Portal",
  description: "Find your dream home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-transparent`}>
        <AppInitializer>{children}</AppInitializer>
      </body>
    </html>
  );
}
