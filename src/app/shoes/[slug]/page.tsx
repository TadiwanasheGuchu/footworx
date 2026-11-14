import { ProductPage, metadataFor, staticParamsFor, type SlugParams } from "@/components/ProductPage";

export const revalidate = 60;

export const generateStaticParams = () => staticParamsFor("shoe");
export const generateMetadata = (props: SlugParams) => metadataFor("shoe", props);

export default function ShoePage(props: SlugParams) {
  return <ProductPage kind="shoe" {...props} />;
}
