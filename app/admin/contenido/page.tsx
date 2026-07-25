import type { Metadata } from "next";
import AdminContenidoForm from "./AdminContenidoForm";

export const metadata: Metadata = {
  title: "Contenido privado — Néstor Lluvias",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminContenidoPage() {
  return <AdminContenidoForm />;
}
