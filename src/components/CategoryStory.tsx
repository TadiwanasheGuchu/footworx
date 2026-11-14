/* eslint-disable @next/next/no-img-element */
import type { Story, StoryImage } from "@/lib/catalog";

// Used until a story with photos is added in Sanity
const fallback: Record<string, { headline: string; subtitle: string; bg: string; text: string }> = {
  all: { headline: "Shop Footworx", subtitle: "Running shoes, insoles and more, fitted in Walvis Bay.", bg: "#e3f4ff", text: "#0b1b2b" },
  shoes: { headline: "Shoes", subtitle: "Road, trail, football and everyday shoes from the brands we trust.", bg: "#e3f4ff", text: "#0b1b2b" },
  accessories: { headline: "Accessories", subtitle: "Insoles, socks and headphones to go with your shoes.", bg: "#fff0e9", text: "#0b1b2b" },
  Running: { headline: "Road running", subtitle: "Cushioned, supportive shoes for the roads and the promenade.", bg: "#0b1b2b", text: "#ffffff" },
  Trail: { headline: "Trail running", subtitle: "Grip and protection for gravel, sand and dunes.", bg: "#2f3b2a", text: "#ffffff" },
  Football: { headline: "Football", subtitle: "Boots for firm ground and astro.", bg: "#0b1b2b", text: "#ffffff" },
  Casual: { headline: "Everyday", subtitle: "Comfortable shoes for work, errands and weekends.", bg: "#e3f4ff", text: "#0b1b2b" },
  Insoles: { headline: "Insoles", subtitle: "Support and comfort, matched to your foot assessment.", bg: "#e3f4ff", text: "#0b1b2b" },
  Socks: { headline: "Socks", subtitle: "Cushioned, blister-resistant socks for every run.", bg: "#fff0e9", text: "#0b1b2b" },
  Headphones: { headline: "Headphones", subtitle: "Open-ear sport headphones: hear the road while you run.", bg: "#0b1b2b", text: "#ffffff" },
};

function Photo({ img, className, eager }: { img: StoryImage; className?: string; eager?: boolean }) {
  return (
    <img
      src={img.url}
      alt={img.alt}
      loading={eager ? "eager" : "lazy"}
      className={`h-full w-full object-cover ${className ?? ""}`}
      style={{ objectPosition: img.position }}
    />
  );
}

/** Photo story at the top of a shop page: big photo with headline, plus a collage of details */
export function CategoryStory({ page, story }: { page: string; story: Story | null }) {
  const fb = fallback[page] ?? fallback.all;
  const headline = story?.headline ?? fb.headline;
  const subtitle = story?.subtitle ?? (story ? undefined : fb.subtitle);

  // No photo yet: a clean colored banner
  if (!story?.main) {
    return (
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-8">
        <div className="rounded-[2rem] px-6 py-14 sm:px-12 sm:py-20" style={{ background: fb.bg, color: fb.text }}>
          <h1 className="display text-6xl sm:text-8xl">{headline}</h1>
          {subtitle && <p className="mt-4 max-w-xl text-lg opacity-80">{subtitle}</p>}
        </div>
      </section>
    );
  }

  const extras = story.images;
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-8">
      <div className={`grid gap-3 lg:h-[480px] ${extras.length ? "lg:grid-cols-[1.7fr_1fr]" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-tile sm:aspect-[16/9] lg:aspect-auto">
          <Photo img={story.main} eager />
          {/* Darken the bottom so the white headline is always readable */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
            <h1 className="display text-5xl sm:text-7xl lg:text-8xl">{headline}</h1>
            {subtitle && <p className="mt-3 max-w-xl text-lg text-white/90">{subtitle}</p>}
          </div>
        </div>

        {extras.length > 0 && (
          <>
            {/* Phones and tablets: swipe through the extra photos */}
            <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 lg:hidden">
              {extras.map((img) => (
                <div key={img.url} className="h-48 w-64 shrink-0 snap-start overflow-hidden rounded-3xl bg-tile sm:h-56 sm:w-80">
                  <Photo img={img} />
                </div>
              ))}
            </div>
            {/* Desktop: a collage beside the main photo */}
            <div
              className={`hidden gap-3 lg:grid ${
                extras.length === 1 ? "grid-cols-1" : extras.length === 2 ? "grid-rows-2" : "grid-cols-2 grid-rows-2"
              }`}
            >
              {extras.map((img, i) => (
                <div
                  key={img.url}
                  className={`overflow-hidden rounded-3xl bg-tile ${extras.length === 3 && i === 0 ? "row-span-2" : ""}`}
                >
                  <Photo img={img} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
