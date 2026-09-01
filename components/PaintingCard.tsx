import Image from "next/image";
import { formatPrice } from "@/lib/paintings";
import { type SitePainting } from "@/lib/get-site-content";

export function PaintingCard({
  index,
  onOpen,
  painting
}: {
  index: number;
  onOpen: (painting: SitePainting) => void;
  painting: SitePainting;
}) {
  return (
    <article className="min-w-0">
      <button
        type="button"
        onClick={() => onOpen(painting)}
        className="group block w-full cursor-pointer text-left transition-opacity duration-200 hover:opacity-95"
        aria-label={`Abrir vista ampliada de ${painting.title}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-white">
          <Image
            src={painting.imageUrl}
            alt={painting.title}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
            className="object-cover transition-transform duration-200 group-hover:scale-[1.015]"
            priority={index < 3}
          />
          {!painting.available ? (
            <span className="absolute right-3 top-3 bg-black/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-white">
              Vendido
            </span>
          ) : null}
        </div>
      </button>
      <div className="pt-4">
        <h2 className="break-words font-display text-2xl leading-tight">
          {painting.title}
        </h2>
        <p className="mt-2 font-sans text-sm font-medium text-accent">
          {formatPrice(painting.price)}
        </p>
      </div>
    </article>
  );
}
