'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Newspaper, ChevronLeft, ChevronRight } from 'lucide-react'
import Card from '@/components/ui/card'
import { newsArticles } from '@/data/news'

const categories = ['Semua', 'Padi', 'Cuaca', 'Teknologi', 'AI Pertanian', 'Komoditas']

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Padi':
      return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
    case 'Cuaca':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
    case 'Teknologi':
      return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
    case 'AI Pertanian':
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
    case 'Komoditas':
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
  }
}

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState('Semua')

  const filteredArticles =
    activeFilter === 'Semua'
      ? newsArticles
      : newsArticles.filter((article) => article.category === activeFilter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Berita Pertanian
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Update terbaru seputar pertanian Indonesia
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeFilter === category
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="!p-0 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Thumbnail Placeholder */}
            <div className="h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <Newspaper className="w-12 h-12 text-gray-400 dark:text-gray-600" />
            </div>
            {/* Content */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                    article.category
                  )}`}
                >
                  {article.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {article.date}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {article.excerpt}
              </p>
              <button className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                Baca Selengkapnya &rarr;
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 py-8">
        <button className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <span className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          Halaman 1 dari 1
        </span>
        <button className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
