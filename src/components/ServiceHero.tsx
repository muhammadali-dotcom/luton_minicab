import type { ServiceDetail } from "@/config/serviceDetails";
import { site } from "@/config/site";
import { PageHero } from "./PageHero";

// The one hero for every /services/[slug] page, so the rules live in one place:
// - With `heroPhoto`, the owner's wall-style photo runs full width, lined up so the text
//   sits on the wall (whole car kept in the phone crop). Without it, `image` sits on the right.
// - Book Online is always the first button; the second is Call to Book, or
//   "Discuss on WhatsApp" when the service sets `whatsappSecond`.
// - The trust row is the service's own.
export function ServiceHero({ name, detail }: { name: string; detail: ServiceDetail }) {
  const photo = detail.heroPhoto;
  const whatsapp = detail.whatsappSecond && site.whatsapp ? `https://wa.me/${site.whatsapp}` : null;
  return (
    <PageHero
      tone="light"
      {...(photo
        ? {
            image: photo.image,
            alt: photo.alt,
            fade: photo.fade,
            photoFrom: "content" as const,
            mobilePhotoPosition: "object-[96%_center]",
          }
        : { image: detail.image, alt: detail.alt, photoRight: true, photoMask: "narrow" as const })}
      eyebrow={name.toUpperCase()}
      heading={<span className="block text-balance">{detail.hero.heading}</span>}
      text={detail.hero.text}
      secondary={whatsapp ? { label: "Discuss on WhatsApp", href: whatsapp } : undefined}
      trust={detail.trust}
    />
  );
}
