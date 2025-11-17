import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agro App - Modern Landing Page",
  description: "A beautiful landing page built with Next.js, Tailwind CSS, and GSAP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

