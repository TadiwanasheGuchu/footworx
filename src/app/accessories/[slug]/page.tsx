import { ProductPage, metadataFor, staticParamsFor, type SlugParams } from "@/components/ProductPage";

export const revalidate = 60;

export const generateStaticParams = () => staticParamsFor("accessory");
export const generateMetadata = (props: SlugParams) => metadataFor("accessory", props);

export default function AccessoryPage(props: SlugParams) {
  return <ProductPage kind="accessory" {...props} />;
}
