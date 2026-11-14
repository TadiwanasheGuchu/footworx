// Shop details used across the site.
export const site = {
  name: "Footworx Namibia",
  tagline: "Biomechanical foot assessments and running shoes in Walvis Bay.",
  // International format, digits only (264 = Namibia)
  whatsappNumber: "264817483713",
  phoneDisplay: "081 748 3713",
  phoneHref: "tel:+264817483713",
  email: "footworx@assoc.org.na",
  addressLines: [
    "LERA Medical Centre",
    "2 Hidipo Hamutenya Drive, Hermes",
    "Across from Medixx at Welwitschia Private Hospital",
    "Walvis Bay, Namibia",
  ],
  // Used for the map and "Get directions"
  mapQuery: "LERA Medical Centre, 2 Hidipo Hamutenya Drive, Walvis Bay, Namibia",
  // TODO: confirm opening hours
  hours: [
    { days: "Mon – Fri", time: "[09:00 – 17:00]" },
    { days: "Saturday", time: "[09:00 – 13:00]" },
    { days: "Sunday", time: "Closed" },
  ],
  // Brands Footworx stocks (shown on the home page even before they're in the catalogue)
  brands: ["Hoka", "Brooks", "New Balance", "Saucony", "Mizuno", "Salomon", "Joma", "Hush Puppies"],
};

export const shortAddress = "LERA Medical Centre, Hermes, Walvis Bay";

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;
}

export function mapsEmbed() {
  return `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
}

export function formatPrice(nad: number) {
  return `N$ ${nad.toLocaleString("en-NA").replace(/,/g, " ")}`;
}
