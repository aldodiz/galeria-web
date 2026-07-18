"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { collections } from "@/lib/paintings";

const navItems = [
  { href: "/sobre-el-artista", label: "Sobre el artista" },
  { href: "/contacto", label: "Contacto" }
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 32);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={`z-40 w-full transition-colors duration-500 ${
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0"
      } ${
        isTransparent
          ? "border-b border-white/20 bg-transparent text-white"
          : "border-b border-[rgba(139,133,121,0.2)] bg-bg/95 text-text backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <Link
          href="/"
          className={`cursor-pointer font-display text-2xl leading-none transition-colors duration-200 ${
            isTransparent ? "hover:text-[#ead8b8]" : "hover:text-accent"
          }`}
        >
          Néstor Lluvias
        </Link>
        <nav aria-label="Navegación principal" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            className={`cursor-pointer text-[12px] font-medium uppercase tracking-[0.05em] transition-colors duration-200 ${
              isTransparent ? "text-white/85 hover:text-white" : "text-secondary hover:text-text"
            }`}
            href="/#obras"
          >
            Ver todo
          </Link>
          {collections.map((collection) => (
            <Link
              className={`cursor-pointer text-[12px] font-medium uppercase tracking-[0.05em] transition-colors duration-200 ${
                isTransparent ? "text-white/85 hover:text-white" : "text-secondary hover:text-text"
              }`}
              href={`/?coleccion=${encodeURIComponent(collection)}#obras`}
              key={collection}
            >
              {collection}
            </Link>
          ))}
          {navItems.map((item) => (
            <Link
              className={`cursor-pointer text-[12px] font-medium uppercase tracking-[0.05em] transition-colors duration-200 ${
                isTransparent ? "text-white/85 hover:text-white" : "text-secondary hover:text-text"
              }`}
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
