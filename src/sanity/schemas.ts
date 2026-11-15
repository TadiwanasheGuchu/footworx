import { defineArrayMember, defineField, defineType } from "sanity";
import { accessoryCategories, accessorySizeOptions, allSizes, shoeCategories } from "@/data/products";

// Field visibility helpers: the editor only shows what fits the product type
type Doc = { kind?: string; accessoryType?: string } | undefined;
const isAccessory = (d: Doc) => d?.kind === "accessory";
const accessoryIs = (d: Doc, t: string) => isAccessory(d) && d?.accessoryType === t;

export const brand = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Brand name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      title: "Logo",
      description:
        "Official logo from the brand or your supplier (dealer kit). Transparent PNG or SVG, dark logo for a white background. Shown in the moving 'Brands we stock' strip.",
      type: "image",
    }),
  ],
  preview: { select: { title: "name", media: "logo" } },
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
      description:
        "Shoes: side view, toe pointing right, transparent background (PNG/WebP). Accessories: the product on a plain or transparent background.",
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
      hidden: ({ document }) => isAccessory(document as Doc),
    }),
    defineField({
      name: "inStockInsoles",
      title: "Insole sizes in stock (EU)",
      description: "Tick every size you have in this color",
      type: "array",
      of: [{ type: "string" }],
      options: { list: accessorySizeOptions.Insoles.map((s) => ({ title: s, value: s })), layout: "grid" },
      hidden: ({ document }) => !accessoryIs(document as Doc, "Insoles"),
    }),
    defineField({
      name: "inStockSocks",
      title: "Sock sizes in stock",
      description: "Tick every size you have in this color",
      type: "array",
      of: [{ type: "string" }],
      options: { list: accessorySizeOptions.Socks.map((s) => ({ title: s, value: s })), layout: "grid" },
      hidden: ({ document }) => !accessoryIs(document as Doc, "Socks"),
    }),
    defineField({
      name: "inStockOneSize",
      title: "In stock",
      description: "Tick when you have this color in stock",
      type: "boolean",
      initialValue: true,
      hidden: ({ document }) => !accessoryIs(document as Doc, "Headphones"),
    }),
  ],
  preview: {
    select: { title: "name", media: "image", sizes: "inStock", ins: "inStockInsoles", socks: "inStockSocks", one: "inStockOneSize" },
    prepare: ({ title, media, sizes, ins, socks, one }) => {
      const list: string[] = sizes?.length ? sizes : ins?.length ? ins : socks?.length ? socks : one ? ["One size"] : [];
      return { title, media, subtitle: list.length ? `In stock: ${list.join(", ")}` : "Not in stock" };
    },
  },
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "colors", title: "Colors & sizes" },
  ],
  fields: [
    defineField({
      name: "kind",
      title: "Product type",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Shoe", value: "shoe" },
          { title: "Accessory (insoles, socks, headphones)", value: "accessory" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "shoe",
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", title: "Product name", type: "string", group: "details", validation: (r) => r.required() }),
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
      description: 'Click "Generate". This becomes the end of the product\'s web address.',
      type: "slug",
      group: "details",
      options: { source: "name", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Shoe type",
      type: "string",
      group: "details",
      options: { list: [...shoeCategories], layout: "radio", direction: "horizontal" },
      hidden: ({ document }) => isAccessory(document as Doc),
      validation: (r) =>
        r.custom((v, ctx) => (isAccessory(ctx.document as Doc) || v ? true : "Choose a shoe type")),
    }),
    defineField({
      name: "accessoryType",
      title: "Accessory type",
      type: "string",
      group: "details",
      options: { list: [...accessoryCategories], layout: "radio", direction: "horizontal" },
      hidden: ({ document }) => !isAccessory(document as Doc),
      validation: (r) =>
        r.custom((v, ctx) => (!isAccessory(ctx.document as Doc) || v ? true : "Choose an accessory type")),
    }),
    defineField({
      name: "gender",
      title: "For",
      type: "string",
      group: "details",
      options: { list: ["Men", "Women", "Unisex", "Kids"], layout: "radio", direction: "horizontal" },
      initialValue: "Unisex",
      hidden: ({ document }) => isAccessory(document as Doc),
    }),
    defineField({
      name: "support",
      title: "Support (for the Shoe Finder)",
      description: "Stability shoes give extra support for flat or low arches. Most shoes are Neutral.",
      type: "string",
      group: "details",
      options: { list: ["Neutral", "Stability"], layout: "radio", direction: "horizontal" },
      hidden: ({ document }) => isAccessory(document as Doc),
    }),
    defineField({
      name: "cushioning",
      title: "Cushioning (for the Shoe Finder)",
      type: "string",
      group: "details",
      options: { list: ["Soft", "Balanced", "Firm"], layout: "radio", direction: "horizontal" },
      hidden: ({ document }) => isAccessory(document as Doc),
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
      description: "Leave empty when it is not on sale",
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
      description: "Shoes only: the newest featured shoe is the big floating shoe on the home page",
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
    select: { title: "name", brand: "brand.name", price: "price", media: "colorways.0.image", kind: "kind", acc: "accessoryType" },
    prepare: ({ title, brand, price, media, kind, acc }) => ({
      title,
      subtitle: [kind === "accessory" ? acc || "Accessory" : null, brand, price ? `N$ ${price}` : null]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
  orderings: [{ title: "Newest first", name: "createdDesc", by: [{ field: "_createdAt", direction: "desc" }] }],
});

// Which shop page a story belongs to
export const storyPages = [
  { title: "Shop (everything)", value: "all" },
  { title: "All shoes", value: "shoes" },
  { title: "All accessories", value: "accessories" },
  ...shoeCategories.map((c) => ({ title: c, value: c })),
  ...accessoryCategories.map((c) => ({ title: c, value: c })),
];

const storyImage = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Describe the photo",
        description: 'For people who can\'t see it, e.g. "Runner on the Walvis Bay promenade at sunrise"',
        type: "string",
      }),
    ],
  });

export const categoryStory = defineType({
  name: "categoryStory",
  title: "Category story",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Shown on",
      type: "string",
      options: { list: storyPages, layout: "dropdown" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      description: "Short and bold, 2 to 4 words",
      type: "string",
      validation: (r) => r.required().max(40),
    }),
    defineField({ name: "subtitle", title: "Short line", type: "string", validation: (r) => r.max(120) }),
    storyImage(
      "mainImage",
      "Main photo",
      "Your own action photo, landscape. Click the photo, then the crop icon, to set the focus point so faces aren't cut off.",
    ),
    defineField({
      name: "images",
      title: "Extra photos",
      description: "Up to 3 close-ups or details that tell the story (shoes in action, the shop, the dunes)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Describe the photo", type: "string" })],
        },
      ],
      validation: (r) => r.max(3),
      options: { layout: "grid" },
    }),
  ],
  preview: {
    select: { title: "headline", page: "page", media: "mainImage" },
    prepare: ({ title, page, media }) => ({
      title,
      subtitle: storyPages.find((p) => p.value === page)?.title ?? page,
      media,
    }),
  },
});

// ---------- Home page (one document) ----------

const linkField = (name: string, title: string) =>
  defineField({
    name,
    title,
    description: 'A page on the site, e.g. /shop?category=Running, /shop?brand=Joma, /gifts, /shoe-finder',
    type: "string",
    validation: (r) =>
      r.custom((v) => (!v || v.startsWith("/") || v.startsWith("https://") ? true : "Start with / (a page on this site) or https://")),
  });

const photo = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Describe the photo", type: "string" })],
  });

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Top banner", default: true },
    { name: "tiles", title: "Category tiles" },
    { name: "banners", title: "Explore banners" },
  ],
  fields: [
    { ...photo("heroImage", "Top banner photo", "Full width at the very top. Landscape, at least 2400px wide. Leave empty to start with the floating shoe."), group: "hero" },
    defineField({ name: "heroEyebrow", title: "Small line above the headline", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", title: "Headline", description: "2 to 5 bold words", type: "string", group: "hero", validation: (r) => r.max(50) }),
    defineField({ name: "heroText", title: "Short text", type: "string", group: "hero", validation: (r) => r.max(140) }),
    defineField({ name: "heroButton1", title: "Main button text", type: "string", group: "hero" }),
    { ...linkField("heroLink1", "Main button link"), group: "hero" },
    defineField({ name: "heroButton2", title: "Second button text (optional)", type: "string", group: "hero" }),
    { ...linkField("heroLink2", "Second button link"), group: "hero" },
    defineField({
      name: "tiles",
      title: "Category tiles",
      description: "3 or 4 photo tiles under the floating shoe, e.g. Running, Trail, Accessories, Foot assessment",
      type: "array",
      group: "tiles",
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "tile",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            { ...linkField("link", "Link"), validation: (r) => r.required() },
            photo("image", "Photo", "Portrait or square works best"),
          ],
          preview: { select: { title: "label", subtitle: "link", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "banners",
      title: "Explore banners",
      description: "Big image banners further down the page, e.g. 'Explore Joma'. Drag to reorder.",
      type: "array",
      group: "banners",
      of: [
        defineArrayMember({
          type: "object",
          name: "banner",
          fields: [
            photo("image", "Photo", "Landscape, at least 2000px wide"),
            defineField({ name: "eyebrow", title: "Small line above the headline", type: "string" }),
            defineField({ name: "headline", title: "Headline", type: "string", validation: (r) => r.required().max(50) }),
            defineField({ name: "text", title: "Short text", type: "string", validation: (r) => r.max(160) }),
            defineField({ name: "button", title: "Button text", type: "string" }),
            linkField("link", "Button link"),
            defineField({
              name: "layout",
              title: "Layout",
              type: "string",
              options: {
                list: [
                  { title: "Full width, text on the photo", value: "full" },
                  { title: "Photo left, text right", value: "split-left" },
                  { title: "Photo right, text left", value: "split-right" },
                ],
                layout: "radio",
              },
              initialValue: "full",
            }),
          ],
          preview: { select: { title: "headline", subtitle: "layout", media: "image" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

export const schemaTypes = [product, brand, categoryStory, homePage];
