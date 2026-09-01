import Image from "next/image";
import { getSiteContent } from "@/lib/get-site-content";

export const revalidate = 60;

export const metadata = {
  title: "Sobre el artista — Néstor Lluvias",
  description:
    "Biografía de Néstor Lluvias, pintor autodidacta y artista contemporáneo."
};

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <main className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 md:py-24 lg:px-12">
      <section className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-[12px] font-medium uppercase tracking-[0.05em] text-secondary">
            Sobre el artista
          </p>
          <div className="relative mt-8 aspect-square overflow-hidden bg-white">
            <Image
              src={content.artistPhotoUrl}
              alt="Néstor Lluvias, artista"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="md:col-span-7 md:pt-10">
          <h1 className="font-display text-5xl leading-none md:text-7xl">Néstor Lluvias</h1>
          <div className="mt-10 max-w-3xl space-y-6 text-lg leading-8">
            {content.biography.split(/\n{2,}/).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
