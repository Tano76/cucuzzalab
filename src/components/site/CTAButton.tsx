import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Site-specific CTA buttons.
 * Variants:
 *   - primary  : solid safety yellow with dark text — primary conversion
 *   - secondary: light outline / glass — secondary CTA
 *   - ghost    : minimal text-only link
 */
export const ctaVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium tracking-tight transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-safety text-safety-foreground hover:brightness-105 hover:-translate-y-px shadow-[0_0_0_1px_oklch(0.82_0.155_80/0.4),0_8px_24px_-8px_oklch(0.82_0.155_80/0.6)]",
        secondary:
          "border border-line bg-surface/40 text-foreground backdrop-blur-sm hover:bg-surface hover:border-foreground/30",
        ghost:
          "text-foreground/80 hover:text-foreground hover:bg-surface/60",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

type CTACommonProps = VariantProps<typeof ctaVariants> & {
  className?: string;
  children: React.ReactNode;
};

type CTAButtonProps = CTACommonProps & {
  href?: string;
} & Omit<React.ComponentProps<"a">, keyof CTACommonProps>;

/**
 * Anchor-styled CTA. Renders as `<a>` — used for navigation/scroll CTAs.
 */
export function CTAButton({
  className,
  variant,
  size,
  href = "#contact",
  children,
  ...props
}: CTAButtonProps) {
  return (
    <a href={href} className={cn(ctaVariants({ variant, size }), className)} {...props}>
      {children}
    </a>
  );
}

type CTASubmitProps = CTACommonProps &
  Omit<React.ComponentProps<"button">, keyof CTACommonProps | "type"> & {
    loading?: boolean;
  };

/**
 * Submit-styled CTA. Renders as `<button type="submit">` — used inside forms.
 * Keyboard accessible: Enter on any form input will trigger this button.
 */
export function CTASubmitButton({
  className,
  variant,
  size,
  children,
  loading = false,
  disabled,
  ...props
}: CTASubmitProps) {
  return (
    <button
      type="submit"
      className={cn(ctaVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
}
