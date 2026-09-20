"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BrandCarousel({ brands }: { brands: { id: number, name: string, logo_url?: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let lastTime = performance.now();
    let accumulatedScroll = 0;
    const speed = 30; // pixels per second

    const scroll = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      if (!isHovered && container) {
        accumulatedScroll += speed * deltaTime;
        if (accumulatedScroll >= 1) {
            container.scrollLeft += Math.floor(accumulatedScroll);
            accumulatedScroll -= Math.floor(accumulatedScroll);
        }
        
        // Loop back smoothly
        if (container.scrollLeft >= (container.scrollWidth - container.clientWidth) / 2) {
           container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  // Triple the brands array so we have enough content to scroll infinitely
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="relative group w-full">
      <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="flex items-center overflow-x-auto  scrollbar-hide py-4 px-12 sm:px-24 space-x-12 sm:space-x-20"
      >
        {duplicatedBrands.map((brand, i) => (
          <Link key={i} href={`/products?brand=${encodeURIComponent(brand.name)}`} className="transition-transform hover:scale-110 shrink-0 ">
            <Image
              src={brand.logo_url || ""}
              alt={brand.name}
              width={140}
              height={70}
              unoptimized
              className="object-contain h-16 w-auto mix-blend-multiply opacity-80 hover:opacity-100"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
