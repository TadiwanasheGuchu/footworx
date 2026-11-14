// Shop details used across the site.
// TODO: replace the placeholders with the real Footworx details.
export const site = {
  name: "Footworx Namibia",
  // International format, digits only (264 = Namibia). Placeholder number.
  whatsappNumber: "264810000000",
  phoneDisplay: "+264 81 000 0000",
  address: "[Shop address], Windhoek, Namibia",
  hours: [
    { days: "Mon – Fri", time: "[09:00 – 17:00]" },
    { days: "Saturday", time: "[09:00 – 13:00]" },
    { days: "Sunday", time: "Closed" },
  ],
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(nad: number) {
  return `N$ ${nad.toLocaleString("en-NA").replace(/,/g, " ")}`;
}
