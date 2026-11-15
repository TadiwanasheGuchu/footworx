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
  hours: [
    { days: "Mon – Fri", time: "08:00 – 17:00" },
    { days: "Sat – Sun", time: "Closed" },
  ],
  // Brands Footworx stocks (shown on the home page even before they're in the catalogue)
  brands: ["Hoka", "Brooks", "New Balance", "Saucony", "Mizuno", "Salomon", "Joma", "Hush Puppies", "Shokz"],
};

// Online payments. "demo" shows the full flow with a pretend payment page and takes no money.
// When the merchant account is ready, this becomes "live" with the real provider.
export const payments = {
  mode: "demo" as "demo" | "live",
  provider: "PayToday / DPO Pay",
  // EFT: bank details are sent on WhatsApp until they are added here.
  // To show them on the order page, fill in all four values.
  eft: {
    bank: "",
    accountName: "Footworx Namibia",
    accountNumber: "",
    branchCode: "",
  },
  deliveryNote:
    "Delivery in Walvis Bay and Swakopmund in 1 to 2 working days, and courier to the rest of Namibia in 2 to 5 working days. We confirm the cost on WhatsApp before sending.",
  returnsSummary:
    "Unworn items in their original box can be exchanged, or returned for store credit, within 14 days with proof of purchase. Faulty items are repaired, replaced or refunded.",
  collectionDays: 7,
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
