import { NextResponse } from "next/server";
import { type AdminContent, createEmptyArtwork } from "@/lib/admin-content";
import {
  saveAdminContent,
  uploadAdminImage
} from "@/lib/admin-content-storage";

export const dynamic = "force-dynamic";

function isAuthorized(password: FormDataEntryValue | null) {
  return Boolean(
    process.env.ADMIN_PASSWORD &&
      typeof password === "string" &&
      password === process.env.ADMIN_PASSWORD
  );
}

function parseContent(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    throw new Error("Falta el contenido del formulario.");
  }

  return JSON.parse(value) as AdminContent;
}

function getOptionalFile(formData: FormData, key: string) {
  const value = formData.get(key);

  if (value instanceof File && value.size > 0) {
    return value;
  }

  return null;
}

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Falta configurar ADMIN_PASSWORD." },
      { status: 500 }
    );
  }

  const formData = await request.formData();

  if (!isAuthorized(formData.get("password"))) {
    return NextResponse.json({ error: "Contraseña inválida." }, { status: 401 });
  }

  try {
    const content = parseContent(formData.get("content"));

    const artistPhoto = getOptionalFile(formData, "artistPhoto");
    const editorialImage = getOptionalFile(formData, "editorialImage");

    const artistPhotoUrl = artistPhoto
      ? await uploadAdminImage(artistPhoto, "foto-artista")
      : content.artistPhotoUrl;
    const editorialImageUrl = editorialImage
      ? await uploadAdminImage(editorialImage, "imagen-editorial")
      : content.editorialImageUrl;

    const artworks = await Promise.all(
      content.artworks.map(async (artwork, index) => {
        const image = getOptionalFile(formData, `artworkImage-${index}`);
        const imageUrl = image
          ? await uploadAdminImage(image, `obra-${index + 1}-${artwork.title}`)
          : artwork.imageUrl;

        return {
          ...createEmptyArtwork(),
          ...artwork,
          available: Boolean(artwork.available),
          imageUrl
        };
      })
    );

    const savedContent: AdminContent = {
      biography: content.biography || "",
      artworks,
      artistPhotoUrl,
      editorialImageUrl,
      instagramUrl: content.instagramUrl || "",
      policies: {
        shipping: content.policies?.shipping || "",
        authenticity: content.policies?.authenticity || "",
        commissions: content.policies?.commissions || ""
      },
      stripeCheckoutName: content.stripeCheckoutName || "Néstor Lluvias",
      heroPhrase: content.heroPhrase || "",
      updatedAt: new Date().toISOString()
    };

    const pathname = await saveAdminContent(savedContent);

    return NextResponse.json({
      ok: true,
      message: "Guardado correctamente.",
      content: savedContent,
      pathname
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo guardar el contenido.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
