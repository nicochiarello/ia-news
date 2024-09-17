import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import {Alumni_Sans} from 'next/font/google'

const AlumniSans = Alumni_Sans({ subsets: ['latin'] })

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
      <body className={`antialiased bg-gray-200 text-black ${AlumniSans.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
