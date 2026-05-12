'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'
import Card from '@/components/ui/card'
import { commodities } from '@/data/commodities'
import { formatCurrency } from '@/lib/utils'

export default function CommoditiesPage() {
  const [selectedCommodity, setSelectedCommodity] = useState(commodities[0].id)

  const selected = commodities.find((c) => c.id === selectedCommodity) || commodities[0]

  const chartData = selected.history.map((price, index) => ({
    name: `Minggu ${index + 1}`,
    harga: price,
  }))

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
          Komoditas Pertanian
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Harga komoditas realtime, grafik harga, dan analisis pasar
        </p>
      </div>

      {/* Commodity Selector Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {commodities.map((commodity) => (
          <button
            key={commodity.id}
            onClick={() => setSelectedCommodity(commodity.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedCommodity === commodity.id
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {commodity.name}
          </button>
        ))}
      </div>

      {/* Price Chart */}
      <Card className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Grafik Harga {selected.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tren harga 7 minggu terakhir ({selected.unit})
          </p>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorHarga" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.75rem',
                  color: '#f9fafb',
                }}
              />
              <Area
                type="monotone"
                dataKey="harga"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorHarga)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Commodity Detail Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {commodities.map((commodity) => (
          <Card key={commodity.id} className="hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {commodity.name}
              </h3>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  commodity.change >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {commodity.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {commodity.change >= 0 ? '+' : ''}
                {commodity.change}%
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(commodity.price)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {commodity.unit}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              {commodity.id === 'gabah' &&
                'Komoditas utama pangan nasional dengan permintaan stabil sepanjang tahun.'}
              {commodity.id === 'jagung' &&
                'Bahan baku pakan ternak dan industri pangan olahan.'}
              {commodity.id === 'singkong' &&
                'Sumber karbohidrat alternatif dengan potensi ekspor tinggi.'}
              {commodity.id === 'cabai' &&
                'Komoditas volatile dengan fluktuasi harga musiman yang signifikan.'}
              {commodity.id === 'jahe' &&
                'Rempah dengan permintaan tinggi untuk industri jamu dan ekspor.'}
            </p>
          </Card>
        ))}
      </div>

      {/* Market Insight Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Insight Pasar
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Pasar komoditas pertanian Indonesia pada minggu ini menunjukkan tren positif secara
            keseluruhan. Harga gabah terus mengalami penguatan didorong oleh permintaan yang
            meningkat menjelang periode distribusi ke penggilingan besar di Jawa. Stok di tingkat
            petani mulai menipis seiring berakhirnya musim panen raya, sehingga harga diperkirakan
            akan terus menguat dalam 2-3 minggu ke depan.
          </p>
          <p>
            Komoditas cabai menjadi yang paling volatile dengan kenaikan 5.2% dalam seminggu
            terakhir. Faktor utama adalah gangguan distribusi akibat cuaca ekstrem di beberapa
            sentra produksi di Jawa Barat dan Jawa Tengah. BMKG memprediksi curah hujan tinggi
            masih akan berlangsung hingga akhir bulan, sehingga potensi kenaikan harga cabai masih
            terbuka.
          </p>
          <p>
            Di sisi lain, singkong mengalami koreksi tipis -0.5% namun secara fundamental masih
            stabil. Permintaan dari industri tapioka tetap kuat, dan program pemerintah untuk
            diversifikasi pangan berbasis singkong diperkirakan akan menjaga harga tetap di
            koridor Rp 2.000-2.300/kg untuk kuartal ini. Investor dan petani disarankan memantau
            perkembangan cuaca dan kebijakan distribusi pemerintah.
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
