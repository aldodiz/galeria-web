import { type AdminArtwork, type AdminContent } from "@/lib/admin-content";
import { readAdminContent } from "@/lib/admin-content-storage";
import { paintings as fallbackPaintings } from "@/lib/paintings";

export type SitePainting = {
  slug: string;
  title: string;
  technique: string;
  dimensions: string;
  price: number;
  available: boolean;
  collection: string;
  imageUrl: string;
};

export type SiteContent = {
  biography: string;
  artworks: SitePainting[];
  artistPhotoUrl: string;
  editorialImageUrl: string;
  heroPhrase: string;
};

const fallbackBiography =
  "Néstor Lluvias es un pintor mexicano cuya obra explora la tensión entre el paisaje y la memoria. Formado de manera autodidacta, su trabajo combina capas de color terroso con gestos espontáneos que remiten tanto a la costa como al recuerdo de un lugar. Cada pieza parte de una observación simple —una luz, una textura, un momento— que se transforma en composición a través de un proceso lento de superposición y raspado.";

function slugify(value: string, index: number) {
  const slug = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `obra-${index + 1}`;
}

function parsePrice(value: string) {
  const amount = Number(value.replace(/[^0-9]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

function getFallbackPainting(index: number) {
  return fallbackPaintings[index % fallbackPaintings.length];
}

function normalizeArtworks(artworks: AdminArtwork[]) {
  const populatedArtworks = artworks.filter(
    (artwork) => artwork.title.trim() || artwork.imageUrl.trim()
  );

  if (populatedArtworks.length === 0) {
    return fallbackPaintings.map((painting) => ({
      ...painting,
      imageUrl: `/pinturas/${painting.filename}`
    }));
  }

  const usedSlugs = new Map<string, number>();

  return populatedArtworks.map((artwork, index) => {
    const fallback = getFallbackPainting(index);
    const baseSlug = slugify(artwork.title || fallback.title, index);
    const occurrence = usedSlugs.get(baseSlug) ?? 0;
    usedSlugs.set(baseSlug, occurrence + 1);

    return {
      slug: occurrence ? `${baseSlug}-${occurrence + 1}` : baseSlug,
      title: artwork.title.trim() || fallback.title,
      technique: artwork.technique.trim() || fallback.technique,
      dimensions: artwork.dimensions.trim() || fallback.dimensions,
      price: artwork.price.trim() ? parsePrice(artwork.price) : fallback.price,
      available: artwork.available,
      collection: artwork.collection.trim() || fallback.collection,
      imageUrl: artwork.imageUrl.trim() || `/pinturas/${fallback.filename}`
    };
  });
}

function toSiteContent(content: AdminContent | null): SiteContent {
  if (!content) {
    return {
      biography: fallbackBiography,
      artworks: normalizeArtworks([]),
      artistPhotoUrl: "/nestor-lluvias.jpg",
      editorialImageUrl: "",
      heroPhrase: ""
    };
  }

  return {
    biography: content.biography.trim() || fallbackBiography,
    artworks: normalizeArtworks(content.artworks ?? []),
    artistPhotoUrl: content.artistPhotoUrl.trim() || "/nestor-lluvias.jpg",
    editorialImageUrl: content.editorialImageUrl.trim(),
    heroPhrase: content.heroPhrase.trim()
  };
}

/**
 * Reads the public content directly from Vercel Blob. The storage helper uses
 * `useCache: false`; route-level ISR is configured by each public page.
 */
export async function getSiteContent(): Promise<SiteContent> {
  try {
    const { content } = await readAdminContent();
    return toSiteContent(content);
  } catch {
    return toSiteContent(null);
  }
}
