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
