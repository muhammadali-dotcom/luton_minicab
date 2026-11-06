import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";

type Props = {
  className?: string;
  variant?: "button" | "link";
  label?: string;
  // Trailing arrow on the button variant (the link variant always has one).
  arrow?: boolean;
  // Larger button, used in the photo hero.
  size?: "md" | "lg";
};

const buttonSizes = {
  md: "min-h-[44px] px-6 text-base",
  lg: "min-h-13 px-7 text-[1.0625rem]",
};

const variants = {
  button:
    "justify-center gap-2 whitespace-nowrap rounded-control bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary-hover hover:opacity-90",
  link: "min-h-[44px] gap-2 font-semibold text-foreground underline-offset-4 hover:underline hover:decoration-primary hover:decoration-2",
};

// External booker: plain anchor, same tab (no target attribute).
export function BookOnlineLink({ className = "", variant = "button", label = "Book Online", arrow = false, size = "md" }: Props) {
  const sizeClass = variant === "button" ? buttonSizes[size] : "";
  return (
    <a href={site.bookingUrl} className={`inline-flex items-center ${variants[variant]} ${sizeClass} ${className}`}>
      {label}
      {(variant === "link" || arrow) && <ArrowRight aria-hidden size={16} />}
    </a>
  );
}
