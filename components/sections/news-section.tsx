"use client"

import { motion } from "framer-motion"
import { Newspaper } from "lucide-react"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import { newsArticles } from "@/data/news"

const categoryColors: Record<string, string> = {
  Padi: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Cuaca: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  Teknologi: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "AI Pertanian": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Komoditas: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
}

export default function NewsSection() {
  const latestNews = newsArticles.slice(0, 3)

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
          Berita Pertanian Terbaru
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                {/* Thumbnail placeholder */}
                <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4 flex items-center justify-center -mt-1">
                  <Newspaper className="h-8 w-8 text-gray-400 dark:text-gray-600" />
                </div>

                {/* Category and date */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      categoryColors[article.category] ||
                      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {article.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-auto">
                  {article.excerpt}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button href="/news" variant="secondary">
            Lihat Semua Berita
          </Button>
        </div>
      </div>
    </section>
  )
}
