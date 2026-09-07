"use client";

import { useEffect, useState } from "react";
import { Menu, X, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAButton } from "./CTAButton";

const NAV_LINKS = [
  { label: "Example Simulator", href: "#example-simulator" },
  { label: "Pilot", href: "#pilot" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-line/60 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-tight flex h-16 items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2.5 focus-ring rounded-md"
          aria-label="cucuzzalab — home"
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <Box
              className="h-5 w-5 text-safety"
              strokeWidth={2}
              aria-hidden
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              cucuzza<span className="text-safety">lab</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              3D Training Simulators
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-ring"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-3 lg:flex">
          <CTAButton href="#contact" variant="primary" size="md">
            Request a Demo
          </CTAButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-foreground focus-ring lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden overflow-hidden border-t border-line/60 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav
          aria-label="Mobile"
          className="container-tight flex flex-col gap-1 px-6 py-5 md:px-10"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3">
            <CTAButton
              href="#contact"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Request a Demo
            </CTAButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
