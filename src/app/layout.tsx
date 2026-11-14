import type { Metadata } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { isSampleCatalogue } from "@/lib/catalog";

export const metadata: Metadata = {
  title: {
    default: "Footworx Namibia | Running, football and everyday shoes",
    template: "%s | Footworx Namibia",
  },
  description: "Hoka, Joma and more in Windhoek. Order online, on WhatsApp, or collect in store.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const sample = await isSampleCatalogue();
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        {sample && (
          <div className="bg-dune px-4 py-2 text-center text-sm font-bold text-ink">
            Prototype: sample products and prices, not real stock yet.
          </div>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
