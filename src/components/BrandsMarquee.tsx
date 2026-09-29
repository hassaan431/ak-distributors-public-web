"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Brand {
  name: string;
  logo_url: string;
}

export default function BrandsMarquee({ brands }: { brands: Brand[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const scroll = (time: number) => {
      if (!isPaused && scrollRef.current) {
        const delta = time - lastTime;
        // Adjust speed here (pixels per ms)
        scrollRef.current.scrollLeft += 0.05 * delta;
        
        // Reset scroll position if we've scrolled past half the content
        // (assuming we duplicated the content)
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
           scrollRef.current.scrollLeft = 0;
        }
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Duplicate brands array 4 times to ensure enough content for smooth infinite scrolling
  const displayBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="relative flex group">
      <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none" />
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide w-full items-center py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {displayBrands.map((brand, i) => (
          <Link 
            key={i} 
            href={`/products?brand=${encodeURIComponent(brand.name)}`} 
            className="mx-6 md:mx-12 shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            <Image
              src={brand.logo_url}
              alt={brand.name}
              width={140}
              height={70}
              unoptimized
              className="object-contain h-12 md:h-14 w-auto mix-blend-multiply grayscale hover:grayscale-0 transition-all"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
