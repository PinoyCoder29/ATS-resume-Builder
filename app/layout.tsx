import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ResumeProvider } from "@/context/ResumeContext";
import BootstrapClient from "@/components/BootstrapClient";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ATS Resume Builder",
  description:
    "Gumawa ng ATS-friendly resume step by step at i-download bilang PDF.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ResumeProvider>{children}</ResumeProvider>
        {/* Loads Bootstrap's JS bundle (for things like dropdowns) on the client only */}
        <BootstrapClient />
      </body>
    </html>
  );
}
