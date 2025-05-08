"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <div>
      <nav className="bg-blue-500 p-4 w-full z-50 shadow-md sticky">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">NotesApp</div>
          <div className="flex items-center space-x-4 md:hidden transition-all">
            {isOpen ? (
              <button onClick={toggleSidebar}>
                <X className="text-white" size={24} />
              </button>
            ) : (
              <button onClick={toggleSidebar}>
                <Menu className="text-white" size={24} />
              </button>
            )}
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/notes" className="text-white hover:text-gray-300">
              List Notes
            </Link>
            {isLoggedIn && (
              <Link
                href="/notes/create"
                className="text-white hover:text-gray-300"
              >
                Create Notes
              </Link>
            )}
            {isLoggedIn ? (
              <Button
                size="sm"
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-gray-300">
                  <Button
                    size="sm"
                    type="button"
                    className="text-white hover:text-gray-300 bg-green-500 hover:bg-green-600"
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  href="/register"
                  className="text-white hover:text-gray-300"
                >
                  <Button
                    size="sm"
                    type="button"
                    className="text-black bg-white hover:bg-gray-100"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar Mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div
          className={`w-64 bg-blue-500 p-6 space-y-6 transform transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } duration-500 ease-in-out h-full`}
        >
          <div className="text-white font-bold text-xl">NotesApp</div>
          <div className="space-y-4 mt-6 flex flex-col">
            <Link
              href="/"
              className="text-white text-lg hover:bg-white hover:text-black p-2 rounded-md"
            >
              Home
            </Link>
            <Link
              href="/notes"
              className="text-white text-lg hover:bg-white hover:text-black p-2 rounded-md"
            >
              List Notes
            </Link>
            {isLoggedIn && (
              <Link
                href="/notes/create"
                className="text-white text-lg hover:bg-white hover:text-black p-2 rounded-md"
              >
                Create Notes
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white text-left text-lg hover:bg-white hover:text-black p-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white text-lg hover:bg-white hover:text-black p-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-white text-lg hover:bg-white hover:text-black p-2 rounded-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
