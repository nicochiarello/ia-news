import type { Metadata } from "next";
import "./globals.css";

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
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
