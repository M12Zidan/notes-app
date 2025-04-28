import React from "react";

const CardNotes = ({ note }) => {
  return (
    <div className="bg-white min-h-[160px] flex flex-col justify-between rounded-lg shadow-md p-4 max-w-sm w-full">
      <div>
        <h3 className="text-xl font-semibold text-blue-500">{note.title}</h3>
        <p className="text-gray-600 mt-2 line-clamp-3">{note.content}</p>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>Created at: {new Date(note.created_at).toLocaleString()}</p>
        <p>Updated at: {new Date(note.updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CardNotes;
