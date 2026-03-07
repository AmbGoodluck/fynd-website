"use client";

import Link from "next/link";
import type { Article } from "@/types/blog";

interface Props {
  articles: Article[];
}

export function BlogSidebar({ articles }: Props) {
  return (
    <aside className="space-y-6">
      {/* Header */}
      <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
        <h3 className="text-sm font-bold text-fynd uppercase tracking-widest mb-1">
          Past Spotlights
        </h3>
        <p className="text-xs text-gray-500">
          Previously featured travel stories
        </p>
      </div>

      {/* Article List */}
      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=200&q=80";
                }}
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-1">{article.publishDate}</p>
              <h4 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 group-hover:text-fynd transition-colors">
                {article.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1 truncate">
                {article.sourceName}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Travel tip box */}
      <div className="p-5 bg-gray-900 rounded-2xl text-white">
        <p className="text-xs font-semibold text-fynd uppercase tracking-widest mb-2">
          Fynd Tip
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">
            Use to instantly discover and plan trips to any destination
            featured in these articles.
        </p>
        <Link
          href="/#hero"
          className="inline-block mt-4 text-sm font-semibold text-fynd hover:text-fynd-light transition-colors"
        >
          Plan a Trip Free →
        </Link>
      </div>
    </aside>
  );
}
