"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between relative">
        <div className="flex items-center gap-3 relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="AK Distributors Logo" width={28} height={28} className="object-contain" />
            <span className="font-semibold text-lg tracking-tight text-foreground hidden sm:inline-block">
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
              className="pointer-events-auto text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Spacer / Button placeholder for symmetry */}
        <div className="hidden md:flex items-center gap-3 relative z-10 w-[28px]">
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-secondary text-foreground transition-colors">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-border">
              <nav className="flex flex-col gap-6 mt-12">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold text-foreground hover:text-primary tracking-tight transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
