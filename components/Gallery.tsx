"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PaintingCard } from "@/components/PaintingCard";
import { formatPrice } from "@/lib/paintings";
import { type SitePainting } from "@/lib/get-site-content";

export function Gallery({
  activeCollection,
  paintings
}: {
  activeCollection?: string;
  paintings: SitePainting[];
}) {
  const [activePainting, setActivePainting] = useState<SitePainting | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const detailLinkRef = useRef<HTMLAnchorElement>(null);
  const visiblePaintings = activeCollection
    ? paintings.filter((painting) => painting.collection === activeCollection)
    : paintings;

  function openLightbox(painting: SitePainting) {
    setActivePainting(painting);
    window.setTimeout(() => setIsVisible(true), 10);
  }

  function closeLightbox() {
    setIsVisible(false);
    window.setTimeout(() => setActivePainting(null), 220);
  }

  useEffect(() => {
    if (!activePainting) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = [closeButtonRef.current, detailLinkRef.current].filter(
        Boolean
      ) as HTMLElement[];

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePainting]);

  return (
    <>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-x-7 gap-y-12 px-5 py-12 sm:grid-cols-2 sm:px-8 md:py-16 lg:grid-cols-3 lg:px-12">
        {visiblePaintings.map((painting, index) => (
          <PaintingCard
            painting={painting}
            index={index}
            key={painting.slug}
            onOpen={openLightbox}
          />
        ))}
      </div>

      {activePainting ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className={`fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/75 px-4 py-6 transition-opacity duration-200 md:px-8 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <div
            className={`relative flex max-h-full w-full max-w-6xl cursor-default flex-col transition-transform duration-200 ${
              isVisible ? "scale-100" : "scale-[0.98]"
            }`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Cerrar vista ampliada"
              className="absolute right-0 top-0 z-10 flex h-11 w-11 cursor-pointer items-center justify-center border border-[rgba(255,255,255,0.35)] bg-black/45 text-2xl leading-none text-white transition-colors duration-200 hover:bg-black/70"
            >
              ×
            </button>

            <div className="flex min-h-0 flex-1 items-center justify-center bg-black/20">
              <div className="relative h-[68vh] w-full md:h-[74vh]">
                <Image
                  src={activePainting.imageUrl}
                  alt={activePainting.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="border-t border-[rgba(139,133,121,0.2)] bg-white px-5 py-4 md:flex md:items-center md:justify-between md:gap-6 md:px-6">
              <div>
                <h2 id="lightbox-title" className="break-words font-display text-2xl leading-tight">
                  {activePainting.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-accent">
                  {formatPrice(activePainting.price)}
                </p>
              </div>
              <Link
                ref={detailLinkRef}
                href={`/obra/${activePainting.slug}`}
                className="mt-5 inline-flex min-h-11 cursor-pointer items-center border border-accent px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-text transition-colors duration-200 hover:bg-accent md:mt-0"
              >
                Ver detalle completo
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
