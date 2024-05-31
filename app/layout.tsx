"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`inter.className bg-white w-full`}>
        <ThemeProvider>
          <AuthProvider>{children} </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
