"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Package, Tag, Info, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/brands", label: "Brands", icon: Tag },
    { href: "/about", label: "About Us", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between relative">
        <div className="flex items-center gap-3 relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="AK Distributors Logo" width={40} height={40} className="object-contain" />
            <span className="font-playfair text-xl font-bold tracking-tight text-emerald-900 hidden sm:inline-block">
              AK Distributors
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex absolute inset-0 items-center justify-center gap-2 pointer-events-none">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="pointer-events-auto text-sm font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 px-5 py-2 rounded-full transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Spacer / Button placeholder for symmetry */}
        <div className="hidden md:flex items-center gap-3 relative z-10 w-[40px]">
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-slate-100 text-slate-700 transition-colors">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[400px] border-l border-slate-200" style={{ backgroundColor: "#f8fafc", padding: 0 }}>
              <div className="flex flex-col h-full px-6 py-8">
                <div className="flex items-center gap-3 pb-8 border-b border-slate-200">
                  <Image src="/logo.png" alt="AK Distributors Logo" width={48} height={48} className="object-contain" />
                  <span className="font-playfair text-xl font-bold tracking-tight text-emerald-900">
                    AK Distributors
                  </span>
                </div>
                <nav className="flex flex-col gap-4 mt-8 flex-1">
                  {links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between px-5 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 hover:bg-emerald-50 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-emerald-100/50 text-emerald-600 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-lg font-bold text-slate-700 group-hover:text-emerald-900 transition-colors">
                            {link.label}
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-600 transition-colors transform group-hover:translate-x-1" />
                      </Link>
                    )
                  })}
                </nav>
                <div className="mt-auto pt-8 border-t border-slate-200 text-center">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Premium Wholesale Distribution</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
