"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import NextTopLoader from "nextjs-toploader";

const disableNavbar = ["/"];
const disableFooter = ["/auth/login", "/auth/daftar"];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className="relative">
        <NextTopLoader color="#00EAFF" />
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            {disableNavbar.includes(pathname) && <Navbar />}
            {children}
            {disableNavbar.includes(pathname) && <Footer />}
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
