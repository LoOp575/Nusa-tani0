'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react'
import Card from '@/components/ui/card'
import { newsArticles } from '@/data/news'

interface LocalArticle {
  id: string
  title: string
  category: string
  date: string
  status: 'Published' | 'Draft'
}

const categoryOptions = ['Padi', 'Cuaca', 'Teknologi', 'AI Pertanian', 'Komoditas']

export default function AdminPage() {
  const [articles, setArticles] = useState<LocalArticle[]>(
    newsArticles.map((article) => ({
      id: article.id,
      title: article.title,
      category: article.category,
      date: article.date,
      status: 'Published' as const,
    }))
  )

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Padi',
    content: '',
    isPublished: true,
  })

  const handleDelete = (id: string) => {
    setArticles((prev) => prev.filter((article) => article.id !== id))
  }

  const handleSubmit = () => {
    if (!formData.title.trim()) return

    const newArticle: LocalArticle = {
      id: `article-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      date: new Date().toISOString().split('T')[0],
      status: formData.isPublished ? 'Published' : 'Draft',
    }

    setArticles((prev) => [newArticle, ...prev])
    setFormData({ title: '', category: 'Padi', content: '', isPublished: true })
    setShowForm(false)
  }

  const handleCancel = () => {
    setFormData({ title: '', category: 'Padi', content: '', isPublished: true })
    setShowForm(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Admin Panel
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Kelola artikel dan berita pertanian
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Tambah Artikel Baru
        </button>
      </div>

      {/* Create Article Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Artikel Baru
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Masukkan judul artikel..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Konten
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Tulis konten artikel..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm resize-none"
                />
              </div>

              {/* Thumbnail Upload Placeholder */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Thumbnail
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Klik atau drag & drop gambar di sini
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    PNG, JPG, WEBP (maks. 2MB)
                  </p>
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status:
                </label>
                <button
                  onClick={() =>
                    setFormData({ ...formData, isPublished: !formData.isPublished })
                  }
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    formData.isPublished ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      formData.isPublished ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.isPublished ? 'Publish' : 'Draft'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                >
                  Simpan Artikel
                </button>
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Articles Table */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Daftar Artikel
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Judul
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Kategori
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Tanggal
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-3 px-2 text-gray-900 dark:text-white font-medium max-w-xs truncate">
                    {article.title}
                  </td>
                  <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                    {article.category}
                  </td>
                  <td className="py-3 px-2 text-gray-500 dark:text-gray-400">
                    {article.date}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.status === 'Published'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hover:text-blue-500">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Belum ada artikel.</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
