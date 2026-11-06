import Link from "next/link";
import { HeaderShell } from "./HeaderShell";
import { SiteNav } from "./SiteNav";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="mx-auto flex h-20 max-w-7xl sm:h-24 items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="py-1">
          <Logo eager className="h-16 sm:h-20" />
        </Link>
        <SiteNav />
      </div>
    </HeaderShell>
  );
}
