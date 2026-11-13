import Link from "next/link";
import { HeaderShell } from "./HeaderShell";
import { SiteNav } from "./SiteNav";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <HeaderShell>
      {/* Logo left, menu centred, Book Online right (from lg); logo and menu button below that. */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:h-24 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <Link href="/" className="justify-self-start py-1">
          <Logo eager className="h-16 sm:h-20" />
        </Link>
        <SiteNav />
      </div>
    </HeaderShell>
  );
}
