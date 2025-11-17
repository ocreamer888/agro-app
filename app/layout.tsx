import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Agro App - Devolviendo el poder a los agricultores",
  description: "Agronegocios con más oportunidades, más rentabilidad y más impacto. Conecta, transparencia y precios justos para el sector agrícola.",
  keywords: ["agronegocios", "agricultura", "agricultores", "transparencia", "precios justos", "agro app"],
  authors: [{ name: "Agro App" }],
  creator: "Agro App",
  publisher: "Agro App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://agro-app-zeta.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    title: "Agro App - Devolviendo el poder a los agricultores",
    description: "Agronegocios con más oportunidades, más rentabilidad y más impacto. Conecta, transparencia y precios justos para el sector agrícola.",
    siteName: "Agro App",
    images: [
      {
        url: "/agro-app-hero-5.png",
        width: 1200,
        height: 630,
        alt: "Agro App - Devolviendo el poder a los agricultores",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agro App - Devolviendo el poder a los agricultores",
    description: "Agronegocios con más oportunidades, más rentabilidad y más impacto.",
    images: ["/agro-app-hero-5.png"],
    creator: "@agroapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

