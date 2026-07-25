export type Painting = {
  slug: string;
  filename: string;
  title: string;
  technique: string;
  dimensions: string;
  price: number;
  available: boolean;
  collection: string;
};

export const collections = ["Paisajes", "Abstractos"] as const;

export const paintings: Painting[] = [
  {
    slug: "marea-azul",
    filename: "1.jpg",
    title: "Marea Azul",
    technique: "Óleo sobre lienzo",
    dimensions: "80 × 100 cm",
    price: 45000,
    available: true,
    collection: "Paisajes"
  },
  {
    slug: "horizonte-roto",
    filename: "2.jpg",
    title: "Horizonte Roto",
    technique: "Acrílico sobre lienzo",
    dimensions: "60 × 80 cm",
    price: 28000,
    available: true,
    collection: "Paisajes"
  },
  {
    slug: "silencio-de-sal",
    filename: "3.jpg",
    title: "Silencio de Sal",
    technique: "Óleo sobre tabla",
    dimensions: "40 × 50 cm",
    price: 15000,
    available: false,
    collection: "Abstractos"
  },
  {
    slug: "vestigio",
    filename: "4.jpg",
    title: "Vestigio",
    technique: "Técnica mixta sobre lienzo",
    dimensions: "100 × 120 cm",
    price: 68000,
    available: true,
    collection: "Abstractos"
  },
  {
    slug: "cielo-bajo",
    filename: "5.jpg",
    title: "Cielo Bajo",
    technique: "Acrílico sobre papel",
    dimensions: "30 × 40 cm",
    price: 8500,
    available: true,
    collection: "Paisajes"
  },
  {
    slug: "la-espera",
    filename: "6.jpg",
    title: "La Espera",
    technique: "Óleo sobre lienzo",
    dimensions: "90 × 90 cm",
    price: 52000,
    available: true,
    collection: "Abstractos"
  },
  {
    slug: "corriente",
    filename: "7.jpg",
    title: "Corriente",
    technique: "Técnica mixta sobre tabla",
    dimensions: "50 × 60 cm",
    price: 22000,
    available: true,
    collection: "Abstractos"
  },
  {
    slug: "nocturno-no-3",
    filename: "8.jpg",
    title: "Nocturno No. 3",
    technique: "Óleo sobre lienzo",
    dimensions: "120 × 150 cm",
    price: 95000,
    available: false,
    collection: "Paisajes"
  },
  {
    slug: "reflejo-ausente",
    filename: "9.jpg",
    title: "Reflejo Ausente",
    technique: "Acrílico sobre lienzo",
    dimensions: "70 × 70 cm",
    price: 34000,
    available: true,
    collection: "Paisajes"
  },
  {
    slug: "tierra-firme",
    filename: "10.jpg",
    title: "Tierra Firme",
    technique: "Óleo sobre tabla",
    dimensions: "45 × 60 cm",
    price: 18000,
    available: true,
    collection: "Paisajes"
  },
  {
    slug: "ultima-luz",
    filename: "11.jpg",
    title: "Última Luz",
    technique: "Técnica mixta sobre lienzo",
    dimensions: "100 × 100 cm",
    price: 58000,
    available: false,
    collection: "Abstractos"
  },
  {
    slug: "obra-mayor",
    filename: "12.jpg",
    title: "Obra Mayor",
    technique: "Óleo sobre lienzo",
    dimensions: "150 × 180 cm",
    price: 200000,
    available: true,
    collection: "Abstractos"
  }
];

export function getPaintingBySlug(slug: string) {
  return paintings.find((painting) => painting.slug === slug);
}

export function formatPrice(price: number) {
  if (price <= 0) {
    return "Precio pendiente";
  }

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(price);
}
