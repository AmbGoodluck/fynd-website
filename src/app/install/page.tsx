import type { Metadata } from "next";
import { InstallClient } from "./InstallClient";

export const metadata: Metadata = {
  title: "Get Fynd | Install",
  description:
    "Install Fynd on your phone. Places worth going near campus, and what other students at your school actually recommend.",
  // A QR-code landing page has no business in search results, and indexing it
  // would pollute campaign numbers with crawler hits.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Get Fynd",
    description:
      "Places worth going near campus, and what other students at your school actually recommend.",
    url: "https://www.fyndplaces.com/install",
  },
};

export default function InstallPage() {
  return <InstallClient />;
}
