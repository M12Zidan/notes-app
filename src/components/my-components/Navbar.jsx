'use client'
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Navbar utama */}
      <nav className="bg-blue-500 p-4 w-full z-50 shadow-md sticky">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            NotesApp
          </div>
          <div className="flex items-center space-x-4 md:hidden transition-all">
            {/* Ikon Hamburger untuk mobile */}
            {
              isOpen ? (
                <button onClick={toggleSidebar}>
                  <X className="text-white" size={24} />
                </button>
              ) : (
                <button onClick={toggleSidebar}>
                  <Menu className="text-white" size={24} />
                </button>
              )
            }
          </div>
          <div className="hidden md:flex space-x-4">
            {/* Navigasi Desktop */}
            <Link href="/" className="text-white hover:text-gray-300">Home</Link>
            <Link href="/notes" className="text-white hover:text-gray-300">List Notes</Link>
            <Link href="/create" className="text-white hover:text-gray-300">Create Notes</Link>
          </div>
        </div>
      </nav>

      {/* Sidebar (untuk mobile) */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className={`w-64 bg-blue-500 p-6 space-y-6 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} duration-500 ease-in-out h-full`}>
          <div className="flex justify-between items-center">
            <div className="text-white font-bold text-xl">NotesApp</div>
          </div>
          <div className="space-y-4 mt-6 flex flex-col">
            <Link href="/" className="text-white text-lg hover:bg-white hover:text-black rounded-md p-2 transition-all">Home</Link>
            <Link href="/notes" className="text-white text-lg hover:bg-white hover:text-black rounded-md p-2 transition-all">List Notes</Link>
            <Link href="/create" className="text-white text-lg hover:bg-white hover:text-black rounded-md p-2 transition-all">Create Notes</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
