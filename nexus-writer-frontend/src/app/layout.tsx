import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar/Navbar";
import HolographicBackground from "@/components/ui/Background/HolographicBackground";
import ClientProvider from "@/components/features/QueryClientProvider/QueryClientProvider";
import "./globals.css";
import { ToastProvider } from "./hooks/useToast";

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
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <HolographicBackground/>
        <ClientProvider>
          <ToastProvider>
            <Navbar />
            <main id="main-content">
              {children}
            </main>
          </ToastProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
