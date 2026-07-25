import { get, put } from "@vercel/blob";
import { kv } from "@vercel/kv";
import { ADMIN_CONTENT_KEY, type AdminContent } from "@/lib/admin-content";

const JSON_BLOB_PATH = `admin/${ADMIN_CONTENT_KEY}.json`;

type StorageMode = "kv" | "blob";

function hasKvConfig() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function hasBlobConfig() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export function getConfiguredStorageMode(): StorageMode {
  return hasKvConfig() ? "kv" : "blob";
}

export function assertStorageConfigured() {
  if (hasKvConfig() || hasBlobConfig()) {
    return;
  }

  throw new Error(
    "Falta configurar Vercel Blob (BLOB_READ_WRITE_TOKEN o BLOB_STORE_ID) o Vercel KV/Redis (KV_REST_API_URL y KV_REST_API_TOKEN)."
  );
}

export async function saveAdminContent(content: AdminContent) {
  assertStorageConfigured();

  if (hasKvConfig()) {
    await kv.set(ADMIN_CONTENT_KEY, content);
    return "kv" satisfies StorageMode;
  }

  await put(JSON_BLOB_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json"
  });

  return "blob" satisfies StorageMode;
}

export async function readAdminContent() {
  assertStorageConfigured();

  if (hasKvConfig()) {
    return {
      content: await kv.get<AdminContent>(ADMIN_CONTENT_KEY),
      storage: "kv" satisfies StorageMode
    };
  }

  const result = await get(JSON_BLOB_PATH, {
    access: "public",
    useCache: false
  });

  if (!result || result.statusCode === 304 || !result.stream) {
    return {
      content: null,
      storage: "blob" satisfies StorageMode
    };
  }

  const text = await new Response(result.stream).text();

  return {
    content: JSON.parse(text) as AdminContent,
    storage: "blob" satisfies StorageMode
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
