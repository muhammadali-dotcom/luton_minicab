// Placeholder while a [slug] page streams in on a client navigation. It's a full screen tall,
// so the booking banner and footer stay below the fold and the visitor isn't left looking
// at them (an empty placeholder pulled them up under the header).
export function PageFallback() {
  return <main id="main" aria-busy="true" className="min-h-dvh flex-1" />;
}
