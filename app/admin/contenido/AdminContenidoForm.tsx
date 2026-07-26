"use client";

import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import {
  type AdminArtwork,
  type AdminContent,
  createEmptyAdminContent,
  createEmptyArtwork
} from "@/lib/admin-content";

type SaveState = "idle" | "loading" | "success" | "error";

const BIOGRAPHY_MIN_LENGTH = 400;
const INSTAGRAM_EXAMPLE = "https://www.instagram.com/tu_usuario";

function formatPrice(value: string) {
  const cleanValue = value.replace(/\D/g, "");

  if (!cleanValue) {
    return "";
  }

  return new Intl.NumberFormat("en-US").format(Number(cleanValue));
}

function normalizeInstagramUrl(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  if (/^https:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  if (/^http:\/\//i.test(trimmedValue)) {
    return trimmedValue.replace(/^http:\/\//i, "https://");
  }

  return `https://${trimmedValue}`;
}

function getInstagramError(value: string) {
  if (!value) {
    return "Agrega el link de Instagram.";
  }

  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, "");

    if (url.protocol !== "https:" || hostname !== "instagram.com") {
      return `Revisa el link, debe verse como ${INSTAGRAM_EXAMPLE}`;
    }

    if (!url.pathname || url.pathname === "/") {
      return `Revisa el link, debe verse como ${INSTAGRAM_EXAMPLE}`;
    }

    return "";
  } catch {
    return `Revisa el link, debe verse como ${INSTAGRAM_EXAMPLE}`;
  }
}

function FieldLabel({
  children,
  htmlFor
}: {
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-[0.05em] text-secondary">
      {children}
    </label>
  );
}

function TextInput({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  inputMode,
  error
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "decimal" | "email" | "tel" | "url" | "search";
  error?: string;
}) {
  const id = useMemo(() => label.toLowerCase().replace(/\s+/g, "-"), [label]);

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        className="min-h-11 w-full border border-[rgba(139,133,121,0.35)] bg-white px-3 text-sm outline-none transition focus:border-accent"
      />
      {error ? <p className="text-sm leading-5 text-red-700">{error}</p> : null}
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 4
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  const id = useMemo(() => label.toLowerCase().replace(/\s+/g, "-"), [label]);

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-y border border-[rgba(139,133,121,0.35)] bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-accent"
      />
    </div>
  );
}

export default function AdminContenidoForm() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [content, setContent] = useState<AdminContent>(createEmptyAdminContent);
  const [status, setStatus] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");
  const [pathname, setPathname] = useState<string>("");
  const [instagramError, setInstagramError] = useState("");

  const biographyLength = content.biography.trim().length;
  const isBiographyLongEnough = biographyLength >= BIOGRAPHY_MIN_LENGTH;

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/admin/contenido", {
      headers: {
        "x-admin-password": password
      },
      cache: "no-store"
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(data.error || "No se pudo verificar la contraseña.");
      return;
    }

    setContent(data.content ?? createEmptyAdminContent());
    setPathname(data.pathname || "");
    setIsUnlocked(true);
    setStatus("idle");
  }

  function updateContent(next: Partial<AdminContent>) {
    setContent((current) => ({ ...current, ...next }));
  }

  function updatePolicy(key: keyof AdminContent["policies"], value: string) {
    setContent((current) => ({
      ...current,
      policies: {
        ...current.policies,
        [key]: value
      }
    }));
  }

  function updateArtwork(index: number, next: Partial<AdminArtwork>) {
    setContent((current) => ({
      ...current,
      artworks: current.artworks.map((artwork, artworkIndex) =>
        artworkIndex === index ? { ...artwork, ...next } : artwork
      )
    }));
  }

  function updateArtworkPrice(index: number, value: string) {
    updateArtwork(index, { price: value.replace(/\D/g, "") });
  }

  function normalizeAndValidateInstagram() {
    const normalizedUrl = normalizeInstagramUrl(content.instagramUrl);
    const error = getInstagramError(normalizedUrl);

    updateContent({ instagramUrl: normalizedUrl });
    setInstagramError(error);

    return !error;
  }

  function addArtwork() {
    setContent((current) => ({
      ...current,
      artworks: [...current.artworks, createEmptyArtwork()]
    }));
  }

  function removeArtwork(index: number) {
    setContent((current) => ({
      ...current,
      artworks: current.artworks.filter((_, artworkIndex) => artworkIndex !== index)
    }));
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!normalizeAndValidateInstagram()) {
      setStatus("error");
      setMessage("Corrige el link de Instagram antes de guardar.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("password", password);
    const contentToSave = {
      ...content,
      instagramUrl: normalizeInstagramUrl(content.instagramUrl)
    };
    formData.set("content", JSON.stringify(contentToSave));

    const response = await fetch("/api/admin/guardar-contenido", {
      method: "POST",
      body: formData
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(data.error || "No se pudo guardar.");
      return;
    }

    setContent(data.content);
    setPathname(data.pathname || "");
    form.reset();
    setStatus("success");
    setMessage(data.message || "Guardado correctamente.");
  }

  if (!isUnlocked) {
    return (
      <main className="min-h-screen bg-bg px-5 py-16 sm:px-8">
        <section className="mx-auto max-w-md border border-[rgba(139,133,121,0.25)] bg-white p-6">
          <h1 className="font-display text-3xl">Contenido privado</h1>
          <p className="mt-3 text-sm leading-6 text-secondary">
            Ingresa la contraseña de administración para editar el contenido real.
          </p>
          <form onSubmit={unlock} className="mt-8 flex flex-col gap-4">
            <TextInput
              label="Contraseña"
              type="password"
              value={password}
              onChange={setPassword}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="min-h-11 bg-text px-5 text-sm font-semibold text-white transition hover:bg-accent hover:text-text disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Verificando..." : "Entrar"}
            </button>
            {message ? <p className="text-sm text-red-700">{message}</p> : null}
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg px-5 py-10 sm:px-8 lg:px-12">
      <form onSubmit={save} className="mx-auto flex max-w-[1280px] flex-col gap-10">
        <div className="flex flex-col gap-4 border-b border-[rgba(139,133,121,0.25)] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.05em] text-secondary">
              Herramienta interna
            </p>
            <h1 className="mt-2 font-display text-4xl">Contenido de Néstor Lluvias</h1>
            {pathname ? (
              <p className="mt-2 text-sm text-secondary">JSON en Blob: {pathname}</p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="min-h-11 bg-text px-6 text-sm font-semibold text-white transition hover:bg-accent hover:text-text disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Guardando..." : "Guardar"}
          </button>
        </div>

        {message ? (
          <div
            className={`border px-4 py-3 text-sm ${
              status === "success"
                ? "border-green-700 bg-green-50 text-green-800"
                : "border-red-700 bg-red-50 text-red-800"
            }`}
          >
            {message}
          </div>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <TextArea
              label="Biografía"
              rows={10}
              value={content.biography}
              onChange={(biography) => updateContent({ biography })}
            />
            <p
              className={`text-sm ${
                isBiographyLongEnough ? "text-green-800" : "text-amber-700"
              }`}
            >
              {biographyLength} / mínimo {BIOGRAPHY_MIN_LENGTH} caracteres
            </p>
          </div>
          <div className="grid content-start gap-6">
            <TextInput
              label="Instagram URL"
              value={content.instagramUrl}
              onChange={(instagramUrl) => {
                updateContent({ instagramUrl });
                if (instagramError) {
                  setInstagramError("");
                }
              }}
              onBlur={normalizeAndValidateInstagram}
              placeholder={INSTAGRAM_EXAMPLE}
              inputMode="url"
              error={instagramError}
            />
            <TextInput
              label="Nombre para Stripe checkout"
              value={content.stripeCheckoutName}
              onChange={(stripeCheckoutName) => updateContent({ stripeCheckoutName })}
              placeholder="Néstor Lluvias"
            />
            <TextInput
              label="Frase del hero/slideshow"
              value={content.heroPhrase}
              onChange={(heroPhrase) => updateContent({ heroPhrase })}
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="artistPhoto">Foto del artista</FieldLabel>
            <p className="text-sm leading-5 text-secondary">Sube la foto que tengas, nosotros la ajustamos.</p>
            <input id="artistPhoto" name="artistPhoto" type="file" accept="image/*" className="text-sm" />
            {content.artistPhotoUrl ? (
              <a className="text-sm text-secondary underline" href={content.artistPhotoUrl} target="_blank" rel="noreferrer">
                Ver imagen actual
              </a>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="editorialImage">Imagen editorial opcional</FieldLabel>
            <p className="text-sm leading-5 text-secondary">Sube la foto que tengas, nosotros la ajustamos.</p>
            <input id="editorialImage" name="editorialImage" type="file" accept="image/*" className="text-sm" />
            {content.editorialImageUrl ? (
              <a className="text-sm text-secondary underline" href={content.editorialImageUrl} target="_blank" rel="noreferrer">
                Ver imagen actual
              </a>
            ) : null}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <TextArea
            label="Política de envíos"
            value={content.policies.shipping}
            onChange={(value) => updatePolicy("shipping", value)}
          />
          <TextArea
            label="Política de autenticidad"
            value={content.policies.authenticity}
            onChange={(value) => updatePolicy("authenticity", value)}
          />
          <TextArea
            label="Política de encargos"
            value={content.policies.commissions}
            onChange={(value) => updatePolicy("commissions", value)}
          />
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 border-b border-[rgba(139,133,121,0.25)] pb-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-3xl">Obras</h2>
            <button
              type="button"
              onClick={addArtwork}
              className="min-h-10 border border-text px-4 text-sm font-semibold transition hover:border-accent hover:bg-accent"
            >
              Agregar obra
            </button>
          </div>

          <div className="grid gap-4">
            {content.artworks.map((artwork, index) => (
              <div key={index} className="grid gap-4 border border-[rgba(139,133,121,0.25)] bg-white p-4 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <TextInput
                    label={`Título ${index + 1}`}
                    value={artwork.title}
                    onChange={(title) => updateArtwork(index, { title })}
                  />
                </div>
                <div className="lg:col-span-2">
                  <TextInput
                    label="Técnica"
                    value={artwork.technique}
                    onChange={(technique) => updateArtwork(index, { technique })}
                  />
                </div>
                <div className="lg:col-span-2">
                  <TextInput
                    label="Medidas"
                    value={artwork.dimensions}
                    onChange={(dimensions) => updateArtwork(index, { dimensions })}
                    inputMode="decimal"
                  />
                </div>
                <div className="lg:col-span-1">
                  <TextInput
                    label="Precio"
                    value={formatPrice(artwork.price)}
                    onChange={(price) => updateArtworkPrice(index, price)}
                    inputMode="numeric"
                  />
                </div>
                <div className="lg:col-span-2">
                  <TextInput
                    label="Colección"
                    value={artwork.collection}
                    onChange={(collection) => updateArtwork(index, { collection })}
                  />
                </div>
                <div className="flex flex-col gap-2 lg:col-span-2">
                  <FieldLabel>Disponible</FieldLabel>
                  <label className="inline-flex min-h-11 items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={artwork.available}
                      onChange={(event) => updateArtwork(index, { available: event.target.checked })}
                      className="h-5 w-5 accent-[var(--color-accent)]"
                    />
                    {artwork.available ? "Sí" : "No"}
                  </label>
                </div>
                <div className="flex flex-col gap-2 lg:col-span-10">
                  <FieldLabel htmlFor={`artworkImage-${index}`}>Imagen de obra</FieldLabel>
                  <p className="text-sm leading-5 text-secondary">Sube la foto que tengas, nosotros la ajustamos.</p>
                  <input
                    id={`artworkImage-${index}`}
                    name={`artworkImage-${index}`}
                    type="file"
                    accept="image/*"
                    className="text-sm"
                  />
                  {artwork.imageUrl ? (
                    <a className="text-sm text-secondary underline" href={artwork.imageUrl} target="_blank" rel="noreferrer">
                      Ver imagen actual
                    </a>
                  ) : null}
                </div>
                <div className="flex items-end lg:col-span-2">
                  <button
                    type="button"
                    onClick={() => removeArtwork(index)}
                    disabled={content.artworks.length <= 1}
                    className="min-h-10 w-full border border-red-700 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </form>
    </main>
  );
}
