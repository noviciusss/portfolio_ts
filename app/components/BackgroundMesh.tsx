"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ModernBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });
    };
    const handleScroll = () => {
      setScrollPosition(window.scrollY * 0.025);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient layer - Light mode remains, Dark mode gets a deeper, more cosmic feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-indigo-950 dark:via-black dark:to-purple-950 transition-colors duration-500" />
      
      {/* Mesh grid pattern - More subtle in dark mode */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.008)_1px,transparent_1px)] opacity-70 dark:opacity-100" />
      
      {/* Fine detail grid - More subtle in dark mode */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:8px_8px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.003)_1px,transparent_1px)] opacity-50 dark:opacity-100" />
      
      {/* Noise texture overlay - Adjusted mix-blend for dark mode */}
      <div 
        className="absolute inset-0 opacity-[0.10] mix-blend-multiply dark:opacity-[0.15] dark:mix-blend-screen"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Primary large blur gradients - More vibrant and larger blurs for dark mode */}
      <motion.div 
        className="absolute -left-[20%] -top-[20%] h-[80vh] w-[80vh] rounded-full 
                   bg-gradient-to-br from-blue-200/70 to-indigo-300/80 
                   dark:from-sky-500/30 dark:to-violet-600/40 
                   blur-[120px] dark:blur-[160px] 
                   opacity-70 dark:opacity-50"
        animate={{ 
          x: mousePosition.x * 20 - scrollPosition * 0.5, 
          y: mousePosition.y * 20 - scrollPosition * 0.2
        }}
        transition={{ type: "spring", stiffness: 8, damping: 25 }}
      />
      
      <motion.div 
        className="absolute -right-[25%] top-[30%] h-[70vh] w-[70vh] rounded-full 
                   bg-gradient-to-br from-purple-200/60 to-fuchsia-300/70 
                   dark:from-fuchsia-500/30 dark:to-red-600/30 
                   blur-[100px] dark:blur-[150px] 
                   opacity-70 dark:opacity-40"
        animate={{ 
          x: -mousePosition.x * 20, 
          y: mousePosition.y * 15 - scrollPosition
        }}
        transition={{ type: "spring", stiffness: 7, damping: 25 }}
      />
      
      <motion.div 
        className="absolute bottom-[-10%] left-[10%] h-[60vh] w-[60vh] rounded-full 
                   bg-gradient-to-br from-cyan-200/60 to-teal-300/70 
                   dark:from-emerald-500/30 dark:to-cyan-600/40 
                   blur-[90px] dark:blur-[140px] 
                   opacity-70 dark:opacity-45"
        animate={{ 
          x: mousePosition.x * 15, 
          y: -mousePosition.y * 15 + scrollPosition * 0.8
        }}
        transition={{ type: "spring", stiffness: 10, damping: 25 }}
      />

      {/* Secondary color accents - More ethereal for dark mode */}
      <div className="absolute left-[40%] top-[15%] h-[30vh] w-[30vh] rounded-full bg-amber-200/50 dark:bg-purple-700/20 blur-[80px] dark:blur-[100px] opacity-60 dark:opacity-30" />
      <div className="absolute right-[30%] bottom-[25%] h-[25vh] w-[25vh] rounded-full bg-emerald-200/50 dark:bg-sky-700/20 blur-[70px] dark:blur-[90px] opacity-60 dark:opacity-30" />
      <div className="absolute left-[25%] bottom-[10%] h-[20vh] w-[20vh] rounded-full bg-rose-200/50 dark:bg-pink-700/15 blur-[60px] dark:blur-[80px] opacity-60 dark:opacity-25" />

      {/* Geometric shapes - More glassy/ethereal in dark mode */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-lg backdrop-blur-sm 
                       border 
                       border-black/10 bg-white/10 backdrop-brightness-105 
                       dark:border-white/15 dark:bg-white/5 dark:backdrop-brightness-90 dark:backdrop-blur-lg`}
            initial={{ 
              rotate: Math.random() * 20 - 10,
              scale: 0.8 + Math.random() * 0.4
            }}
            animate={{
              y: [ scrollPosition * (0.1 + i * 0.05) + (i % 2 === 0 ? 10 : -10), scrollPosition * (0.1 + i * 0.05) + (i % 2 === 0 ? -10 : 10) ],
              rotate: [ Math.random() * 10 - 5, Math.random() * 10 - 5 ],
              scale: [ 0.8 + Math.random() * 0.2, 0.9 + Math.random() * 0.2 ]
            }}
            transition={{ duration: 12 + Math.random() * 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${20 + Math.random() * 60}%`,
              width: `${80 + Math.random() * 120}px`,
              height: `${80 + Math.random() * 120}px`,
              opacity: 0.4 + Math.random() * 0.3 
            }}
          />
        ))}
      </div>
      
      {/* Glowing dots - More vibrant and distinct glow for dark mode */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full 
                       bg-blue-400/40 shadow-lg shadow-blue-400/30
                       dark:bg-transparent 
                       dark:shadow-[0_0_15px_3px_var(--glow-color)]
            `}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0.25 + Math.random() * 0.4,
              scale: 0.5 + Math.random() * 0.5,
              // @ts-ignore
              "--glow-color": i % 5 === 0 ? "rgba(59,130,246,0.5)" : // sky
                              i % 5 === 1 ? "rgba(168,85,247,0.5)" : // purple
                              i % 5 === 2 ? "rgba(20,184,166,0.5)" : // teal
                              i % 5 === 3 ? "rgba(245,158,11,0.5)" : // amber
                                            "rgba(244,63,94,0.5)"    // rose
            }}
            animate={{
              y: [ `${Math.random() * 15 + 5}%`, `${Math.random() * 15 + 85}%` ],
              opacity: [0.35, 0.85, 0.35], 
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 10 + Math.random() * 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: Math.random() * 5 }}
            style={{
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`, 
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Light beams - More defined in dark mode */}
      <div className="absolute inset-0 overflow-hidden opacity-40 dark:opacity-25">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-current to-transparent"
            style={{
              width: `${60 + i * 10}%`,
              left: `${20 - i * 5}%`,
              top: `${30 + i * 25}%`,
              // @ts-ignore
              color: `var(--beam-color-${i})` // Uses CSS variable set in initial/animate
            }}
            initial={{
                // @ts-ignore
                "--beam-color-0": "rgba(59, 130, 246, 0.7)", 
                // @ts-ignore
                "--beam-color-1": "rgba(139, 92, 246, 0.7)", 
                // @ts-ignore
                "--beam-color-2": "rgba(20, 184, 166, 0.7)", 
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2], 
              width: [`${60 + i * 10}%`, `${70 + i * 10}%`, `${60 + i * 10}%`],
              left: [`${20 - i * 5}%`, `${15 - i * 5}%`, `${20 - i * 5}%`],
                // @ts-ignore
                "--beam-color-0": typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? "rgba(147,197,253,0.4)" : "rgba(59, 130, 246, 0.7)",
                // @ts-ignore
                "--beam-color-1": typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? "rgba(192,132,252,0.4)" : "rgba(139, 92, 246, 0.7)",
                // @ts-ignore
                "--beam-color-2": typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? "rgba(94,234,212,0.4)" : "rgba(20, 184, 166, 0.7)",
            }}
            transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
      {/* Final backdrop blur for depth - Remains strong, perhaps slightly more opaque in dark mode */}
      <div className="absolute inset-0 backdrop-blur-[200px] opacity-50 dark:opacity-60" />
    </div>
  );
}