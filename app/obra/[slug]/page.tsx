import Image from "next/image";
import { notFound } from "next/navigation";
import { BuyButton } from "@/components/BuyButton";
import { getSiteContent } from "@/lib/get-site-content";
import { formatPrice } from "@/lib/paintings";

export const revalidate = 60;

export async function generateStaticParams() {
  const content = await getSiteContent();

  return content.artworks.map((painting) => ({
    slug: painting.slug
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const content = await getSiteContent();
  const painting = content.artworks.find((artwork) => artwork.slug === params.slug);

  if (!painting) {
    return {};
  }

  return {
    title: `${painting.title} — Néstor Lluvias`,
    description: `${painting.technique}, ${painting.dimensions}`
  };
}

export default async function PaintingPage({ params }: { params: { slug: string } }) {
  const content = await getSiteContent();
  const painting = content.artworks.find((artwork) => artwork.slug === params.slug);

  if (!painting) {
    notFound();
  }

  const isUnavailable = !painting.available || painting.price <= 0;

  return (
    <main className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-12 md:gap-12 md:py-20 lg:px-12">
      <section className="min-w-0 md:col-span-7 lg:col-span-8">
        <div className="relative aspect-[3/2] bg-white">
          <Image
            src={painting.imageUrl}
            alt={painting.title}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-contain"
            priority
          />
        </div>
      </section>

      <aside className="min-w-0 md:col-span-5 lg:col-span-4">
        <div className="md:sticky md:top-8">
          <p className="text-[12px] font-medium uppercase tracking-[0.05em] text-secondary">
            Obra original
          </p>
          <h1 className="mt-5 break-words font-display text-5xl leading-none md:text-6xl">
            {painting.title}
          </h1>

          <dl className="mt-10 space-y-5 border-y border-[rgba(139,133,121,0.2)] py-7">
            <div>
              <dt className="text-[12px] font-medium uppercase tracking-[0.05em] text-secondary">
                Técnica
              </dt>
              <dd className="mt-2 break-words text-base">{painting.technique}</dd>
            </div>
            <div>
              <dt className="text-[12px] font-medium uppercase tracking-[0.05em] text-secondary">
                Medidas
              </dt>
              <dd className="mt-2 break-words text-base">{painting.dimensions}</dd>
            </div>
          </dl>

          <p className="mt-8 text-2xl font-semibold text-accent">{formatPrice(painting.price)}</p>

          <div className="mt-8">
            {painting.available ? (
              <BuyButton slug={painting.slug} disabled={isUnavailable} />
            ) : (
              <p className="mt-4 max-w-sm text-sm leading-6 text-secondary">
                Esta obra ha sido vendida.
              </p>
            )}
          </div>
        </div>
      </aside>
    </main>
  );
}
