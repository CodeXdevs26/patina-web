import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Cormorant } from "next/font/google";
import GodProvider from "@/provider/god-provider";
import { Toaster } from "@/components/ui/sonner";
const cormorant = Cormorant({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cormorant",
});
const geistSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Patina",
  description:
    "Patina is India's pre-owned watch market. We help you buy and sell watches with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full dark overflow-x-hidden scrollbar-thin",
        "antialiased",
        geistSans.className,
        cormorant.variable,
        "font-mono",
      )}
    >
      <body className="min-h-full flex flex-col">
        <GodProvider>
          {children}
          <Toaster />
        </GodProvider>
      </body>
    </html>
  );
}
