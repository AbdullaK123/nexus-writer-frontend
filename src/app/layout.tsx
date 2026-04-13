import type { Metadata } from "next";
import Navbar from "@/features/layout/Navbar/Navbar";
import CanvasBackground from "@/components/common/Background/CanvasBackground";
import ClientProvider from "@/shared/providers/QueryClientProvider";
import "./globals.css";
import { ToastProvider } from "@/shared/providers/ToastProvider";

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
        <CanvasBackground />
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
