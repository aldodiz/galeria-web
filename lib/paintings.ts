export type Painting = {
  slug: string;
  filename: string;
  title: string;
  technique: string;
  dimensions: string;
  price: number;
};

export const paintings: Painting[] = [
  {
    slug: "marea-azul",
    filename: "1.jpg",
    title: "Marea Azul",
    technique: "Tinta sobre papel",
    dimensions: "60 x 80 cm",
    price: 18500
  },
  {
    slug: "amanecer-en-la-costa",
    filename: "2.jpg",
    title: "Amanecer en la Costa",
    technique: "Tinta y acrílico sobre lienzo",
    dimensions: "70 x 90 cm",
    price: 24000
  },
  {
    slug: "corriente-dorada",
    filename: "3.jpg",
    title: "Corriente Dorada",
    technique: "Tinta sobre papel",
    dimensions: "50 x 70 cm",
    price: 15000
  },
  {
    slug: "vientos-del-sur",
    filename: "4.jpg",
    title: "Vientos del Sur",
    technique: "Óleo sobre lienzo",
    dimensions: "80 x 100 cm",
    price: 42000
  },
  {
    slug: "reflejo-nocturno",
    filename: "5.jpg",
    title: "Reflejo Nocturno",
    technique: "Tinta sobre papel",
    dimensions: "45 x 60 cm",
    price: 12000
  },
  {
    slug: "arrecife",
    filename: "6.jpg",
    title: "Arrecife",
    technique: "Acrílico sobre lienzo",
    dimensions: "90 x 120 cm",
    price: 58000
  },
  {
    slug: "sal-y-luz",
    filename: "7.jpg",
    title: "Sal y Luz",
    technique: "Tinta sobre papel",
    dimensions: "60 x 60 cm",
    price: 16500
  },
  {
    slug: "horizonte-partido",
    filename: "8.jpg",
    title: "Horizonte Partido",
    technique: "Óleo sobre lienzo",
    dimensions: "100 x 140 cm",
    price: 95000
  },
  {
    slug: "brisa-tibia",
    filename: "9.jpg",
    title: "Brisa Tibia",
    technique: "Tinta sobre papel",
    dimensions: "50 x 65 cm",
    price: 14000
  },
  {
    slug: "cala-secreta",
    filename: "10.jpg",
    title: "Cala Secreta",
    technique: "Acrílico sobre lienzo",
    dimensions: "75 x 95 cm",
    price: 32000
  },
  {
    slug: "pieza-mayor",
    filename: "11.jpg",
    title: "Territorio Costero",
    technique: "Óleo sobre lienzo",
    dimensions: "120 x 160 cm",
    price: 185000
  },
  {
    slug: "espuma",
    filename: "12.jpg",
    title: "Espuma",
    technique: "Tinta sobre papel",
    dimensions: "40 x 50 cm",
    price: 8500
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
