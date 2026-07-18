export const metadata = {
  title: "Sobre el artista — Néstor Lluvias",
  description:
    "Biografía de Néstor Lluvias, pintor autodidacta y artista contemporáneo."
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 md:py-24 lg:px-12">
      <section className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.05em] text-secondary">
            Sobre el artista
          </p>
        </div>
        <div className="md:col-span-8">
          <h1 className="font-display text-5xl leading-none md:text-7xl">Néstor Lluvias</h1>
          <div className="mt-10 max-w-3xl space-y-6 text-lg leading-8">
            <p>
              Néstor Lluvias es un pintor mexicano cuya obra explora la tensión
              entre el paisaje y la memoria. Formado de manera autodidacta, su
              trabajo combina capas de color terroso con gestos espontáneos que
              remiten tanto a la costa como al recuerdo de un lugar. Cada pieza
              parte de una observación simple —una luz, una textura, un momento—
              que se transforma en composición a través de un proceso lento de
              superposición y raspado.
            </p>
            <p>
              Su obra ha sido descrita como un puente entre el expresionismo
              abstracto y la tradición pictórica mexicana contemporánea.
              Actualmente trabaja desde su estudio, donde desarrolla series que
              dialogan entre sí a lo largo de meses de trabajo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
