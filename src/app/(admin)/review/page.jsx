"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, Star } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AllProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [rating, setRating] = useState(0);
  const [token, setToken] = useState("");

  const router = useRouter();

  // Fetch projects with optional token
  const fetchDataWithToken = async (token) => {
    try {
      const headers = token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {};

      const response = await fetch(
        "https://notes-app-rosy-phi.vercel.app/api/v2/tugas-akhir",
        {
          headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const json = await response.json();
      setProjects(json.data.projects);
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
    }
  };

  // On mount or router change, get token and fetch data
  useEffect(() => {
    const savedToken = localStorage.getItem("token") || "";
    if(!savedToken) router.push("/login");
    setToken(savedToken);
    fetchDataWithToken(savedToken);
  }, [router]);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Silakan pilih rating terlebih dahulu.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_project: selectedProjectId,
          score: rating,
        }),
      });

      if (!res.ok) throw new Error("Gagal mengirim penilaian");
      alert("Terima kasih sudah menilai");
      // Refresh project data after rating
      fetchDataWithToken(token);
      setSelectedProjectId(null);
      setRating(0);
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] py-12 px-6 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center uppercase">
        Semua Proyek Peserta
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition duration-300"
          >
            <div className="overflow-hidden">
              <img
                src={proj.image_project_link}
                alt={`Preview ${proj.name_mhs}`}
                className="h-48 w-full object-cover transform hover:scale-105 transition duration-500"
                
              />
            </div>
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold">{proj.name_mhs}</h2>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      proj.status === "Selesai"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">NIM: {proj.nim_mhs}</p>

                <div className="space-y-1 mb-3">
                  <a
                    href={proj.project_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:underline text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" /> Website
                  </a>
                  <br />
                  <a
                    href={proj.profile_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 hover:underline text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" /> Profile
                  </a>
                </div>
              </div>

              <div className="mt-2 flex items-center text-yellow-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(proj.average_score)
                        ? "fill-yellow-400"
                        : "stroke-yellow-400"
                    }`}
                  />
                ))}
                <span className="text-sm ml-2 text-gray-500">
                  ({proj.average_score})
                </span>

                {token !== "" && proj.userReview?.reviewed ? (
                  <span className="ml-auto text-sm font-semibold text-green-700">
                    Anda telah mereview, score: {proj.userReview.score}
                  </span>
                ) : null}

                {/* Show button if user has token and has not reviewed */}
                {token !== "" && !proj.userReview?.reviewed && (
                  <div className="ml-auto">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="default"
                          className="text-sm px-3 py-1"
                          onClick={() => {
                            setSelectedProjectId(proj.id_project);
                            setRating(0);
                          }}
                        >
                          Bintangi
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Beri Penilaian</AlertDialogTitle>
                          <AlertDialogDescription>
                            Silakan berikan rating untuk proyek ini.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <div className="flex justify-center gap-2 py-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              onClick={() => setRating(i + 1)}
                              className={`w-6 h-6 cursor-pointer transition ${
                                i < rating
                                  ? "fill-yellow-400 stroke-yellow-400"
                                  : "stroke-yellow-400"
                              }`}
                            />
                          ))}
                        </div>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleSubmit()}>
                            Kirim
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjectsPage;
