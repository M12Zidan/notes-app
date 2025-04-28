'use client'
import React, { useEffect, useState } from "react";
import CardNotes from "@/components/my-components/CardNotes";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
        console.log(process.env.API_URL)
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
      <h1 className="text-3xl font-semibold text-center text-blue-500 mb-6">All Notes</h1>
      
      {loading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <CardNotes key={note.id_notes} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
