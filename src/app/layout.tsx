import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { AuthBootstrap } from "@/components/auth/auth-bootstrap";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Obliq - RBAC System",
  description: "An RBAC (Role-Based Access Control) system built with Next.js, NestJS, and PostgreSQL. Manage users, roles, permissions, and access control in a secure and scalable way.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthBootstrap>{children}</AuthBootstrap>
      </body>
    </html>
  );
}
