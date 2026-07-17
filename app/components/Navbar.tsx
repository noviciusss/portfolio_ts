"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import LogoIcon from './LogoIcon';

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Ask AI", href: "#ask" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          if (activeSection !== section) {
            setActiveSection(section);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-background border-b-[3px] border-border"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-foreground group">
            <LogoIcon className="w-6 h-6 text-foreground" />
            <span>~/samarth.dev</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4">
              {navItems.map((item) => {
                const isLinkActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`font-sans text-[11px] uppercase tracking-wider relative px-3.5 py-1.5 transition-colors font-bold ${
                      isLinkActive 
                        ? 'text-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isLinkActive && (
                      <motion.span
                        className="absolute inset-0 bg-accent border-[2px] border-border"
                        layoutId="navActiveBlock"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Placements Badge */}
            <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase border-l-2 border-border/20 pl-6 text-foreground">
              <span className="inline-block size-2 border border-ink bg-phosphor rounded-full" aria-hidden="true" />
              Open to placements 2026
            </span>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-none hover:bg-secondary w-8 h-8 flex items-center justify-center border-[3px] border-border text-foreground transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--amber)] shadow-[4px_4px_0_0_var(--amber)] cursor-pointer"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {theme === "dark" ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-none w-8 h-8 flex items-center justify-center border-[3px] border-border text-foreground shadow-[3px_3px_0_0_var(--amber)]"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
              </Button>
            )}
            
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-none w-8 h-8 flex items-center justify-center border-[3px] border-border text-foreground shadow-[3px_3px_0_0_var(--accent)]"
                >
                  <FiMenu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background border-l-[3px] border-border px-6 py-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-foreground border-b-[3px] border-border pb-4 mb-8">
                    <LogoIcon className="w-6 h-6 text-foreground" />
                    <span>~/samarth.dev</span>
                  </div>
                  <nav className="flex flex-col gap-6">
                    {navItems.map((item) => {
                      const isLinkActive = activeSection === item.href.substring(1);
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsSheetOpen(false)}
                          className={`font-sans text-xs uppercase tracking-widest py-2 border-b-2 border-border/20 ${
                            isLinkActive 
                              ? 'text-accent font-bold' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </nav>
                </div>
                <div className="text-center font-mono text-[9px] text-muted-foreground/60 border-t-2 border-border/20 pt-4">
                  &copy; {new Date().getFullYear()} SAMARTH PRATAP SINGH
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}