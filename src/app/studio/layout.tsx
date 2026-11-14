// The Studio fills the whole screen; this layout sits inside the root layout,
// so we cover the shop header and footer with a fixed full-screen wrapper.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-50 bg-white">{children}</div>;
}
