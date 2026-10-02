"use client";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import LogoIcon from "./LogoIcon";

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
    <footer className="bg-background border-t-[3px] border-border relative z-10 py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-xs sm:text-sm text-foreground font-mono font-bold">
              © 2026 Samarth Pratap Singh.
              <br />
              <span className="text-muted-foreground font-normal">All rights reserved.</span>
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="flex justify-center items-center gap-3">
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
            <a
              href="/Samarth_Singh_FDE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nb-btn text-[11px] py-1.5 px-3 bg-canvas border-2 shadow-[2px_2px_0_0_var(--border)] font-mono font-bold"
            >
              Resume ↗
            </a>
          </div>

          {/* Right: Scroll to Top */}
          <div className="flex justify-center md:justify-end">
            <button
              onClick={scrollToTop}
              className="nb-btn nb-btn-primary p-2.5 shadow-[3px_3px_0_0_var(--border)] cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <FaArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Separator line */}
        <div className="my-6 border-t-[2px] border-border/20" />

        <div className="flex flex-col items-center justify-center gap-3 text-center text-xs text-muted-foreground font-mono">
          <LogoIcon className="w-7 h-7 text-foreground opacity-80" />
          <p className="font-semibold text-foreground">
            Measured, not vibes.
          </p>
        </div>
      </div>
    </footer>
  );
}