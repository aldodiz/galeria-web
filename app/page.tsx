import { Gallery } from "@/components/Gallery";
import { collections, paintings } from "@/lib/paintings";

export default function Home({
  searchParams
}: {
  searchParams: { coleccion?: string };
}) {
  const activeCollection = collections.includes(
    searchParams.coleccion as (typeof collections)[number]
  )
    ? searchParams.coleccion
    : undefined;

  return (
    <main>
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-16 lg:px-12">
        <h1 className="font-display text-5xl leading-none text-text md:text-7xl">
          {activeCollection ?? "Obra"}
        </h1>
      </section>

      <section id="obras" className="scroll-mt-4 border-t border-[rgba(139,133,121,0.2)]">
        <Gallery activeCollection={activeCollection} paintings={paintings} />
      </section>
    </main>
  );
}
