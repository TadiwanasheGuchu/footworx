import Link from "next/link";

/** Simple page layout for help and legal pages */
export function InfoPage({
  title,
  intro,
  updated,
  draft,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  draft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-steel">
        <Link href="/" className="hover:underline">Home</Link> <span aria-hidden>›</span> {title}
      </nav>
      <h1 className="display mb-4 text-5xl sm:text-6xl">{title}</h1>
      {intro && <p className="mb-6 text-lg text-steel">{intro}</p>}
      {updated && <p className="mb-8 text-sm text-steel">Last updated: {updated}</p>}
      {draft && (
        <p className="mb-8 rounded-2xl border-2 border-dashed border-dune bg-dune-soft px-5 py-3 text-[15px]" role="note">
          <strong>Draft.</strong> Items in [brackets] still need Footworx’s details, and these terms should be checked by a
          legal adviser before the shop takes real payments.
        </p>
      )}
      <div className="prose-footworx flex flex-col gap-8">{children}</div>
    </div>
  );
}

export function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div className="flex flex-col gap-3 text-lg leading-relaxed text-ink/85 [&_a]:font-semibold [&_a]:underline [&_li]:ml-5 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1.5">
        {children}
      </div>
    </section>
  );
}
