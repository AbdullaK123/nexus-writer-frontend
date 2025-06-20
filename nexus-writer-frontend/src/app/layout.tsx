import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar/Navbar";
import HolographicBackground from "@/components/ui/Background/HolographicBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus Writer",
  description: "A writing app of the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HolographicBackground/>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
