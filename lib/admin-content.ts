export const ADMIN_CONTENT_KEY = "contenido-nestor-lluvias";

export type AdminArtwork = {
  title: string;
  technique: string;
  dimensions: string;
  price: string;
  collection: string;
  available: boolean;
  imageUrl: string;
};

export type AdminContent = {
  biography: string;
  artworks: AdminArtwork[];
  artistPhotoUrl: string;
  editorialImageUrl: string;
  instagramUrl: string;
  policies: {
    shipping: string;
    authenticity: string;
    commissions: string;
  };
  stripeCheckoutName: string;
  heroPhrase: string;
  updatedAt?: string;
};

export const DEFAULT_ARTWORK_COUNT = 12;

export function createEmptyArtwork(): AdminArtwork {
  return {
    title: "",
    technique: "",
    dimensions: "",
    price: "",
    collection: "",
    available: true,
    imageUrl: ""
  };
}

export function createEmptyAdminContent(): AdminContent {
  return {
    biography: "",
    artworks: Array.from({ length: DEFAULT_ARTWORK_COUNT }, createEmptyArtwork),
    artistPhotoUrl: "",
    editorialImageUrl: "",
    instagramUrl: "",
    policies: {
      shipping: "",
      authenticity: "",
      commissions: ""
    },
    stripeCheckoutName: "Néstor Lluvias",
    heroPhrase: ""
  };
}
