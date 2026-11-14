# Footworx Namibia website

Online shoe store prototype: floating-shoe product showcase, colorway switching,
WhatsApp ordering and collect-in-store. See [PLAN.md](PLAN.md) for the full plan.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

- `src/data/products.ts`: sample products (moves to Sanity later)
- `src/lib/site.ts`: shop details, WhatsApp number, opening hours (placeholders)
- `src/components/FloatingShoe.tsx`: the floating, color-swapping shoe
- `src/components/ShoeArt.tsx`: placeholder shoe drawing, replaced by photos when a colorway has an `image`

## Products (Sanity)

Staff manage shoes at `/studio` on the live site. Setup:

1. Create a free project at https://www.sanity.io/manage (dataset: `production`).
2. In Netlify, add environment variables `NEXT_PUBLIC_SANITY_PROJECT_ID` (the project ID)
   and `NEXT_PUBLIC_SANITY_DATASET` (`production`), then redeploy.
3. In Sanity manage > API > CORS origins, add `https://footworx.netlify.app` with "Allow credentials" ticked.
4. Invite staff under Sanity manage > Members.

Until Sanity has at least one shoe, the site shows the sample catalogue. Changes appear on the site within about a minute.
