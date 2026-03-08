import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { GlobalFloatingIcons } from "@/components/GlobalFloatingIcons";
import { Navigation } from "@/components/sections/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fyndplaces.com"),
  title: "Fynd — Discover places you'll actually love",
  description:
    "Fynd learns your interests, preferences, and location to uncover experiences, neighborhoods, and hidden gems tailored to you in seconds. Free on web and mobile.",
  applicationName: "Fynd",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.fyndplaces.com",
    siteName: "Fynd",
    title: "Fynd — Discover places you'll actually love",
    description:
      "Personalized place discovery for locals and travelers. Find hidden gems near you in seconds.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fynd Travel Discovery",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Fynd",
              description:
                "AI-powered travel discovery platform for personalized trip suggestions",
              url: "https://fynd.ai",
              applicationCategory: "TravelApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
        {/* Calm ambient travel icons float across every page */}
        <GlobalFloatingIcons />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
