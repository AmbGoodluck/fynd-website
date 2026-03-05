import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllArticles } from "@/lib/rss";
import { SpotlightArticle } from "@/components/blog/SpotlightArticle";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { FyndPopup } from "@/components/blog/FyndPopup";

export const metadata: Metadata = {
  title: "Travel Inspiration | Fynd Blog",
  description:
    "Weekly curated travel stories and exploration ideas — handpicked from the world's best travel sources.",
  openGraph: {
    title: "Travel Inspiration | Fynd Blog",
    description:
      "Weekly curated travel stories and exploration ideas — handpicked from the world's best travel sources.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Fynd Travel Blog",
      },
    ],
  },
};

export default async function BlogPage() {
  let articles = await fetchAllArticles();

  // If RSS feeds all failed, show fallback placeholder cards
  if (!articles.length) {
    articles = Array.from({ length: 6 }, (_, i) => ({
      id: `fallback-${i}`,
      title: "Discover Amazing Travel Destinations",
      description:
        "Explore the world's most beautiful destinations with Fynd's AI-powered travel planning.",
      sourceName: "Fynd",
      image: `https://images.unsplash.com/photo-${["1469854523086-cc02fe5d8800", "1507525428034-b723cf961d3e", "1476514525535-07fb3b4ae5f1", "1500835556837-99ac94a94552", "1533105079780-92b9be482077", "1488646953014-85cb44e25828"][i]}?w=800&q=80`,
      publishDate: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      link: "/#hero",
    }));
  }

  const [spotlight, ...rest] = articles;
  const gridArticles = rest.slice(0, 12);
  const sidebarArticles = rest.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fynd discovery popup */}
      <FyndPopup />
      {/* ── Nav bar ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-fynd">
            Fynd
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/#how-it-works" className="hover:text-fynd transition">
              How It Works
            </Link>
            <Link href="/blog" className="text-fynd font-semibold">
              Blog
            </Link>
            <Link href="/privacy" className="hover:text-fynd transition">
              Privacy
            </Link>
            <Link
              href="/#hero"
              className="bg-fynd hover:bg-fynd-dark text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
            >
              Get Started
            </Link>
          </nav>
          {/* Mobile — show just the CTA */}
          <Link
            href="/#hero"
            className="md:hidden bg-fynd hover:bg-fynd-dark text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ── Page header ────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 py-12 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-semibold text-fynd uppercase tracking-widest mb-3">
            Fynd Blog
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Travel Inspiration
          </h1>
          <p className="text-lg text-gray-500 max-w-lg">
            Weekly curated travel stories and exploration ideas from the
            world&apos;s best sources.
          </p>
        </div>
      </div>

      {/* ── Main content ───────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left — main column */}
          <div className="flex-1 min-w-0 space-y-14">

            {/* Section 1 — Weekly Spotlight */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-fynd rounded-full" />
                <h2 className="text-xl font-bold text-gray-900">
                  Weekly Spotlight
                </h2>
              </div>
              <SpotlightArticle article={spotlight} />
            </section>

            {/* Section 2 — Latest Travel Stories */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-fynd rounded-full" />
                <h2 className="text-xl font-bold text-gray-900">
                  Latest Travel Stories
                </h2>
              </div>
              {gridArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {gridArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-lg">No articles available right now.</p>
                  <p className="text-sm mt-2">
                    Check back soon — we update every 12 hours.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right — sidebar */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <BlogSidebar articles={sidebarArticles} />
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="bg-gray-900 text-center py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <p className="text-gray-400 text-sm">
          &copy; 2026 Fynd. All rights reserved. &nbsp;&bull;&nbsp;
          <Link href="/privacy" className="text-fynd hover:underline">
            Privacy Policy
          </Link>
          &nbsp;&bull;&nbsp;
          <Link href="/" className="text-fynd hover:underline">
            Back to Home
          </Link>
        </p>
      </footer>
    </div>
  );
}
