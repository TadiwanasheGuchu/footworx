/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { HomeBanner, HomeHero, HomeTile, StoryImage } from "@/lib/catalog";

function Photo({ img, eager, className }: { img: StoryImage; eager?: boolean; className?: string }) {
  return (
    <img
      src={img.url}
      alt={img.alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
      style={{ objectPosition: img.position }}
    />
  );
}

/** Opens a page on this site, or a new tab for outside links */
function SmartLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

/** Full-width photo at the very top of the home page */
export function HomeHeroBanner({ hero }: { hero: HomeHero }) {
  return (
    <section className="mx-auto max-w-[1600px] px-0 pt-0 sm:px-4 sm:pt-4">
      <div className="relative h-[78vh] max-h-[760px] min-h-[460px] overflow-hidden sm:rounded-[2rem]">
        <Photo img={hero.image} eager />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/0" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 text-white sm:px-8 sm:pb-14">
          {hero.eyebrow && <span className="label mb-3 block text-white/85">{hero.eyebrow}</span>}
          {hero.headline && <h1 className="display max-w-4xl text-6xl sm:text-8xl lg:text-[7.5rem]">{hero.headline}</h1>}
          {hero.text && <p className="mt-4 max-w-xl text-lg text-white/90 sm:text-xl">{hero.text}</p>}
          {hero.buttons.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {hero.buttons.map((b, i) => (
                <SmartLink
                  key={b.href + i}
                  href={b.href}
                  className={`rounded-full px-7 py-3.5 font-semibold transition-colors ${
                    i === 0 ? "bg-white text-ink hover:bg-blue-soft" : "border border-white/60 text-white hover:border-white hover:bg-white/10"
                  }`}
                >
                  {b.label}
                </SmartLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Photo tiles for categories; tiles without a photo get a coloured block */
export function HomeTiles({ tiles }: { tiles: HomeTile[] }) {
  const cols = tiles.length >= 4 ? "lg:grid-cols-4" : tiles.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-8" aria-label="Shop by category">
      <div className={`grid grid-cols-2 gap-3 ${cols}`}>
        {tiles.map((t, i) => (
          <SmartLink
            key={t.href + i}
            href={t.href}
            className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-3xl bg-ink p-5 text-white"
          >
            {t.image && <Photo img={t.image} className="transition-transform duration-500 group-hover:scale-105" />}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <span className="relative flex w-full items-center justify-between gap-2">
              <span className="display text-3xl sm:text-4xl">{t.label}</span>
              <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </SmartLink>
        ))}
      </div>
    </section>
  );
}

/** Big "Explore …" image banners */
export function HomeBanners({ banners }: { banners: HomeBanner[] }) {
  return (
    <div className="flex flex-col gap-6 pb-14">
      {banners.map((b, i) =>
        b.layout === "full" ? (
          <section key={i} className="mx-auto w-full max-w-[1600px] sm:px-4">
            <div className="relative h-[70vh] max-h-[680px] min-h-[420px] overflow-hidden sm:rounded-[2rem]">
              <Photo img={b.image} />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 text-white sm:px-8 sm:pb-14">
                {b.eyebrow && <span className="label mb-3 block text-white/85">{b.eyebrow}</span>}
                <h2 className="display max-w-3xl text-5xl sm:text-7xl">{b.headline}</h2>
                {b.text && <p className="mt-3 max-w-xl text-lg text-white/90">{b.text}</p>}
                {b.button && (
                  <SmartLink href={b.button.href} className="mt-6 inline-block rounded-full bg-white px-7 py-3.5 font-semibold text-ink hover:bg-blue-soft">
                    {b.button.label}
                  </SmartLink>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section key={i} className="mx-auto w-full max-w-7xl px-4 sm:px-8">
            <div className="grid overflow-hidden rounded-[2rem] bg-tile md:grid-cols-2">
              <div className={`relative min-h-[320px] md:min-h-[520px] ${b.layout === "split-right" ? "md:order-2" : ""}`}>
                <Photo img={b.image} />
              </div>
              <div className="flex flex-col justify-center gap-3 p-8 sm:p-12">
                {b.eyebrow && <span className="label text-steel">{b.eyebrow}</span>}
                <h2 className="display text-5xl sm:text-6xl">{b.headline}</h2>
                {b.text && <p className="max-w-md text-lg text-steel">{b.text}</p>}
                {b.button && (
                  <SmartLink href={b.button.href} className="mt-3 self-start rounded-full bg-ink px-7 py-3.5 font-semibold text-white hover:bg-[#1d3349]">
                    {b.button.label}
                  </SmartLink>
                )}
              </div>
            </div>
          </section>
        ),
      )}
    </div>
  );
}
