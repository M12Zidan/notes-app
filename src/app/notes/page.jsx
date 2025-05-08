"use client";
import React, { useEffect, useState } from "react";
import CardNotes from "@/components/my-components/CardNotes";
import { Loader } from "lucide-react";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notes`
        );
        console.log(process.env.API_URL);
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

    fetchNotes();
  }, []);

  return (
    <div className="container max-w-screen-lg mx-auto p-4">
      <h1 className="mt-6 text-4xl font-bold text-center text-blue-500 mb-10">
        All Notes
      </h1>

      {loading ? (
        <div className="mt-20 flex flex-col justify-center items-center gap-4 text-center text-2xl text-gray-500">
          <Loader size={24} className="animate-spin text-blue-700" />
          <p>Mengambil catatan...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="mt-20 text-center text-gray-500 text-xl">
          Belum ada catatan yang tercatat.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {notes.map((note) => (
            <CardNotes key={note.id_notes} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
