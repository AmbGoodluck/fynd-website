"use client";

import Link from "next/link";
import type { Article } from "@/types/blog";

interface Props {
  article: Article;
}

export function SpotlightArticle({ article }: Props) {
  return (
    <div className="relative rounded-3xl overflow-hidden group shadow-xl min-h-[480px] flex items-end">
      {/* Background Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={article.image}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80";
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 w-full">
        {/* Label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-fynd text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Weekly Spotlight
          </span>
          <span className="text-white/70 text-sm">{article.sourceName}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight max-w-2xl">
          {article.title}
        </h2>

        {/* Description */}
        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl mb-6 line-clamp-3">
          {article.description}
        </p>

        {/* Meta + CTA */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-white/50 text-sm">{article.publishDate}</span>
          <Link
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-fynd hover:bg-fynd-dark text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
          >
            Read Full Article
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
