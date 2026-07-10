"use client";

import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import LogoIcon from './LogoIcon';

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
      icon: <FaGithub className="h-4 w-4" />,
      href: "https://github.com/noviciusss",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="h-4 w-4" />,
      href: "https://www.linkedin.com/in/spsamar/",
    },
  ];

  return (
    <footer className="bg-background border-t-[3px] border-border relative z-10 py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground font-bold">
              &copy; {new Date().getFullYear()} Samarth Pratap Singh.
              <br />
              All rights reserved.
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="nb-btn bg-background text-foreground border-2 p-2.5 shadow-[3px_3px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_var(--border)] shrink-0"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Right: Scroll to Top */}
          <div className="flex justify-center md:justify-end">
            <button
              onClick={scrollToTop}
              className="nb-btn nb-btn-primary p-2.5 shadow-[3px_3px_0_0_var(--border)]"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Separator line */}
        <div className="my-8 border-t-[3px] border-border/20" />

        <div className="flex flex-col items-center justify-center gap-4 text-center text-xs text-muted-foreground font-bold">
          <LogoIcon className="w-8 h-8 text-foreground opacity-80" />
          <div>
            <p>
              Built by ~/samarth.dev. Measured, not vibes.
            </p>
            <p className="mt-1.5 text-[10px]">
              Hosted and deployed on Vercel.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}