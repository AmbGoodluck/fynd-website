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
    "Fynd is a campus discovery and social app for verified students. Find places around your school, share recommendations, post events, and see what your campus is talking about.",
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
      "Campus discovery and social, for verified students. Find places, share recommendations, and see what your campus is talking about.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fynd Campus Discovery",
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
                "Campus discovery and social app for verified students - find places, share recommendations, and see what your campus is talking about",
              url: "https://www.fyndplaces.com",
              applicationCategory: "SocialNetworkingApplication",
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
