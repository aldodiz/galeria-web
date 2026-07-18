import Image from "next/image";

export const metadata = {
  title: "Contacto — Néstor Lluvias"
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 md:py-24 lg:px-12">
      <section className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-[12px] font-medium uppercase tracking-[0.05em] text-secondary">
            Contacto
          </p>
          <h1 className="mt-5 font-display text-5xl leading-none md:text-7xl">
            Consulta una obra
          </h1>
        </div>

        <form className="md:col-span-7" action="#" aria-label="Formulario de contacto">
          <div className="grid gap-6">
            <label className="block">
              <span className="text-[12px] font-medium uppercase tracking-[0.05em] text-secondary">
                Nombre
              </span>
              <input
                className="mt-2 min-h-12 w-full border border-[rgba(139,133,121,0.2)] bg-white px-4 text-base outline-none transition-colors duration-200 focus:border-accent"
                name="name"
                type="text"
                autoComplete="name"
              />
            </label>

            <label className="block">
              <span className="text-[12px] font-medium uppercase tracking-[0.05em] text-secondary">
                Email
              </span>
              <input
                className="mt-2 min-h-12 w-full border border-[rgba(139,133,121,0.2)] bg-white px-4 text-base outline-none transition-colors duration-200 focus:border-accent"
                name="email"
                type="email"
                autoComplete="email"
              />
            </label>

            <label className="block">
              <span className="text-[12px] font-medium uppercase tracking-[0.05em] text-secondary">
                Mensaje
              </span>
              <textarea
                className="mt-2 min-h-44 w-full resize-y border border-[rgba(139,133,121,0.2)] bg-white px-4 py-3 text-base outline-none transition-colors duration-200 focus:border-accent"
                name="message"
              />
            </label>
          </div>

          <button
            type="button"
            className="mt-8 min-h-12 cursor-pointer border border-accent bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.05em] text-text transition-colors duration-200 hover:bg-transparent"
          >
            Enviar
          </button>
        </form>
      </section>

      <section className="pt-16 md:pt-24">
        <div className="relative mx-auto aspect-[3/2] w-full max-w-6xl overflow-hidden bg-white">
          <Image
            src="/contactanos.jpg"
            alt="Contacto — Néstor Lluvias"
            fill
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}
