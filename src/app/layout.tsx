import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/sections/Navigation";
import { SiteWaitlistModal } from "@/components/SiteWaitlistModal";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fyndplaces.com"),
  title: "Fynd - Discover places you'll actually love",
  description:
    "Fynd learns your interests, preferences, and location to uncover experiences, neighborhoods, and hidden gems tailored to you in seconds. Free on web and mobile.",
  applicationName: "Fynd",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Fynd",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.fyndplaces.com",
    siteName: "Fynd",
    title: "Fynd - Discover places you'll actually love",
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
      <body className={`${jakarta.variable} ${fraunces.variable} ${spaceGrotesk.variable} antialiased`}>
        <Navigation />
        {children}
        <SiteWaitlistModal />
      </body>
    </html>
  );
}
