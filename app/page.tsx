import { Gallery } from "@/components/Gallery";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { PurchaseBenefits } from "@/components/PurchaseBenefits";
import { getSiteContent } from "@/lib/get-site-content";
import Image from "next/image";

export const revalidate = 60;

export default async function Home({
  searchParams
}: {
  searchParams: { coleccion?: string };
}) {
  const content = await getSiteContent();
  const editorialImageUrl = content.editorialImageUrl || "/slide/3.jpg";
  const collections = [...new Set(content.artworks.map((artwork) => artwork.collection))];
  const activeCollection = collections.includes(searchParams.coleccion ?? "")
    ? searchParams.coleccion
    : undefined;

  return (
    <main>
      <HeroSlideshow
        heroImageUrl={content.editorialImageUrl || undefined}
        heroPhrase={content.heroPhrase}
      />

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-16 lg:px-12">
        <h1 className="font-display text-5xl leading-none text-text md:text-7xl">
          {activeCollection ?? "Obra"}
        </h1>
      </section>

      <section id="obras" className="scroll-mt-4 border-t border-[rgba(139,133,121,0.2)]">
        <Gallery activeCollection={activeCollection} paintings={content.artworks} />
      </section>

      <PurchaseBenefits />

      <section className="px-5 pb-16 sm:px-8 md:pb-24 lg:px-12">
        <div className="relative mx-auto aspect-[16/7] max-w-[1440px] overflow-hidden bg-white">
          <Image
            src={editorialImageUrl}
            alt="Detalle del proceso pictórico en el estudio"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}
