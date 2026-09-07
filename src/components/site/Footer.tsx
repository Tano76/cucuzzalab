import { Box, Mail, Linkedin, Globe } from "lucide-react";

const NAV = [
  { label: "Example Simulator", href: "#example-simulator" },
  { label: "Pilot", href: "#pilot" },
  { label: "FAQ", href: "#faq" },
  { label: "Request a Demo", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line/60 bg-surface-soft/40">
      <div className="container-tight px-6 py-14 md:px-10 md:py-16 lg:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-6">
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 focus-ring rounded-md"
              aria-label="cucuzzalab — back to top"
            >
              <Box className="h-5 w-5 text-safety" strokeWidth={2} aria-hidden />
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                cucuzza<span className="text-safety">lab</span>
              </span>
            </a>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Browser-based 3D training simulators for construction, surveying
              and civil engineering education. Practice before the physical lab.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Navigate
            </span>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-ring rounded"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Contact
            </span>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="group flex items-center gap-2.5 text-sm text-foreground transition-colors hover:text-safety focus-ring rounded"
                >
                  <Mail className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-safety" />
                  <span>Email — cucuzzalabs@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/max-lombardo-80567b86/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-sm text-foreground transition-colors hover:text-safety focus-ring rounded"
                >
                  <Linkedin className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-safety" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/Maxlombardo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-sm text-foreground transition-colors hover:text-safety focus-ring rounded"
                >
                  <Globe className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-safety" />
                  <span>Portfolio</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 border-t border-line/60 pt-6">
          <p className="text-xs text-muted-foreground/70">
            © {year} cucuzzalab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
