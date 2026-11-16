"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Distance multiplier for magnetic pull (e.g. 0.3)
  innerStrength?: number; // Multiplier for inner element parallax (e.g. 0.15)
  maxDistance?: number; // Max displacement in px (e.g. 15)
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  innerStrength = 0.2,
  maxDistance = 14,
  disabled = false,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [innerPosition, setInnerPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(pointer: coarse)");
      setIsTouchDevice(mq.matches);
      const listener = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isTouchDevice || !buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Clamp distance to maxDistance
      const dist = Math.hypot(deltaX, deltaY);
      const factor = dist > maxDistance ? maxDistance / dist : 1;

      const finalX = deltaX * factor;
      const finalY = deltaY * factor;

      setPosition({ x: finalX, y: finalY });
      setInnerPosition({ x: finalX * (1 + innerStrength), y: finalY * (1 + innerStrength) });
    },
    [disabled, isTouchDevice, strength, innerStrength, maxDistance]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled || isTouchDevice) return;
    setIsHovered(true);
  }, [disabled, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
    setInnerPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block will-change-transform", className)}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? "transform 120ms cubic-bezier(0.1, 0.9, 0.2, 1)"
          : "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      {...props}
    >
      <div
        className="w-full h-full will-change-transform"
        style={{
          transform: `translate3d(${innerPosition.x - position.x}px, ${innerPosition.y - position.y}px, 0)`,
          transition: isHovered
            ? "transform 120ms cubic-bezier(0.1, 0.9, 0.2, 1)"
            : "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default MagneticButton;
