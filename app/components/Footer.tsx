"use client";

import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub className="h-5 w-5" />,
      href: "https://github.com/noviciusss",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/spsamar/",
    },
  ];

  return (
    <footer className="bg-background/80 dark:bg-background/80 backdrop-blur-lg border-t border-border/60 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 md:py-16">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Left: Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Samarth Pratap Singh.
                <br />
                All rights reserved.
              </p>
            </div>

            {/* Center: Social Links */}
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>

            {/* Right: Scroll to Top */}
            <div className="flex justify-center md:justify-end">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollToTop}
                className="border-border/70 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Scroll to top"
              >
                <FaArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator className="my-8 bg-border/50" />

          <div className="text-center text-xs text-muted-foreground">
            <p>
              Built with{" "}
              <Link href="https://nextjs.org" target="_blank" className="hover:text-foreground transition-colors">Next.js</Link>,{" "}
              <Link href="https://tailwindcss.com" target="_blank" className="hover:text-foreground transition-colors">Tailwind CSS</Link>, and{" "}
              <Link href="https://ui.shadcn.com" target="_blank" className="hover:text-foreground transition-colors">Shadcn/UI</Link>.
            </p>
            <p>
              Deployed on <Link href="https://vercel.com" target="_blank" className="hover:text-foreground transition-colors">Vercel</Link>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}