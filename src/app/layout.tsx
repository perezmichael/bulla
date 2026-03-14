import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bulla | Crypto Payments",
  description: "Get paid in crypto with a simple link.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-muted/5 min-h-screen`}
      >
        <Navbar />
        <main className="container mx-auto py-10 px-4 md:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}