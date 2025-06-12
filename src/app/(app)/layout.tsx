import type { Metadata } from "next";

// import "./globals.css";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "RoastFlex - Anonymous Roasting Platform",
  description:
    "Get roasted anonymously! The ultimate platform for savage feedback and anonymous burns.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
