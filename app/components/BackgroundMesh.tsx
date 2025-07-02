"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// This is the final, highly optimized background component.
// It uses a soft, multi-layered aurora effect for a polished look.
export default function ModernBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      });
    };

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const blobTransition = isScrolling
    ? { type: "spring", stiffness: 10, damping: 10 }
    : { type: "spring", stiffness: 40, damping: 20 };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F8F7F2] dark:bg-[#0a0a0a]">
      {/* Layer 0: Performant CSS Starfield for particle effect */}
      <div className="starfield-bg absolute inset-0" />

      {/* Layer 1: Interactive Gradient Blobs (Colors from your image) */}
      <div className="relative h-full w-full">
        <motion.div
          className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-[#f0e68c]/20 dark:bg-yellow-400/10 opacity-60 blur-[120px]"
          animate={{ x: mousePosition.x * 0.1, y: mousePosition.y * 0.1 }}
          transition={blobTransition}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-2/3 w-2/3 rounded-full bg-[#d8bfd8]/30 dark:bg-fuchsia-500/10 opacity-60 blur-[120px]"
          animate={{ x: -mousePosition.x * 0.05, y: -mousePosition.y * 0.05 }}
          transition={blobTransition}
        />
      </div>

      {/* Layer 2: Performant CSS Aurora (replaces old aurora and waves) */}
      <div
        className={cn(
          "aurora-bg absolute inset-0 transition-opacity duration-1000",
          mounted && "opacity-100"
        )}
      />
    </div>
  );
}
