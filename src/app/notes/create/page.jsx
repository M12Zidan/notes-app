"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import jwt from "jsonwebtoken";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      router.push("/");
    } else {
      try {
        const decodedToken = jwt.decode(savedToken);
        setUser(decodedToken.userId);
        setToken(savedToken);
      } catch (error) {
        console.error("Error decoding token", error);
        router.push("/");
      }
    }
  }, [router]);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Judul dan isi tidak boleh kosong.",
      });
      return;
    }

    if (!token || !user) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Token atau data pengguna tidak valid.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          id_user: user,
          title,
          content,
        }),
      });

      if (!res.ok) throw new Error("Gagal menambahkan catatan");

      toast({
        className: cn("bg-green-500", "text-white"),
        title: "Catatan dibuat",
        description: "Catatan berhasil ditambahkan.",
      });

      router.push("/notes");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan saat menambahkan catatan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20">
      <Card className="max-w-xl mx-auto p-6 space-y-4">
        <h1 className="text-3xl text-center font-bold">Buat Catatan Baru</h1>

        <div>
          <Label
            htmlFor="title"
            className="ml-2 block text-lg font-medium mb-1"
          >
            Judul
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="content" className="ml-2 block text-lg font-medium mb-1">
            Isi
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => router.back()}>
            Batal
          </Button>
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
