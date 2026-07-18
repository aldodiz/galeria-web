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
              Néstor Lluvias comienza su práctica pictórica explorando la tinta y
              el color como una extensión de su rutina física — encuentra en el
              ejercicio diario la misma disciplina y fluidez que busca en cada
              obra. Autodidacta, su trabajo reciente se centra en composiciones
              abstractas donde el movimiento del cuerpo y el movimiento del
              pigmento se piensan como un mismo gesto.
            </p>
            <p>
              Esta galería reúne su primera selección de piezas disponibles para
              colección, marcando el inicio público de su trayectoria como pintor.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
