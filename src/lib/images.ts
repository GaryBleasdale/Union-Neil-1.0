import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

// Responsive AVIF variants for a mobile/desktop art-directed <picture>.
export async function artDirectedSources(mobile: ImageMetadata, desktop: ImageMetadata) {
  const [m, d] = await Promise.all([
    getImage({ src: mobile, format: "avif", widths: [320, 480, 640, 800, 1080] }),
    getImage({ src: desktop, format: "avif", widths: [640, 960, 1280, 1634] }),
  ]);
  return { mobile: m, desktop: d };
}
