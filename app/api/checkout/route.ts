import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getPaintingBySlug } from "@/lib/paintings";

export async function POST(request: Request) {
  const { slug } = (await request.json()) as { slug?: string };
  const painting = slug ? getPaintingBySlug(slug) : undefined;

  if (!painting) {
    return NextResponse.json({ error: "Obra no encontrada." }, { status: 404 });
  }

  if (painting.price <= 0) {
    return NextResponse.json({ error: "Precio pendiente." }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Falta configurar STRIPE_SECRET_KEY." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20"
  });
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_creation: "always",
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["MX", "US"]
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "mxn",
          unit_amount: painting.price * 100,
          product_data: {
            name: painting.title,
            description: `${painting.technique} · ${painting.dimensions}`,
            images: [`${origin}/pinturas/${painting.filename}`],
            metadata: {
              slug: painting.slug
            }
          }
        }
      }
    ],
    metadata: {
      paintingSlug: painting.slug,
      paintingFilename: painting.filename
    },
    success_url: `${origin}/gracias?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/obra/${painting.slug}?checkout=cancelled`
  });

  return NextResponse.json({ url: session.url });
}
