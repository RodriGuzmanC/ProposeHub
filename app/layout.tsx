import type { Metadata } from "next";
import localFont from "next/font/local";
import "../public/styles/globals.css";
import React from 'react';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos en tu componente principal o en tu archivo de estilos globales

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ProposeHub",
  description: "Generador de propuestas comerciales | Tresmedia EIRL",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
      />
        {children}
      </body>
    </html>
  );
}
