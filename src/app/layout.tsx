import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { BackgroundBeams } from "@/components/ui/background-beams";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MindZone",
  description:
    "Sizler için ruh sağlığına yönelik hazırladığımız online ve ücretsiz egzersiz programımız.",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="absolute h-full w-full inset-0 z-20">
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </div>
          <BackgroundBeams />
        </Providers>
      </body>
    </html>
  );
}
