"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = ["/slide/1.jpg", "/slide/2.jpg", "/slide/3.jpg"];

export function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[680px] w-full overflow-hidden bg-black md:min-h-[760px]">
      {slides.map((slide, index) => (
        <Image
          key={slide}
          src={slide}
          alt=""
          fill
          sizes="100vw"
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/35" />

      <div className="relative mx-auto flex min-h-[680px] max-w-[1440px] items-end px-5 pb-16 pt-40 sm:px-8 md:min-h-[760px] md:pb-24 lg:px-12">
        <div className="max-w-3xl text-white">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/80">
            Nueva selección
          </p>
          <h1 className="mt-5 font-display text-6xl leading-[0.95] sm:text-7xl md:text-8xl">
            Obra disponible ahora
          </h1>
          <Link
            href="#obras"
            className="mt-9 inline-flex min-h-12 items-center border border-[#d8bd92] bg-[#d8bd92] px-8 py-3 text-sm font-semibold uppercase tracking-[0.05em] text-text transition-colors duration-200 hover:bg-transparent hover:text-white"
          >
            Ver obras
          </Link>
        </div>
      </div>
    </section>
  );
}
