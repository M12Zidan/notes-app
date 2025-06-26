"use client";
import ApiDocCard from "@/components/my-components/ApiDocCard";

export default function DocumentationPage() {
  const mapRequestSchemaToSample = (schema) => {
    return Object.fromEntries(Object.keys(schema).map((key) => [key, ""]));
  };

  const apiEndpoints = [
    {
      title: "Register User",
      method: "POST",
      endpoint: "/api/register",
      description: "Mendaftarkan user baru.",
      request: {
        nm_lengkap: { type: "string", label: "Nama Lengkap" },
        email: { type: "string", label: "Email" },
        username: { type: "string", label: "Username" },
        password: { type: "string", label: "Password" },
      },
      response: {
        message: "User registered successfully",
        user: {
          id: "string",
          email: "string",
          username: "string",
        },
      },
    },
    {
      title: "Login",
      method: "POST",
      endpoint: "/api/login",
      description: "Login dengan username dan password.",
      request: {
        username: { type: "string", label: "Username" },
        password: { type: "string", label: "Password" },
      },
      response: {
        code: 200,
        message: "Login success",
        token: "string",
      },
    },
    {
      title: "Get All Notes",
      method: "GET",
      endpoint: "/api/notes",
      description: "Mengambil semua notes beserta nama lengkap user.",
      request: {},
      response: {
        code: 200,
        message: "Anda Berhasil Mengakses API Notes",
        data: {
          notes: [
            {
              id_notes: "string",
              title: "string",
              content: "string",
              nm_lengkap: "string",
            },
          ],
        },
      },
    },
    {
      title: "Create Note",
      method: "POST",
      endpoint: "/api/notes",
      description: "Membuat note baru (memerlukan token Authorization).",
      request: {
        title: { type: "string", label: "Judul Catatan" },
        content: { type: "string", label: "Isi Catatan" },
      },
      response: {
        code: 200,
        message: "Anda Berhasil Membuat Notes",
        data: {
          id_notes: "string",
          title: "string",
          content: "string",
        },
      },
      requireAuth: true,
    },
    {
      title: "Update Note",
      method: "PUT",
      endpoint: "/api/notes",
      description: "Memperbarui note yang dimiliki user (token required).",
      request: {
        id_notes: { type: "string", label: "ID Note" },
        title: { type: "string", label: "Judul Baru" },
        content: { type: "string", label: "Isi Baru" },
      },
      response: {
        code: 200,
        message: "Berhasil Update Notes",
        data: {
          id_notes: "string",
          title: "string",
          content: "string",
        },
      },
      requireAuth: true,
    },
    {
      title: "Delete Note",
      method: "DELETE",
      endpoint: "/api/notes",
      description: "Menghapus note yang dimiliki user (token required).",
      request: {
        id_notes: { type: "string", label: "ID Note" },
      },
      response: {
        code: 200,
        message: "Berhasil Menghapus Notes",
      },
      requireAuth: true,
    },
  ];

  return (
    <main className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">📘 API Documentation</h1>
      {apiEndpoints.map((api, idx) => (
        <ApiDocCard
          key={idx}
          {...api}
          sample={mapRequestSchemaToSample(api.request)}
        />
      ))}
    </main>
  );
}
