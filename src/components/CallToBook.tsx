import { useId } from "react";
import { Phone } from "lucide-react";
import { site } from "@/config/site";

type Props = {
  // Cream outline and text, for use on the green hero panel.
  onDark?: boolean;
  // Larger button, used in the photo hero.
  size?: "md" | "lg";
};

const baseClass =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control border font-semibold";

const sizes = {
  md: "min-h-[44px] px-6 text-base",
  lg: "min-h-13 px-7 text-[1.0625rem]",
};

export function CallToBook({ onDark = false, size = "md" }: Props) {
  const noteId = useId();
  const toneClass = `${sizes[size]} ${onDark ? "border-background text-background" : "border-input text-foreground"}`;

  if (site.phone) {
    return (
      <a
        href={`tel:${site.phone.replace(/\s+/g, "")}`}
        className={`${baseClass} ${toneClass} transition-colors ${onDark ? "hover:bg-background/10" : "hover:border-foreground hover:bg-tint"}`}
      >
        <Phone aria-hidden size={size === "lg" ? 18 : 16} strokeWidth={1.75} />
        Call to Book
      </a>
    );
  }

  // No number supplied yet: show the button shape without a working link.
  return (
    <span className="flex flex-col items-stretch gap-2 sm:items-start">
      <span
        aria-disabled="true"
        aria-describedby={noteId}
        className={`${baseClass} ${toneClass} cursor-not-allowed`}
      >
        <Phone aria-hidden size={size === "lg" ? 18 : 16} strokeWidth={1.75} />
        Call to Book
      </span>
      <span id={noteId} className={`text-xs ${onDark ? "text-background/75" : "text-foreground/80"}`}>
        [Placeholder: phone number to be added]
      </span>
    </span>
  );
}
