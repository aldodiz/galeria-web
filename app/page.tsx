import { Gallery } from "@/components/Gallery";
import { paintings } from "@/lib/paintings";

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-14 sm:px-8 md:pb-24 md:pt-20 lg:px-12">
        <div className="max-w-5xl">
          <p className="text-[12px] font-medium uppercase tracking-[0.05em] text-secondary">
            Galería online
          </p>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] text-text sm:text-7xl md:text-8xl lg:text-9xl">
            Néstor Lluvias
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-text md:text-xl md:leading-9">
            Costera reúne obra pictórica disponible en una lectura tranquila,
            directa y editorial.
          </p>
        </div>
      </section>

      <section className="border-t border-[rgba(139,133,121,0.2)]">
        <Gallery paintings={paintings} />
      </section>
    </main>
  );
}
