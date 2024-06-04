import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
} from '@clerk/nextjs'

import "../globals.css";
import LeftSideBar from "@/components/layouts/LeftSideBar";
import Topbar from "@/components/layouts/Topbar";
import ToasterProvider from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecom_Admin",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider/>
        <div className="flex max-lg:flex-col text-gray-500">
        <LeftSideBar/>
        <Topbar/>
        <div className="flex-1">
        {children}
        </div>
        </div>
        </body>
    </html>
    </ClerkProvider>
  );
}
