import Navbar from "@/components/my-components/Navbar";
import Footer from "@/components/my-components/Footer";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";

export const metadata = {
  title: "Notes App",
  description: "Mari buat catatan anda",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <section className="p-4 bg-slate-200 flex-grow">{children}</section>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
