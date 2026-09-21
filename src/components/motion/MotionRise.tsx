"use client";

import { Rise } from "cube-motion/react";
import { ReactNode } from "react";

export function MotionRise({
  children,
  as = "div",
  targets = "children",
  stagger,
  delay,
  show = true,
  className
}: {
  children: ReactNode;
  as?: string | any;
  targets?: "self" | "children";
  stagger?: number;
  delay?: number;
  show?: boolean;
  className?: string;
}) {
  return (
    <Rise as={as} targets={targets} stagger={stagger} delay={delay} show={show} className={className}>
      {children}
    </Rise>
  );
}
