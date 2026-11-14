import Image from "next/image";

// The Footworx logo (transparent PNGs in /public/brand, made from the original artwork)
const files = {
  navy: "/brand/footworx-logo-navy.png",
  white: "/brand/footworx-logo-white.png",
  blue: "/brand/footworx-logo-blue.png",
};

export function Logo({
  variant = "navy",
  height = 44,
  className,
  priority,
}: {
  variant?: keyof typeof files;
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  // Source image is 648 × 225
  const width = Math.round((height * 648) / 225);
  return (
    <Image
      src={files[variant]}
      alt="Footworx Namibia"
      width={width}
      height={height}
      priority={priority}
      // self-start + shrink-0 stop flex layouts from stretching or squashing it
      className={`block shrink-0 self-start object-contain ${className ?? ""}`}
      style={{ height, width: "auto", maxWidth: "none" }}
    />
  );
}
