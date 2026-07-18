import Link from "next/link";
import { collections } from "@/lib/paintings";

const navItems = [
  { href: "/sobre-el-artista", label: "Sobre el artista" },
  { href: "/contacto", label: "Contacto" }
];

export function Header() {
  return (
    <header className="border-b border-[rgba(139,133,121,0.2)]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <Link
          href="/"
          className="cursor-pointer font-display text-2xl leading-none transition-colors duration-200 hover:text-accent"
        >
          Néstor Lluvias
        </Link>
        <nav aria-label="Navegación principal" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            className="cursor-pointer text-[12px] font-medium uppercase tracking-[0.05em] text-secondary transition-colors duration-200 hover:text-text"
            href="/#obras"
          >
            Ver todo
          </Link>
          {collections.map((collection) => (
            <Link
              className="cursor-pointer text-[12px] font-medium uppercase tracking-[0.05em] text-secondary transition-colors duration-200 hover:text-text"
              href={`/?coleccion=${encodeURIComponent(collection)}#obras`}
              key={collection}
            >
              {collection}
            </Link>
          ))}
          {navItems.map((item) => (
            <Link
              className="cursor-pointer text-[12px] font-medium uppercase tracking-[0.05em] text-secondary transition-colors duration-200 hover:text-text"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
