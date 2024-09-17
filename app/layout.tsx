import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { Alumni_Sans } from "next/font/google";
import Footer from "./components/footer/Footer";

const AlumniSans = Alumni_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IA News",
  description: "A news app created by IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen w-screen overflow-hidden antialiased bg-gray-200 text-black ${AlumniSans.className}`}
      >
        <Navbar />
        <div className="flex flex-1 min-h-full max-w-[1400px] mx-auto ">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
