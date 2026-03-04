import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://fynd.ai"),
  title: "Fynd - Discover Your Next Trip in 2 Minutes",
  description:
    "AI-powered travel discovery. Personalized suggestions. No login. 100% free. Find your perfect getaway instantly.",
  applicationName: "Fynd Travel Discovery",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fynd.ai",
    siteName: "Fynd",
    title: "Fynd - Discover Your Next Trip in 2 Minutes",
    description:
      "AI-powered travel discovery. Personalized suggestions. No login. 100% free.",
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
        {children}
      </body>
    </html>
  );
}
