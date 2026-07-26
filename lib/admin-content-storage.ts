import { get, put } from "@vercel/blob";
import { ADMIN_CONTENT_KEY, type AdminContent } from "@/lib/admin-content";

export const JSON_BLOB_PATH = `${ADMIN_CONTENT_KEY}.json`;

function hasBlobConfig() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export function assertStorageConfigured() {
  if (hasBlobConfig()) {
    return;
  }

  throw new Error(
    "Falta configurar Vercel Blob (BLOB_READ_WRITE_TOKEN o BLOB_STORE_ID)."
  );
}

export async function saveAdminContent(content: AdminContent) {
  assertStorageConfigured();

  await put(JSON_BLOB_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json"
  });

  return JSON_BLOB_PATH;
}

export async function readAdminContent() {
  assertStorageConfigured();

  const result = await get(JSON_BLOB_PATH, {
    access: "public",
    useCache: false
  });

  if (!result || result.statusCode === 304 || !result.stream) {
    return {
      content: null,
      pathname: JSON_BLOB_PATH
    };
  }

  const text = await new Response(result.stream).text();

  return {
    content: JSON.parse(text) as AdminContent,
    pathname: JSON_BLOB_PATH
  };
}

function getExtension(file: File) {
  const nameExtension = file.name.split(".").pop();

  if (nameExtension && nameExtension !== file.name) {
    return nameExtension.toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  const mimeExtension = file.type.split("/").pop();
  return mimeExtension?.replace(/[^a-z0-9]/g, "") || "bin";
}

function safeSegment(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function uploadAdminImage(file: File, label: string) {
  assertStorageConfigured();

  if (!file.size) {
    return "";
  }

  const extension = getExtension(file);
  const filename = `${Date.now()}-${safeSegment(label)}-${safeSegment(file.name) || "imagen"}.${extension}`;
  const blob = await put(`admin/imagenes/${filename}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type || undefined
  });

  return blob.url;
}
