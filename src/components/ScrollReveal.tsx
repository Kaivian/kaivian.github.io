"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  viewportAmount?: number | "some" | "all";
  once?: boolean;
  className?: string;
  scale?: number;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 35,
  viewportAmount = 0.15,
  once = true,
  className = "",
  scale,
  ...props
}: ScrollRevealProps) {
  const getInitialTransform = () => {
    const baseScale = scale !== undefined ? scale : 1;
    switch (direction) {
      case "up":
        return { y: distance, x: 0, scale: baseScale };
      case "down":
        return { y: -distance, x: 0, scale: baseScale };
      case "left":
        return { x: distance, y: 0, scale: baseScale };
      case "right":
        return { x: -distance, y: 0, scale: baseScale };
      case "none":
        return { x: 0, y: 0, scale: baseScale };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialTransform(),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once, amount: viewportAmount }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // Smooth editorial ease-out cubic
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface ScrollStaggerGroupProps {
  children: React.ReactNode;
  staggerDelay?: number;
  viewportAmount?: number | "some" | "all";
  once?: boolean;
  className?: string;
}

export function ScrollStaggerGroup({
  children,
  staggerDelay = 0.1,
  viewportAmount = 0.15,
  once = true,
  className = "",
}: ScrollStaggerGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: viewportAmount }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScrollStaggerItemProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  className?: string;
}

export function ScrollStaggerItem({
  children,
  direction = "up",
  distance = 30,
  duration = 0.6,
  className = "",
}: ScrollStaggerItemProps) {
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          ...getInitialTransform(),
        },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            ease: [0.215, 0.61, 0.355, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
