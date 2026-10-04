"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-emerald-950/60 backdrop-blur-md text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between relative">
        <div className="flex items-center gap-3 relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="AK Distributors Logo" width={28} height={28} className="object-contain" />
            <span className="font-semibold text-lg tracking-tight text-white hidden sm:inline-block">
              AK Distributors
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex absolute inset-0 items-center justify-center gap-6 pointer-events-none">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="pointer-events-auto text-[13px] font-medium text-emerald-100/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Spacer */}
        <div className="hidden md:flex items-center gap-3 relative z-10 w-[28px]">
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-emerald-900/50 text-white transition-colors">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-[350px] bg-emerald-950 border-l border-emerald-800 p-8 text-white">
              <div className="mt-8 flex flex-col h-full">
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-widest mb-6">Navigation</span>
                <nav className="flex flex-col gap-2">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center text-xl sm:text-2xl font-medium text-white hover:text-emerald-300 transition-colors py-4 border-b border-emerald-900/60"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
