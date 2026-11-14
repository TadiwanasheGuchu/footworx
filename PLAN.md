# Footworx Website Plan

Online shoe store for Footworx (Namibia), selling brands such as Hoka and Joma.
Customers can buy online, order on WhatsApp, or reserve and collect in store.

## Brand

- **Logo:** white "FOOTWORX" wordmark with a footprint swoosh over the X, "NAMIBIA" underneath.
- **Primary color:** bright sky blue, approximately `#38B6FF` (confirm exact value from the logo source file).
- **Secondary:** white. Add a dark navy/charcoal for text and a warm accent for buttons and sale tags.
- **Feel:** sporty, fresh, energetic. The blue suits the floating-shoe hero as a default background,
  shifting to each colorway's tone when a new color is picked.
- **Needed:** logo as a transparent PNG or SVG (white and a dark version), not only on the blue square.

## Signature experience

A large "floating" shoe that gently bobs above a soft shadow. Picking another
colorway swaps the shoe with a smooth transition, and the page background shifts
to match. Works on the home page hero and on every shoe page.

## Tech stack

| Part | Choice | Why |
| --- | --- | --- |
| Website | **Next.js** + **Tailwind CSS** | Fast, modern, mobile-friendly |
| Animations | **Motion** (Framer Motion) | Floating shoe, color swaps, transitions |
| Product management | **Sanity** (free plan) | Simple browser editor for non-technical staff |
| Hosting | **Netlify** (free plan) | Free tier allows commercial sites |
| Online payments | **PayToday** or **DPO Pay** | Work in Namibia, no monthly fee, per-sale fees only |
| Future 3D (optional) | **Three.js** | Spin-and-customize shoes later without a rebuild |

Running cost to start: domain name (about N$150–300/year for .com.na) plus
payment provider fees per sale.

## How staff manage the store

Staff use Sanity Studio in the browser to:
- Add a shoe: name, brand, category, price (N$), description
- Add colorways: color name, swatch color, photos
- Set which sizes are in stock
- Mark shoes as featured or new arrivals

New or changed shoes appear on the website automatically, with no developer needed.

## Ways to buy

1. **Pay online:** customer is sent to PayToday or DPO Pay's secure payment page and back.
2. **Order on WhatsApp:** button opens WhatsApp with a pre-filled message,
   e.g. "Hi Footworx, I'd like the Hoka Clifton 9, Black, size 42."
3. **Collect in store:** customer reserves a size and gets a confirmation, and staff are notified.
4. **EFT:** bank details shown, and customer sends proof of payment on WhatsApp.

Orders are sent to staff by WhatsApp/email and recorded in Sanity.

## Pages and customer journey

1. **Home:** floating hero shoe with color swatches, featured brands, new arrivals, "Visit our shop"
2. **Shop:** all shoes, filters for brand, category (running, football, casual), gender, size, price
3. **Shoe page:** floating shoe with colorway switcher, size picker showing stock,
   buttons: Buy now / Order on WhatsApp / Collect in store
4. **Cart and checkout:** delivery or pickup, payment choice
5. **Store page:** address, map, opening hours, phone, WhatsApp
6. **About and contact**

## Product photos

- Request official high-res images (ideally transparent cutouts, same angle per colorway)
  from Hoka and Joma suppliers or distributors. Don't copy images from the internet.
- For anything else, shoot in-house: plain background, same side-profile angle, soft daylight.
- Placeholder images are used until real photos arrive.

## To-do (non-technical)

- [ ] Apply for a merchant account with PayToday and/or DPO Pay (confirm payout to a Namibian bank)
- [ ] Get official product images from suppliers
- [ ] Register a domain (e.g. footworx.com.na)
- [ ] Set up a WhatsApp Business number
- [x] Logo and main color (sky blue)
- [ ] Logo source files (transparent PNG/SVG) and final tone

## Build phases

1. **Look and feel:** colors, fonts, floating-shoe style
2. **Prototype:** home page + one shoe page with placeholder shoes
3. **Catalogue:** Sanity setup, shop page with filters, all shoe pages
4. **Ordering:** WhatsApp ordering, collect in store, EFT
5. **Launch:** Netlify hosting, domain, real photos
6. **Online payments:** connect PayToday / DPO Pay once merchant account is approved

## Later, if online orders grow

Consider moving to **Medusa** (free, open-source store with full order and stock
management), which needs its own server and database.
