import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LightLines from "@/components/ui/light-lines";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "AK Distributors - Premium Wholesale",
  description: "Premium B2B Wholesale Distribution across California.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased min-h-screen flex flex-col text-foreground relative selection:bg-emerald-500 selection:text-white`}>
        {/* Animated Light Lines Background */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <LightLines
            className="w-full h-full"
            gradientFrom="#064e3b"
            gradientTo="#047857"
            linesOpacity={0.08}
            lightsOpacity={0.9}
            lightColor="#ffffff"
            lineColor="#ffffff"
            speedMultiplier={1}
          />
        </div>
        <Navbar />
        <main className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
