import { defineArrayMember, defineField, defineType } from "sanity";
import { allSizes } from "@/data/products";

export const brand = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Brand name", type: "string", validation: (r) => r.required() }),
  ],
});

const colorway = defineArrayMember({
  name: "colorway",
  title: "Colorway",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Color name",
      description: 'What customers see, e.g. "Black / White"',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      description: "Side view, toe pointing right, plain or transparent background. Same angle for every colorway.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "swatch",
      title: "Swatch color",
      description: "The little color dot customers tap",
      type: "color",
      options: { disableAlpha: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "background",
      title: "Background color",
      description: "Optional. The page background behind the shoe for this color. Text turns white automatically on dark colors.",
      type: "color",
      options: { disableAlpha: true },
    }),
    defineField({
      name: "gallery",
      title: "More photos",
      description: "Optional. Other angles, the sole, close-ups. Shown as a gallery on the shoe page. Drag to reorder.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
    }),
    defineField({
      name: "inStock",
      title: "Sizes in stock (EU)",
      description: "Tick every size you have in this color",
      type: "array",
      of: [{ type: "string" }],
      options: { list: allSizes.map((s) => ({ title: s, value: s })), layout: "grid" },
    }),
  ],
  preview: {
    select: { title: "name", media: "image", sizes: "inStock" },
    prepare: ({ title, media, sizes }) => ({
      title,
      media,
      subtitle: sizes?.length ? `In stock: ${sizes.join(", ")}` : "No sizes in stock",
    }),
  },
});

export const product = defineType({
  name: "product",
  title: "Shoe",
  type: "document",
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "colors", title: "Colors & sizes" },
  ],
  fields: [
    defineField({ name: "name", title: "Shoe name", type: "string", group: "details", validation: (r) => r.required() }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
      group: "details",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      description: 'Click "Generate". This becomes footworx.../shoes/<this>',
      type: "slug",
      group: "details",
      options: { source: "name", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Type",
      type: "string",
      group: "details",
      options: { list: ["Running", "Trail", "Football", "Casual"], layout: "radio", direction: "horizontal" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gender",
      title: "For",
      type: "string",
      group: "details",
      options: { list: ["Men", "Women", "Unisex", "Kids"], layout: "radio", direction: "horizontal" },
      initialValue: "Unisex",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Price (N$)",
      type: "number",
      group: "details",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "salePrice",
      title: "Sale price (N$)",
      description: "Leave empty when the shoe is not on sale",
      type: "number",
      group: "details",
      validation: (r) => r.positive(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "details",
    }),
    defineField({ name: "isNew", title: "Show as NEW", type: "boolean", initialValue: false, group: "details" }),
    defineField({
      name: "featured",
      title: "Feature on the home page",
      description: "The newest featured shoe is the big floating shoe on the home page",
      type: "boolean",
      initialValue: false,
      group: "details",
    }),
    defineField({
      name: "colorways",
      title: "Colors",
      type: "array",
      group: "colors",
      of: [colorway],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "name", brand: "brand.name", price: "price", media: "colorways.0.image" },
    prepare: ({ title, brand, price, media }) => ({
      title,
      subtitle: [brand, price ? `N$ ${price}` : null].filter(Boolean).join(" · "),
      media,
    }),
  },
  orderings: [{ title: "Newest first", name: "createdDesc", by: [{ field: "_createdAt", direction: "desc" }] }],
});

export const schemaTypes = [product, brand];
