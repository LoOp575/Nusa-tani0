"use client"

import { newsArticles } from "@/data/news"

const categoryColors: Record<string, string> = {
  Padi: "text-emerald-400 bg-emerald-400/10",
  Cuaca: "text-sky-400 bg-sky-400/10",
  Teknologi: "text-purple-400 bg-purple-400/10",
  "AI Pertanian": "text-amber-400 bg-amber-400/10",
  Komoditas: "text-rose-400 bg-rose-400/10",
}

export default function NewsSection() {
  const latestNews = newsArticles.slice(0, 2)

  return (
    <section className="py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Berita Terbaru
          </h2>
          <a
            href="/news"
            className="text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Semua berita
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {latestNews.map((article) => (
            <div
              key={article.id}
              className="bg-gray-900/50 border border-gray-800/50 rounded-lg p-3 hover:border-emerald-500/20 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                    categoryColors[article.category] || "text-gray-400 bg-gray-800"
                  }`}
                >
                  {article.category}
                </span>
                <span className="text-[9px] text-gray-600">{article.date}</span>
              </div>
              <h3 className="text-xs font-medium text-white line-clamp-1 mb-1">
                {article.title}
              </h3>
              <p className="text-[11px] text-gray-500 line-clamp-1">
                {article.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
