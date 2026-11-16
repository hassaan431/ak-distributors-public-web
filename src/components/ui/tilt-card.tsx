"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt angle in degrees, e.g. 10
  perspective?: number; // perspective in px, e.g. 1000
  scale?: number; // scale on hover, e.g. 1.02
  glare?: boolean; // whether to show specular sheen glare
  glareMaxOpacity?: number; // glare max opacity, e.g. 0.35
  disabled?: boolean;
}

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  glareMaxOpacity = 0.3,
  disabled = false,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  // Check if device supports fine hover (desktop vs touch)
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
      if (disabled || isTouchDevice || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position relative to center of element (-0.5 to 0.5)
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;

      const rotateX = -mouseY * maxTilt;
      const rotateY = mouseX * maxTilt;

      const glareX = ((e.clientX - rect.left) / width) * 100;
      const glareY = ((e.clientY - rect.top) / height) * 100;

      setTransform({
        rotateX,
        rotateY,
        scale,
        glareX,
        glareY,
        glareOpacity: glareMaxOpacity,
      });
    },
    [disabled, isTouchDevice, maxTilt, scale, glareMaxOpacity]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled || isTouchDevice) return;
    setIsHovered(true);
  }, [disabled, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative transition-all duration-300 ease-out will-change-transform", className)}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        transform: `perspective(${perspective}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(${transform.scale}, ${transform.scale}, 1)`,
        transition: isHovered
          ? "transform 100ms cubic-bezier(0.03, 0.98, 0.52, 0.99)"
          : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      {...props}
    >
      {/* Card Content with 3D child preservation */}
      <div className="relative w-full h-full [transform-style:preserve-3d]">
        {children}
      </div>

      {/* Specular Sheen Glare */}
      {glare && !isTouchDevice && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] overflow-hidden mix-blend-overlay transition-opacity duration-300"
          style={{
            opacity: transform.glareOpacity,
            background: `radial-gradient(circle 320px at ${transform.glareX}% ${transform.glareY}%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 80%)`,
          }}
        />
      )}
    </div>
  );
}

export default TiltCard;
