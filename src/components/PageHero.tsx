import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDown, Clock, PlaneLanding, PoundSterling, ShieldCheck, Handshake, type LucideIcon } from "lucide-react";
import { BookOnlineLink } from "./BookOnlineLink";
import { CallToBook } from "./CallToBook";
import { container, eyebrow as eyebrowClass, h1, lead } from "./ui";

type Trust = { label: string; Icon: LucideIcon };

export const trustLocal: Trust[] = [
  { label: "Available 24/7", Icon: Clock },
  { label: "Fixed fares", Icon: PoundSterling },
  { label: "DBS-checked drivers", Icon: ShieldCheck },
];

export const trustAirport: Trust[] = [
  { label: "Flight tracking", Icon: PlaneLanding },
  { label: "Meet and greet", Icon: Handshake },
  { label: "Available 24/7", Icon: Clock },
];

type Props = {
  eyebrow: string;
  heading: ReactNode;
  text: string;
  trust?: Trust[];
  // A light photo uses a cream fade with green text; a dark photo a green fade with cream text.
  tone?: "light" | "dark";
  image?: StaticImageData;
  alt?: string;
  // Holding pages and the 404 replace the two booking buttons with one action.
  action?: { label: string; href: string };
  // Overrides the tone's fade for a photo that needs less cover. Keep text at 4.5:1 or better.
  fade?: string;
  // Desktop: shows a photo uncropped on the right at full hero height, blending its left
  // edge into the page. For photos too tall for the hero with a plain area on the left.
  photoRight?: boolean;
  // With photoRight: "content" starts the photo at the page content's left edge and covers
  // to the right edge, so a photo with a wide plain left side sits close to the text.
  // Full-width photo: "content" lines the photo up so the text starts about 12% into it,
  // keeping text on a plain left area of the photo at every desktop width.
  photoFrom?: "edge" | "content";
  // With photoRight: "narrow" fades only the photo's left edge from xl up, for photos with
  // people on the left (below xl the photo reaches the text, so it keeps the wide fade).
  photoMask?: "wide" | "narrow";
  // Shorter hero, for pages where visitors need to reach a choice quickly.
  compact?: boolean;
  // Replaces Book Online with an on-page link (with a down arrow); Call to Book stays.
  primary?: { label: string; href: string };
  // "stacked" shows the trust row as icons above short labels, with no dividers.
  trustStyle?: "inline" | "stacked";
};

const actionClass =
  "inline-flex min-h-13 items-center justify-center rounded-control bg-primary px-7 text-[1.0625rem] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover";

const fades = {
  light: "from-background/94 via-background/90 via-48% to-transparent to-75%",
  dark: "from-foreground/92 via-foreground/85 via-48% to-transparent to-78%",
};

// The one hero used by every page: eyebrow, headline, one sentence, buttons, trust row.
export function PageHero({ eyebrow, heading, text, trust, tone = "light", image, alt = "", action, fade, photoRight = false, compact = false, primary, trustStyle = "inline", photoFrom = "edge", photoMask = "wide" }: Props) {
  const dark = tone === "dark" && Boolean(image);
  const textTone = dark ? "text-background" : "text-foreground";

  return (
    <section
      aria-labelledby="page-heading"
      className={`relative overflow-hidden ${
        image ? `lg:flex lg:items-center ${compact ? "lg:min-h-[clamp(27rem,29vw,31rem)]" : "lg:min-h-[clamp(35rem,38vw,40rem)]"}` : ""
      }`}
    >
      {image && (
        <>
          <div
            className={`relative lg:absolute ${compact ? "aspect-[2/1]" : "aspect-[16/9]"} ${
              photoRight
                ? `lg:inset-y-0 lg:right-0 ${
                    photoMask === "narrow"
                      ? "lg:[mask-image:linear-gradient(to_right,transparent,rgb(0_0_0/0.6)_34%,black_42%)] xl:[mask-image:linear-gradient(to_right,transparent,black_18%)]"
                      : "lg:[mask-image:linear-gradient(to_right,transparent,rgb(0_0_0/0.6)_34%,black_42%)]"
                  } ${
                    photoFrom === "content" ? "lg:left-[max(2.5rem,calc((100%-80rem)/2+2.5rem))] lg:aspect-auto" : "lg:aspect-[7/4]"
                  }`
                : photoFrom === "content"
                  ? "lg:inset-y-0 lg:right-0 lg:left-[calc((max(2.5rem,(100%-80rem)/2+2.5rem)-12%)/0.88)] lg:aspect-auto lg:[mask-image:linear-gradient(to_right,transparent,black_6%)]"
                  : "lg:inset-0 lg:aspect-auto"
            }`}
          >
            <Image
              src={image}
              alt={alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes={photoRight ? "(min-width: 1024px) 70vw, 100vw" : "100vw"}
              className={`object-cover ${photoFrom === "content" ? "object-[68%_center] lg:object-[center_68%]" : "object-[68%_center]"}`}
            />
          </div>
          {!photoRight && (
            <div aria-hidden className={`absolute inset-0 hidden bg-linear-to-r ${fade ?? fades[tone]} lg:block`} />
          )}
        </>
      )}

      <div className={`relative w-full ${dark ? "bg-foreground [--color-ring:var(--color-primary)] lg:bg-transparent" : ""}`}>
        <div className={`${container} ${compact ? "py-9 sm:py-10 lg:py-12" : "py-12 sm:py-14 lg:py-20"}`}>
          <div className={`max-w-xl ${textTone}`}>
            <p className={`${eyebrowClass} ${dark ? "text-background" : "text-accent"}`}>{eyebrow}</p>
            <h1 id="page-heading" className={`mt-4 ${h1}`}>
              {heading}
            </h1>
            <p className={`mt-5 max-w-md ${lead}`}>{text}</p>
            <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-start">
              {action ? (
                action.href.startsWith("http") ? (
                  <a href={action.href} className={actionClass}>
                    {action.label}
                  </a>
                ) : (
                  <Link href={action.href} className={actionClass}>
                    {action.label}
                  </Link>
                )
              ) : (
                <>
                  {primary ? (
                    <a href={primary.href} className={`${actionClass} gap-2`}>
                      {primary.label}
                      <ArrowDown aria-hidden size={18} />
                    </a>
                  ) : (
                    <BookOnlineLink arrow size="lg" />
                  )}
                  <CallToBook onDark={dark} size="lg" />
                </>
              )}
            </div>
            {trust && trustStyle === "stacked" && (
              <ul className="mt-9 grid max-w-md grid-cols-3 gap-3 text-base">
                {trust.map(({ label, Icon }) => (
                  <li key={label} className="flex flex-col items-start gap-2">
                    <Icon aria-hidden size={30} strokeWidth={1.5} className="shrink-0" />
                    {label}
                  </li>
                ))}
              </ul>
            )}
            {trust && trustStyle === "inline" && (
              <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-base">
                {trust.map(({ label, Icon }) => (
                  <li
                    key={label}
                    className={`flex items-center gap-2 sm:border-l sm:pl-5 sm:first:border-l-0 sm:first:pl-0 ${dark ? "sm:border-background/30" : "sm:border-border"}`}
                  >
                    <Icon aria-hidden size={20} strokeWidth={1.5} className="shrink-0" />
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
