import { photo } from "@/lib/media";

type Props = {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/** Responsive <img> with srcset; lazy by default, eager + high priority for above-the-fold. */
export default function Img({ name, alt, sizes, className, priority }: Props) {
  const p = photo(name);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={p.src}
      srcSet={p.srcSet}
      sizes={sizes}
      width={p.width}
      height={p.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}
