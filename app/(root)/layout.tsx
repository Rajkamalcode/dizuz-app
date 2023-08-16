import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";


import "../globals.css";
import LeftSidebar from "../../components/shared/LeftSidebar";
import Topbar from "../../components/shared/Topbar";
import Bottombar from "../../components/shared/Bottombar";
import RightSidebar from "../../components/shared/RightSidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dizuz",
  description: "Discuss everything freely",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Topbar />

          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>
            {/* @ts-ignore */}
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}