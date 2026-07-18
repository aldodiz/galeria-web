import Image from "next/image";
import { formatPrice, type Painting } from "@/lib/paintings";

const gridRhythm = [
  "md:col-span-7",
  "md:col-span-5 md:mt-20",
  "md:col-span-4",
  "md:col-span-8",
  "md:col-span-6 md:mt-16",
  "md:col-span-6",
  "md:col-span-5",
  "md:col-span-7 md:mt-24",
  "md:col-span-8",
  "md:col-span-4 md:mt-12",
  "md:col-span-6",
  "md:col-span-6 md:mt-20"
];

export function PaintingCard({
  index,
  onOpen,
  painting
}: {
  index: number;
  onOpen: (painting: Painting) => void;
  painting: Painting;
}) {
  return (
    <article className={gridRhythm[index % gridRhythm.length]}>
      <button
        type="button"
        onClick={() => onOpen(painting)}
        className="group block w-full cursor-pointer text-left transition-opacity duration-200 hover:opacity-95"
        aria-label={`Abrir vista ampliada de ${painting.title}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-white md:aspect-[3/2]">
          <Image
            src={`/pinturas/${painting.filename}`}
            alt={painting.title}
            fill
            sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-200 group-hover:scale-[1.015]"
            priority={index < 2}
          />
          <div className="absolute inset-x-0 bottom-0 translate-y-2 border-t border-[rgba(139,133,121,0.2)] bg-white/95 px-4 py-4 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <h2 className="font-display text-xl leading-tight">{painting.title}</h2>
            <p className="mt-2 text-sm font-medium text-accent">{formatPrice(painting.price)}</p>
          </div>
        </div>
      </button>
    </article>
  );
}
