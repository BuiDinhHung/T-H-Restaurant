import { withBase } from "@/lib/base";

export type Photo = { src: string; srcSet: string; width: number; height: number };

export const photo = (name: string): Photo => ({
  src: withBase(`/media/${name}-1080.webp`),
  srcSet: [640, 1080, 1536].map((w) => `${withBase(`/media/${name}-${w}.webp`)} ${w}w`).join(", "),
  width: 1536,
  height: 2048,
});

export const clip = (name: string) => ({
  src: withBase(`/video/${name}.mp4`),
  still: withBase(`/media/still-${name}.webp`),
});
