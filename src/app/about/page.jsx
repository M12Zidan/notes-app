import React from "react";
import { GraduationCap, Rocket, Users } from "lucide-react";
// import BtnNext from "@/components/my-components/next";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#1d2533] text-white font-sans">
      {/* Section Acara Training Next */}
      <section className="py-16 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/images/tr2.jpg"
            alt="Training Next Event"
            className="rounded-lg w-full object-cover shadow-lg"
          />
          <div>
            <div>
              <GraduationCap className="w-28 h-28 text-blue-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase flex items-center gap-2">
                Build Your Web Application With Next.Js
              </h2>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-3">
              Acara "Training Next" adalah pelatihan intensif pengembangan web
              menggunakan framework modern seperti
              <strong> Next.js</strong>. Pelatihan ini di selenggarakan oleh
              anggota HIMATIFTA (himpunan mahasiswa teknik Informatika) difisi
              ukm website
            </p>
            <p className="text-gray-400 text-sm">
              Materi mencakup routing dinamis, server-side rendering (SSR), API
              integration, hingga deployment ke platform Vercel. Dilengkapi
              studi kasus berupa notes-app, peserta akan membangun proyek nyata
              dalam waktu singkat.
            </p>
          </div>
        </div>
      </section>

      {/* Section Training Next (Program) */}
      <section className="py-16 px-6 md:px-20 bg-[#7e9181] text-white">
        <div className="text-center mb-12 flex items-center justify-center gap-2">
          <Rocket className="w-16 h-16 text-purple-700" />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase flex justify-center items-center gap-2">
            Training Next
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-lg mb-4">
              <strong>Training Next</strong> adalah program pelatihan lanjutan
              di bidang IT seperti Full-Stack Development, Data Science, dan
              Machine Learning. Pelatihan ini dirancang agar peserta siap
              menghadapi tantangan industri.
            </p>
            <p className="text-sm text-gray-200">
              Dilengkapi dengan mentor profesional dan juga lulusan Bangkit
              Academy 2024, Training Next terbuka untuk mahasiswa, alumni, dan
              umum yang ingin meningkatkan skill digital mereka.
            </p>
          </div>
          <img
            src="/images/tr3.jpg"
            alt="Training Next"
            className="rounded-lg w-full object-cover shadow-lg"
          />
        </div>
      </section>

      {/* Section HIMA TIFTA */}
      <section className="py-16 px-6 md:px-20 bg-[#f1f5f9] text-[#1d2533]">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/images/tr4.jpg"
            alt="HIMA TIFTA"
            className="rounded-lg w-full object-cover shadow-lg"
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase flex items-center gap-2">
              <Users className="w-8 h-8 text-green-600" />
              HIMATIFTA
            </h2>
            <p className="text-gray-800 text-lg leading-relaxed mb-3">
              Event Next.js ini di lakukan dalam 8x pertemuan dengan banyak
              materi tentang pengembangan web berbasis next.js
            </p>
            <p className="text-gray-700 text-sm">
              Melalui kegiatan seperti ini di harapkan peserta dapat membuat
              website dengan mudah menggunakan framework next.js
            </p>
          </div>
        </div>
      </section>
      {/* <div className="fixed bottom-6 right-6 z-50">
        <BtnNext title={"kehalaman selanjutnya"} route={"/list-project"} />
      </div> */}
    </div>
  );
};

export default AboutPage;
