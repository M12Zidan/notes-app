"use client";

import React, { useEffect, useState } from "react";
import CardNotes from "@/components/my-components/CardNotes";
import { Loader, FilePlus2 } from "lucide-react";
import jwt from "jsonwebtoken";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
        const data = await response.json();
        if (data.code === 200) {
          setNotes(data.data.notes);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">
        📚 My Notes Collection
      </h1>

      {loading ? (
        <div className="mt-20 flex flex-col justify-center items-center gap-4 text-center text-xl text-primary animate-pulse">
          <Loader size={32} className="animate-spin text-primary" />
          <p>Mengambil catatan...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="mt-24 flex flex-col items-center justify-center text-gray-500">
          <FilePlus2 size={48} className="mb-4 text-blue-400" />
          <p className="text-lg">Belum ada catatan yang dibuat.</p>
          <p className="text-sm mt-2 text-muted-foreground">Klik tombol tambah catatan untuk memulai.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {notes.map((note) => (
              <CardNotes note={note} isOwner={note.id_user === userId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
