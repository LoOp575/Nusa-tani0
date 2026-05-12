"use client"

import { motion } from "framer-motion"
import { Newspaper } from "lucide-react"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import { newsArticles } from "@/data/news"

const categoryColors: Record<string, string> = {
  Padi: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Cuaca: "bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400",
  Teknologi: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  "AI Pertanian": "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Komoditas: "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
}

export default function NewsSection() {
  const latestNews = newsArticles.slice(0, 3)

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Berita Pertanian Terbaru
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {latestNews.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
            >
              <Card className="h-full flex flex-col">
                {/* Thumbnail placeholder */}
                <div className="w-full h-28 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-3 flex items-center justify-center">
                  <Newspaper className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                </div>

                {/* Category and date */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${
                      categoryColors[article.category] ||
                      "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {article.category}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    {article.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1.5 line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-auto leading-relaxed">
                  {article.excerpt}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button href="/news" variant="secondary" size="sm">
            Lihat Semua Berita
          </Button>
        </div>
      </div>
    </section>
  )
}
