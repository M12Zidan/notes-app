import React from "react";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogEdit } from "./edit-dialog";
import { DialogDelete } from "@/components/my-components/delete-dialog";
import Link from "next/link";

const CardNotes = ({ note, isOwner }) => {
  return (
    <div className="bg-white min-h-[160px] flex flex-col gap-4 justify-between rounded-lg shadow-md p-4 max-w-sm w-full">
      <div>
        <h3 className="text-xl font-semibold text-blue-500">{note.title}</h3>
        <p className="text-gray-600 mt-2 line-clamp-3">{note.content}</p>
      </div>

      <div className="text-sm text-gray-400">
        <p>Created at: {new Date(note.created_at).toLocaleString()}</p>
        <p>Updated at: {new Date(note.updated_at).toLocaleString()}</p>
      </div>

      {isOwner && (
        <div className="flex gap-1 self-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {/* <DialogEdit note={note}/> */}
                <Link href={`/notes/${note.id_notes}/edit`}>
                  <Button className="w-[40px] h-[40px] bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center">
                    <SquarePen size={24} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View & Edit Notes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <DialogDelete note={note} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Notes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default CardNotes;
