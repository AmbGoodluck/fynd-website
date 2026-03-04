import Parser from "rss-parser";
import type { Article, RSSFeed } from "@/types/blog";

const FEEDS: RSSFeed[] = [
  {
    name: "Google Travel News",
    url: "https://news.google.com/rss/search?q=travel+destination&hl=en-US&gl=US&ceid=US:en",
  },
  {
    name: "NY Times Travel",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml",
  },
  {
    name: "Nomadic Matt",
    url: "https://www.nomadicmatt.com/feed/",
  },
  {
    name: "Lonely Planet",
    url: "https://www.lonelyplanet.com/articles/rss.xml",
  },
];

// Fallback travel images when feed images are missing
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
  "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&q=80",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
  "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80",
  "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80",
];

function getFallbackImage(index: number): string {
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function extractImage(item: Parser.Item & { "media:content"?: { $?: { url?: string } }; enclosure?: { url?: string } }): string | null {
  // Try media:content
  if (item["media:content"]?.["$"]?.url) return item["media:content"]["$"].url;
  // Try enclosure
  if (item.enclosure?.url && item.enclosure.url.match(/\.(jpg|jpeg|png|webp)/i)) {
    return item.enclosure.url;
  }
  // Try to extract first <img> from content:encoded or content
  const html = (item as Record<string, string>)["content:encoded"] ?? item.content ?? "";
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (match?.[1]) return match[1];
  return null;
}

function cleanDescription(raw: string | undefined): string {
  if (!raw) return "";
  // Strip HTML tags
  const stripped = raw.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return stripped.length > 160 ? stripped.slice(0, 157) + "…" : stripped;
}

function slugify(str: string, index: number): string {
  return `${index}-${str.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;
}

async function fetchFeed(feed: RSSFeed): Promise<Article[]> {
  try {
    const parser = new Parser({
      customFields: {
        item: [["media:content", "media:content"], ["enclosure", "enclosure"]],
      },
      timeout: 8000,
    });
    const result = await parser.parseURL(feed.url);
    return result.items.slice(0, 6).map((item, i) => ({
      id: slugify(item.title ?? feed.name, i),
      title: item.title?.replace(/&amp;/g, "&").replace(/&#039;/g, "'") ?? "Travel Article",
      description: cleanDescription(item.contentSnippet ?? item.summary ?? item.content),
      sourceName: feed.name,
      image: extractImage(item) ?? getFallbackImage(i),
      publishDate: item.pubDate ? new Date(item.pubDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "",
      link: item.link ?? "#",
    }));
  } catch {
    return [];
  }
}

export async function fetchAllArticles(): Promise<Article[]> {
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));
  const articles: Article[] = [];
  let fallbackIdx = 0;

  results.forEach((r) => {
    if (r.status === "fulfilled") {
      r.value.forEach((a) => {
        if (!a.image) a.image = getFallbackImage(fallbackIdx++);
        articles.push(a);
      });
    }
  });

  // Shuffle for variety
  for (let i = articles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [articles[i], articles[j]] = [articles[j], articles[i]];
  }

  return articles.slice(0, 15);
}
