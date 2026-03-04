"use client";

import Link from "next/link";
import type { Article } from "@/types/blog";

interface Props {
  article: Article;
}

export function ArticleCard({ article }: Props) {
  return (
    <Link
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80";
          }}
        />
        {/* Source badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-2 py-1 rounded-full">
          {article.sourceName}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs text-gray-400 mb-2">{article.publishDate}</p>
        <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-fynd transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {article.description}
        </p>
        <span className="mt-4 text-sm font-medium text-fynd group-hover:underline">
          Read Article →
        </span>
      </div>
    </Link>
  );
}
