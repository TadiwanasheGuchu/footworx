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
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Footworx")
          .items([
            S.documentTypeListItem("product").title("Shoes"),
            S.documentTypeListItem("brand").title("Brands"),
          ]),
    }),
    colorInput(),
  ],
});
