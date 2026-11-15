import type { Metadata } from "next";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow/700.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { isSampleCatalogue } from "@/lib/catalog";
import { CartProvider } from "@/lib/cart";

export const metadata: Metadata = {
  title: {
    default: "Footworx Namibia | Foot assessments & running shoes, Walvis Bay",
    template: "%s | Footworx Namibia",
  },
  description: "Biomechanical foot assessments and running shoes in Walvis Bay: Hoka, Brooks, New Balance, Saucony, Mizuno, Salomon, Joma and Hush Puppies.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const sample = await isSampleCatalogue();
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <CartProvider>
        {sample && (
          <div className="bg-ink px-4 py-2 text-center text-sm font-medium text-white">
            Prototype: sample products and prices, not real stock yet.
          </div>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
