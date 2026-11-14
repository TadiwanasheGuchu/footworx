"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { colorInput } from "@sanity/color-input";
import { schemaTypes } from "@/sanity/schemas";
import { projectId, dataset } from "@/sanity/env";

export default defineConfig({
  name: "footworx",
  title: "Footworx",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      { id: "product-accessory", title: "Accessory", schemaType: "product", value: { kind: "accessory" } },
    ],
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Footworx")
          .items([
            S.listItem()
              .title("Shoes")
              .schemaType("product")
              .child(S.documentList().title("Shoes").filter('_type == "product" && (!defined(kind) || kind == "shoe")')),
            S.listItem()
              .title("Accessories")
              .schemaType("product")
              .child(
                S.documentList()
                  .title("Accessories")
                  .filter('_type == "product" && kind == "accessory"')
                  .initialValueTemplates([S.initialValueTemplateItem("product-accessory")]),
              ),
            S.documentTypeListItem("product").title("All products"),
            S.documentTypeListItem("brand").title("Brands"),
            S.divider(),
            S.documentTypeListItem("categoryStory").title("Category stories"),
          ]),
    }),
    colorInput(),
  ],
});
