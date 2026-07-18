import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/#obras", label: "Obras" },
  { href: "/sobre-el-artista", label: "Sobre el artista" },
  { href: "/contacto", label: "Contacto" }
];

export function Footer() {
  return (
    <footer className="border-t border-[rgba(139,133,121,0.2)] bg-white">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 sm:px-8 md:grid-cols-12 md:py-20 lg:px-12">
        <div className="md:col-span-4">
          <Link
            href="/"
            aria-label="Néstor Lluvias — Inicio"
            className="inline-flex items-center"
          >
            <Image
              src="/firma_nestor.png"
              alt="Néstor Lluvias"
              width={1408}
              height={707}
              className="h-20 w-auto brightness-0 transition-opacity duration-200 hover:opacity-65 md:h-24"
            />
          </Link>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-secondary">
            Navegación
          </h2>
          <nav className="mt-5 flex flex-col items-start gap-3" aria-label="Navegación del pie">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm transition-colors hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-secondary">
            Social
          </h2>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-3 text-sm transition-colors hover:text-accent"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
            </svg>
            Instagram
          </a>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-secondary">
            Métodos de pago
          </h2>
          <div className="mt-5 flex flex-wrap gap-2" aria-label="Visa, Mastercard y American Express">
            {["VISA", "Mastercard", "AMEX"].map((method) => (
              <span
                key={method}
                className="flex h-9 items-center border border-[rgba(139,133,121,0.3)] px-3 text-[11px] font-semibold tracking-wide text-secondary"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
