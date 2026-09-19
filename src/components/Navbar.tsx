"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-playfair text-xl font-bold tracking-tight text-emerald-900">
              AK Distributors
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="http://hassaan431.pythonanywhere.com/brochure/download" target="_blank" className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium h-9 px-4 rounded-full transition-colors">
            Download Brochure
          </Link>
          <a
            href="http://hassaan431.pythonanywhere.com/dashboard"
            target="_blank"
            className="text-xs font-semibold text-slate-500 border rounded-md px-2 py-1 hover:bg-slate-100"
          >
            Dashboard
          </a>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-slate-100 text-slate-700 transition-colors">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-slate-700 hover:text-emerald-700"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="h-px bg-slate-200 my-4" />
                <Link href="http://hassaan431.pythonanywhere.com/brochure/download" target="_blank" className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium h-10 px-4 rounded-md transition-colors w-full">
                  Download Brochure
                </Link>
                <a
                  href="http://hassaan431.pythonanywhere.com/dashboard"
                  target="_blank"
                  className="text-center text-sm font-semibold text-slate-500 border rounded-md px-4 py-2 mt-2 hover:bg-slate-100"
                >
                  Dashboard / Admin Portal
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
