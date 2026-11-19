import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDown, Clock, MessageCircle, Phone, PlaneLanding, PoundSterling, ShieldCheck, Handshake, type LucideIcon } from "lucide-react";
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
  // Replaces Call to Book with an outlined link: "whatsapp" (default) shows a chat icon before
  // the label, "down" an arrow after it for an on-page jump (e.g. "Explore Services").
  secondary?: { label: string; href: string; icon?: "whatsapp" | "down" | "phone" };
  // Short line under the buttons, used in place of a trust row.
  note?: string;
  // false hides the button row (Contact, where the contact options follow straight away).
  buttons?: boolean;
  // Centres the text (heroes without a photo only, e.g. Contact).
  centered?: boolean;
  // Centred heroes without a photo (About): a wide illustration under the text. From lg its
  // plain top band slides up behind the buttons, so the scene frames them; on phones it sits
  // below, cropped to the middle. `caption` is a small strip between rules underneath.
  illustration?: { image: StaticImageData; alt: string; caption?: string };
  // Heroes without a photo (Contact): an illustration in a rounded cream panel beside the text
  // from lg, below it on phones.
  sideImage?: { image: StaticImageData; alt: string };
  // Homepage: centred text in the sky of a wide panorama (owner's reference). From lg the photo
  // fills the hero at its own shape, anchored to the bottom so the cars stay whole; below lg the
  // text sits on cream above a taller crop of the photo. `glow` is an optional soft cream wash
  // behind the text column for contrast.
  centeredPhoto?: { ratio: number; mobilePosition?: string; glow?: boolean };
  // centeredPhoto heroes only: the eyebrow becomes the first line of the h1, so search engines
  // read "Luton Minicab: <heading>". It looks exactly as before (same eyebrow and h1 styles).
  eyebrowInHeading?: boolean;
  // "stacked" shows the trust row as icons above short labels, with no dividers.
  trustStyle?: "inline" | "stacked";
  // Below lg, where the photo sits above the text in a 16:9 crop: an object-position class
  // that keeps the subject in view (default "object-[68%_center]").
  mobilePhotoPosition?: string;
  // From lg with photoFrom "content": the photo's object-position (default "lg:object-[center_68%]").
  // A lower value shows more of the top, moving a car that sits further left below the text.
  desktopPhotoPosition?: string;
  // From lg with photoFrom "content": replaces where the photo starts (a "lg:left-[...]" class),
  // to move a photo whose subject sits further left out from under the text.
  photoLeft?: string;
};

const actionClass =
  "inline-flex min-h-13 items-center justify-center rounded-control bg-primary px-7 text-[1.0625rem] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover";

const fades = {
  light: "from-background/94 via-background/90 via-48% to-transparent to-75%",
  dark: "from-foreground/92 via-foreground/85 via-48% to-transparent to-78%",
};

// The one hero used by every page: eyebrow, headline, one sentence, buttons, trust row.
export function PageHero({ eyebrow, heading, text, trust, tone = "light", image, alt = "", action, fade, photoRight = false, compact = false, primary, trustStyle = "inline", photoFrom = "edge", photoMask = "wide", mobilePhotoPosition = "object-[68%_center]", desktopPhotoPosition, photoLeft, secondary, note, buttons = true, centered = false, illustration, sideImage, centeredPhoto, eyebrowInHeading = false }: Props) {
  const dark = tone === "dark" && Boolean(image);

  if (centeredPhoto && image) {
    return (
      <section
        aria-labelledby="page-heading"
        // From lg, full width and the smaller of: the photo's own shape, or the window below the
        // top bar and header (8.5rem), so the whole scene fits on screen. Only sky is trimmed (the
        // photo is anchored to the bottom). vw and svh are divided by the page zoom, which
        // otherwise shrinks them.
        style={{ ["--hero-ratio" as string]: centeredPhoto.ratio }}
        className="relative flex flex-col overflow-hidden lg:block lg:h-[max(30rem,min(calc(100vw/var(--page-zoom)/var(--hero-ratio)),calc(100svh/var(--page-zoom)-8.5rem)))]"
      >
        <div className="relative order-2 aspect-[2/1] lg:absolute lg:inset-0 lg:aspect-auto">
          <Image
            src={image}
            alt={alt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className={`object-cover ${centeredPhoto.mobilePosition ?? "object-[50%_85%]"} lg:object-bottom`}
          />
        </div>
        {centeredPhoto.glow && (
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 hidden h-[62%] bg-[radial-gradient(ellipse_42%_70%_at_50%_30%,var(--color-background)_0%,transparent_100%)] opacity-80 lg:block"
          />
        )}
        <div className={`relative order-1 ${container} pt-10 pb-8 text-center text-foreground sm:pt-12 lg:pt-[clamp(2rem,3vw,3.5rem)] lg:pb-0 lg:[@media(max-height:760px)]:pt-6`}>
          {eyebrowInHeading ? (
            // One h1 holding both lines. The spans carry the same classes the separate eyebrow <p>
            // and h1 had, so nothing moves; the hidden colon makes it read "Luton Minicab: …".
            <h1 id="page-heading" className="mx-auto max-w-4xl">
              <span className={`block ${eyebrowClass} uppercase text-foreground`}>
                {eyebrow}
                <span className="sr-only">: </span>
              </span>
              <span className={`mt-4 block text-balance ${h1} lg:[@media(max-height:760px)]:mt-3 lg:[@media(max-height:760px)]:text-[clamp(2.25rem,3.6vw,3rem)]`}>
                {heading}
              </span>
            </h1>
          ) : (
            <>
              <p className={`${eyebrowClass} text-foreground`}>{eyebrow}</p>
              <h1 id="page-heading" className={`mx-auto mt-4 max-w-4xl text-balance ${h1} lg:[@media(max-height:760px)]:mt-3 lg:[@media(max-height:760px)]:text-[clamp(2.25rem,3.6vw,3rem)]`}>
                {heading}
              </h1>
            </>
          )}
          <p className={`mx-auto mt-5 max-w-3xl ${lead} lg:[@media(max-height:760px)]:mt-3`}>
            {/* One sentence per line from lg, as in the reference. On short windows (760px or less)
                the text block tightens so the buttons stay above the cars. */}
            {text.split(/(?<=\.) /).map((sentence) => (
              <span key={sentence} className="lg:block">
                {sentence}{" "}
              </span>
            ))}
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:justify-center lg:[@media(max-height:760px)]:mt-5">
            <BookOnlineLink arrow size="lg" />
            <CallToBook size="lg" />
          </div>
        </div>
      </section>
    );
  }
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
            className={`relative overflow-hidden lg:absolute ${compact ? "aspect-[2/1]" : "aspect-[16/9]"} ${
              photoRight
                ? `lg:inset-y-0 lg:right-0 ${
                    photoMask === "narrow"
                      ? "lg:[mask-image:linear-gradient(to_right,transparent,rgb(0_0_0/0.6)_34%,black_42%)] xl:[mask-image:linear-gradient(to_right,transparent,black_18%)]"
                      : "lg:[mask-image:linear-gradient(to_right,transparent,rgb(0_0_0/0.6)_34%,black_42%)]"
                  } ${
                    photoFrom === "content" ? "lg:left-[max(2.5rem,calc((100%-80rem)/2+2.5rem))] lg:aspect-auto" : "lg:aspect-[7/4]"
                  }`
                : photoFrom === "content"
                  ? `lg:inset-y-0 lg:right-0 ${photoLeft ?? "lg:left-[calc((max(2.5rem,(100%-80rem)/2+2.5rem)-12%)/0.88)]"} lg:aspect-auto lg:[mask-image:linear-gradient(to_right,transparent,black_6%)]`
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
              className={`object-cover ${mobilePhotoPosition} ${desktopPhotoPosition ?? (photoFrom === "content" ? "lg:object-[center_68%]" : "lg:object-[68%_center]")}`}
            />
          </div>
          {!photoRight && (
            <div aria-hidden className={`absolute inset-0 hidden bg-linear-to-r ${fade ?? fades[tone]} lg:block`} />
          )}
        </>
      )}

      <div className={`relative w-full ${illustration ? "z-10" : ""} ${dark ? "bg-foreground [--color-ring:var(--color-primary)] lg:bg-transparent" : ""}`}>
        <div
          className={`${container} ${compact ? "py-9 sm:py-10 lg:py-12" : "py-12 sm:py-14 lg:py-20"} ${
            sideImage && !image ? "grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-14" : ""
          }`}
        >
          <div className={`${illustration ? "max-w-3xl" : "max-w-xl"} ${textTone} ${centered && !image ? "mx-auto text-center" : ""}`}>
            <p className={`${eyebrowClass} ${dark ? "text-background" : "text-accent"}`}>{eyebrow}</p>
            <h1 id="page-heading" className={`mt-4 ${h1}`}>
              {heading}
            </h1>
            <p className={`mt-5 ${illustration ? "max-w-2xl" : "max-w-md"} ${lead} ${centered && !image ? "mx-auto" : ""}`}>{text}</p>
            {buttons && (
            <div className={`mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-start ${centered && !image ? "sm:justify-center" : ""}`}>
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
                  {secondary ? (
                    <a
                      href={secondary.href}
                      className={`inline-flex min-h-13 items-center justify-center gap-2 whitespace-nowrap rounded-control border px-7 text-[1.0625rem] font-semibold transition-colors ${
                        dark ? "border-background text-background hover:bg-background/10" : "border-input text-foreground hover:border-foreground hover:bg-tint"
                      }`}
                    >
                      {secondary.icon === "phone" && <Phone aria-hidden size={18} strokeWidth={1.75} />}
                      {(secondary.icon ?? "whatsapp") === "whatsapp" && <MessageCircle aria-hidden size={18} strokeWidth={1.75} />}
                      {secondary.label}
                      {secondary.icon === "down" && <ArrowDown aria-hidden size={18} />}
                    </a>
                  ) : (
                    <CallToBook onDark={dark} size="lg" />
                  )}
                </>
              )}
            </div>
            )}
            {note && <p className="mt-6 text-base">{note}</p>}
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
              <ul className={`mt-9 flex flex-wrap gap-x-5 gap-y-3 text-base ${centered && !image ? "justify-center" : ""}`}>
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
          {sideImage && !image && (
            <div className="overflow-hidden rounded-2xl border border-border bg-paper">
              <Image src={sideImage.image} alt={sideImage.alt} sizes="(min-width: 1024px) 36rem, 100vw" loading="eager" fetchPriority="high" className="h-auto w-full" />
            </div>
          )}
        </div>
      </div>
      {illustration && !image && (
        <>
          {/* Below lg the plain top band (about 26% of the height) is trimmed off by over-sizing it. */}
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[2/1] lg:-mt-[9%] lg:aspect-[1672/586] lg:overflow-visible">
            <div className="absolute inset-x-0 bottom-0 h-[136%] lg:h-full">
              <Image
                src={illustration.image}
                alt={illustration.alt}
                fill
                sizes="100vw"
                className="object-cover object-[55%_bottom] lg:object-center"
              />
            </div>
          </div>
          {illustration.caption && (
            <div className={`${container} flex items-center gap-4 py-5 sm:gap-6`}>
              <span aria-hidden className="hidden h-px flex-1 bg-foreground/40 sm:block" />
              <p className="flex-1 text-center text-sm font-semibold tracking-[0.15em] text-foreground sm:flex-none sm:tracking-[0.2em]">
                {illustration.caption}
              </p>
              <span aria-hidden className="hidden h-px flex-1 bg-foreground/40 sm:block" />
            </div>
          )}
        </>
      )}
    </section>
  );
}
