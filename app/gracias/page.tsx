import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Gracias por tu compra — Costera",
  description: "Tu compra en Costera se completó correctamente."
};

export default function ThankYouPage() {
  return (
    <main className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-12 md:items-center md:gap-12 md:py-20 lg:px-12">
      <section className="min-w-0 md:col-span-7 lg:col-span-8">
        <div className="relative aspect-[3/2] overflow-hidden bg-white">
          <Image
            src="/pinturas/Compra.jpg"
            alt="Obra de Néstor Lluvias preparada para su entrega"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="min-w-0 md:col-span-5 lg:col-span-4">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.05em] text-secondary">
            Compra confirmada
          </p>
          <h1 className="mt-5 break-words font-display text-5xl leading-none md:text-6xl">
            Gracias por tu compra
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Tu pago se completó correctamente. Néstor Lluvias ha sido
            notificado y se pondrá en contacto contigo para coordinar la entrega
            o el envío de tu obra.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex min-h-12 cursor-pointer items-center border border-accent bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.05em] text-text transition-colors duration-200 hover:bg-transparent"
          >
            Ver más obras
          </Link>
        </div>
      </section>
    </main>
  );
}
