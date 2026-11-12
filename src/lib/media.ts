import { withBase } from "@/lib/base";

/** Responsive WebP photos generated in /public/media at 640/1080/1536 px (originals are 3:4 portrait). */
export type Photo = { src: string; srcSet: string; width: number; height: number };

export const photo = (name: string): Photo => ({
  src: withBase(`/media/${name}-1080.webp`),
  srcSet: [640, 1080, 1536].map((w) => `${withBase(`/media/${name}-${w}.webp`)} ${w}w`).join(", "),
  width: 1536,
  height: 2048,
});

/** Short clips (portrait 9:16) with a first-frame poster and a mid-clip still. */
export const clip = (name: string) => ({
  src: withBase(`/video/${name}.mp4`),
  poster: withBase(`/media/poster-${name}.webp`),
  still: withBase(`/media/still-${name}.webp`),
});
