import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar/Navbar";
import HolographicBackground from "@/components/ui/Background/HolographicBackground";
import ClientProvider from "@/components/features/QueryClientProvider/QueryClientProvider";
import "./globals.css";
import { SocketProvider } from "./hooks/useWebsocket";
import JobStatusWatcher from "@/components/features/JobStatusWatcher/JobStatusWatcher";
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
        <HolographicBackground/>
        <ClientProvider>
          <ToastProvider>
            <JobStatusWatcher />
              <SocketProvider>
                <Navbar />
                {children}
              </SocketProvider>
          </ToastProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
