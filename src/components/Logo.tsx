import Image from "next/image";
import logo from "../../public/brand/logo.png";

type Props = {
  className?: string;
  // Set on the header logo, which is above the fold on every page.
  eager?: boolean;
};

export function Logo({ className = "", eager = false }: Props) {
  return (
    <Image
      src={logo}
      alt="Luton Minicab"
      className={`w-auto ${className}`}
      sizes="(min-width: 640px) 200px, 160px"
      {...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
    />
  );
}
