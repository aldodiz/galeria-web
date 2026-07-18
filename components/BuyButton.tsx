"use client";

import { useState } from "react";

export function BuyButton({ disabled, slug }: { disabled: boolean; slug: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    if (disabled) {
      return;
    }

    setIsLoading(true);
    setError("");

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ slug })
    });

    const data = (await response.json()) as { url?: string; error?: string };

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    setError(data.error ?? "No se pudo iniciar la compra.");
    setIsLoading(false);
  }

  return (
    <div>
      <button
        type="button"
        disabled={disabled || isLoading}
        onClick={handleCheckout}
        className="min-h-12 w-full cursor-pointer border border-accent bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.05em] text-text transition-colors duration-200 hover:bg-transparent disabled:cursor-not-allowed disabled:border-[rgba(139,133,121,0.2)] disabled:bg-transparent disabled:text-secondary sm:w-auto"
      >
        {isLoading ? "Abriendo checkout" : "Comprar"}
      </button>
      {error ? <p className="mt-4 text-sm text-text">{error}</p> : null}
    </div>
  );
}
