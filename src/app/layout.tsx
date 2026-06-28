import type { Metadata, Viewport } from "next";
import { Inter, Syne, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://skbrno.cz"
  ),
  title: "SK Kadeřnictví | Profesionální kadeřnictví v Brně bez objednání",
  description:
    "SK Kadeřnictví na Novobranské — profesionální střihy, barvení vlasů, Balayage, Ombré a Melír v srdci Brna. Přijďte kdykoliv bez objednání. 4.9 ★ hodnocení na Google.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: [
    "kadeřnictví",
    "Brno",
    "bez objednání",
    "barber",
    "střih",
    "barvení vlasů",
    "Balayage",
    "Ombré",
    "Melír",
    "SK Kadeřnictví",
    "Novobranská",
  ],
  authors: [{ name: "Serhii Kotliar" }],
  openGraph: {
    title: "SK Kadeřnictví | Profesionální kadeřnictví v Brně",
    description:
      "Přijďte kdykoliv bez objednání. Profesionální střihy a barvení v srdci Brna. 4.9 ★ Google hodnocení.",
    url: "https://skbrno.cz",
    siteName: "SK Kadeřnictví",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SK Kadeřnictví na Novobranské Brno",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Kadeřnictví | Profesionální kadeřnictví v Brně",
    description:
      "Přijďte kdykoliv bez objednání. Profesionální střihy a barvení v srdci Brna.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://skbrno.cz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} ${syne.variable} ${playfair.variable}`}>
      <head>
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              name: "SK Kadeřnictví na Novobranské",
              image: "https://skbrno.cz/og-image.jpg",
              url: "https://skbrno.cz",
              telephone: "+420770114540",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Novobranská 16",
                addressLocality: "Brno",
                postalCode: "602 00",
                addressCountry: "CZ",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 49.1938920849784,
                longitude: 16.610855415849414,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "19:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "10:00",
                  closes: "18:00",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "136",
              },
              priceRange: "200-2500 Kč",
              sameAs: [
                "https://www.instagram.com/sk_kadernictvi_brno",
                "https://www.facebook.com/share/1BuRHekTJe/",
              ],
            }),
          }}
        />
      </head>
      <body className="noise-overlay antialiased">
        {children}
      </body>
    </html>
  );
}
