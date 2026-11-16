"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-out text-white ${
        isScrolled
          ? "bg-emerald-950/85 backdrop-blur-xl border-b border-white/15 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
          : "bg-emerald-950/35 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative transition-all duration-500 ${
          isScrolled ? "h-14" : "h-16"
        }`}
      >
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 relative z-10">
          <MagneticButton strength={0.2} maxDistance={8}>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative overflow-hidden rounded-full p-0.5 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo.png"
                  alt="AK Distributors Logo"
                  width={28}
                  height={28}
                  className="object-contain drop-shadow"
                />
              </div>
              <span className="font-semibold text-lg tracking-tight text-white hidden sm:inline-block transition-colors duration-300 group-hover:text-emerald-200">
                AK Distributors
              </span>
            </Link>
          </MagneticButton>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex absolute inset-0 items-center justify-center gap-1.5 pointer-events-none">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <MagneticButton key={link.href} strength={0.25} innerStrength={0.15} maxDistance={6}>
                <Link
                  href={link.href}
                  className={`pointer-events-auto relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white bg-white/10 shadow-inner border border-white/10"
                      : "text-emerald-100/75 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-400 rounded-full"
                    />
                  )}
                </Link>
              </MagneticButton>
            );
          })}
        </nav>

        {/* Social & Mobile Nav Spacer */}
        <div className="hidden md:flex items-center gap-4 relative z-10">
          <MagneticButton strength={0.35} maxDistance={10}>
            <Link
              href="https://www.instagram.com/akdistributorsllc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="p-2 rounded-full text-emerald-100/80 hover:text-white hover:bg-white/10 transition-colors duration-300 flex items-center justify-center"
            >
              <FaInstagram className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="https://www.instagram.com/akdistributorsllc/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 text-emerald-100/80 hover:text-white transition-colors"
          >
            <FaInstagram className="h-5 w-5" />
          </Link>
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
                      className={`flex items-center text-xl sm:text-2xl font-medium transition-colors py-4 border-b border-emerald-900/60 ${
                        pathname === link.href ? "text-emerald-300" : "text-white hover:text-emerald-300"
                      }`}
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

      {/* Subtle Luminous Bottom Hairline when Scrolled */}
      <div
        className={`h-px w-full bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent transition-opacity duration-500 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </header>
  );
}
