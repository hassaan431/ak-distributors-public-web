"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const handleReplay = () => {
    if (typeof window !== "undefined") {
      if (window.replayArchIntro) {
        window.replayArchIntro();
      } else {
        sessionStorage.removeItem("hasVisited");
        router.push("/");
      }
    }
  };

  return (
    <footer className="bg-emerald-950/80 backdrop-blur-md text-emerald-100/70 py-12 text-center mt-auto border-t border-emerald-800/40">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
        <Link href="/" className="inline-flex flex-col items-center opacity-90 hover:opacity-100 transition-opacity">
          <Image src="/logo.png" alt="AK Distributors Logo" width={48} height={48} className="object-contain mb-3" />
          <span className="font-semibold text-lg tracking-tight text-white">AK Distributors</span>
        </Link>
        <div className="space-y-1">
          <p className="font-medium text-white text-sm">Premium Wholesale Distribution</p>
          <p className="text-xs text-emerald-200/80">Providing the best quality products for your business across California.</p>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <Link href="https://www.instagram.com/akdistributorsllc/" target="_blank" rel="noopener noreferrer" className="text-emerald-300/60 hover:text-emerald-300 transition-colors">
            <FaInstagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 text-[11px] text-emerald-200/80 hover:text-white transition-colors border border-emerald-700/50 hover:border-emerald-400/80 rounded-full px-3 py-1 font-mono uppercase tracking-wider"
            title="Replay Architectural Portal Intro"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Replay Arch Intro
          </button>
        </div>
        <p className="text-[11px] mt-4 text-emerald-300/60">&copy; 2026 AK Distributors. All rights reserved.</p>
      </div>
    </footer>
  );
}
