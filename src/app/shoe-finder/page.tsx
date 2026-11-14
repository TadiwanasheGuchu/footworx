import type { Metadata } from "next";
import { getProducts } from "@/lib/catalog";
import { ShoeFinder } from "@/components/ShoeFinder";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Shoe Finder",
  description: "Answer 6 quick questions and find the right running or everyday shoe, then book a foot assessment in Walvis Bay.",
};

export default async function ShoeFinderPage() {
  const products = await getProducts();
  return <ShoeFinder products={products} />;
}
