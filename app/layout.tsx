import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { Alumni_Sans } from "next/font/google";
import Footer from "./components/footer/Footer";
import NextTopLoader from "nextjs-toploader";

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
        className={`flex flex-col min-h-screen h-fit w-screen overflow-x-hidden antialiased bg-gray-200 text-black ${AlumniSans.className}`}
      >
        <NextTopLoader color="#8D3AE2" />
        <Navbar />
        <div className="flex flex-1 min-h-full w-full max-w-[1050px] mx-auto px-2">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
