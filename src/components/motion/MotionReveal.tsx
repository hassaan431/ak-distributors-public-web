"use client";

import { Reveal } from "cube-motion/react";
import { ReactNode } from "react";

export function MotionReveal({
  children,
  as = "div",
  targets = "children",
  stagger,
  className
}: {
  children: ReactNode;
  as?: string | any;
  targets?: "self" | "children";
  stagger?: number;
  className?: string;
}) {
  return (
    <Reveal as={as} targets={targets} stagger={stagger} className={className}>
      {children}
    </Reveal>
  );
}
