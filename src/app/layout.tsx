import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MindZone",
  description:
    "Sizler için ruh sağlığına yönelik hazırladığımız online ve ücretsiz egzersiz programımız.",
  icons: {
    icon: "/images/brain-logo.png",
  },
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-white bg-grid-slate-200/60 dark:bg-[rgba(0,0,0,0.9)] dark:bg-grid-slate-700/40">
            {/* <Navbar /> */}
            {/* {children} */}
            <br />
            <br />
            <br />
            <br />
            <div className="bg-zinc-900 border-4 border-primary w-full md:max-w-[1200px] mx-auto rounded-md p-10">
              <p className="font-semibold text-3xl">
                Sistem çalışma altında lütfen daha sonra tekrar deneyiniz.
              </p>
              <small>Sabrınız için teşekkürler -Mindzone Ekibi</small>
            </div>
            <br />
            <br />
            <br />
            <br />
            <Footer />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
