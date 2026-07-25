const benefits = [
  {
    title: "Envíos",
    text: "Envíos a toda la República — contáctanos para cotización según destino.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7zM7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </svg>
    )
  },
  {
    title: "Autenticidad",
    text: "Cada obra incluye certificado de autenticidad firmado.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="9" r="6" />
        <path d="m8.5 14-1 7 4.5-2 4.5 2-1-7M9.5 9l1.6 1.6L15 7" />
      </svg>
    )
  },
  {
    title: "Encargos",
    text: "¿Buscas una pieza a la medida? Contáctanos para hablar de un encargo personalizado.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 20h16M6 16 16.5 5.5a2.1 2.1 0 0 1 3 3L9 19H6v-3Z" />
      </svg>
    )
  }
];

export function PurchaseBenefits() {
  return (
    <section className="border-t border-[rgba(139,133,121,0.2)]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-3 md:gap-8 md:py-24 lg:px-12">
        {benefits.map((benefit) => (
          <article key={benefit.title} className="border-t border-accent pt-6">
            <div className="text-accent">{benefit.icon}</div>
            <h2 className="mt-6 font-display text-3xl">{benefit.title}</h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-secondary">{benefit.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
