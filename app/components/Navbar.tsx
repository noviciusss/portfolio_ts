"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiMoon, 
  FiSun, 
  FiHome, 
  FiUser, 
  FiCode, 
  FiGrid, 
  FiMail 
} from 'react-icons/fi';
import { useTheme } from 'next-themes';

// Shadcn UI components
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { label: "Home", href: "#hero", icon: <FiHome className="h-5 w-5" /> },
  { label: "About", href: "#about", icon: <FiUser className="h-5 w-5" /> },
  { label: "Skills", href: "#skills", icon: <FiCode className="h-5 w-5" /> },
  { label: "Projects", href: "#projects", icon: <FiGrid className="h-5 w-5" /> },
  { label: "Contact", href: "#contact", icon: <FiMail className="h-5 w-5" /> },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Handle initial mounting (to avoid hydration issues with theme)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Determine active section
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
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

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, activeSection]);
  
  return (
    <TooltipProvider>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-end justify-between">
            <a 
              href="#" 
              className="flex items-center gap-2"
            >
              <Avatar className="h-8 w-8 border-2 border-blue-500">
                <AvatarImage src="/your-avatar.jpg" alt="Your Name" />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">SS</AvatarFallback>
              </Avatar>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio
              </span>
            </a>
            
            {/* Desktop Navigation - Icons Only */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.div 
                      key={item.href}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={item.href}
                            className={`relative p-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                              isActive 
                                ? 'text-white' 
                                : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                            }`}
                          >
                            {isActive && (
                              <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10"
                                layoutId="activeSection"
                                transition={{ type: "spring", duration: 0.6 }}
                              />
                            )}
                            {item.icon}
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Theme Toggle Button */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 ml-2"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={theme}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === "dark" ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              )}
            </div>
            
            {/* Mobile Navigation */}
            <div className="flex items-center gap-4 md:hidden">
              {/* Theme Toggle - Mobile */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
                </Button>
              )}
              
              {/* Mobile Menu Trigger */}
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <FiMenu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
                  <div className="flex flex-col h-full">
                    <div className="py-8 flex justify-center">
                      <Avatar className="h-16 w-16 border-4 border-blue-500">
                        <AvatarImage src="/your-avatar.jpg" alt="Your Name" />
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">SS</AvatarFallback>
                      </Avatar>
                    </div>
                    <nav className="mt-8 flex-1 flex justify-center">
                      <div className="grid grid-cols-3 gap-4">
                        {navItems.map((item) => {
                          const isActive = activeSection === item.href.substring(1);
                          return (
                            <Tooltip key={item.href}>
                              <TooltipTrigger asChild>
                                <a
                                  href={item.href}
                                  onClick={() => setIsSheetOpen(false)}
                                  className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
                                    isActive 
                                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                  }`}
                                >
                                  <div className="text-2xl mb-1">{item.icon}</div>
                                  <span className="text-xs">{item.label}</span>
                                </a>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <p>{item.label}</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </nav>
                    <div className="mt-auto pb-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      &copy; {new Date().getFullYear()} Your Name
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>
    </TooltipProvider>
  );
}