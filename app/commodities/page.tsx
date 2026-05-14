'use client'

import { useEffect, useMemo, useState } from 'react'
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
import { commodities as fallbackCommodities } from '@/data/commodities'
import { formatCurrency } from '@/lib/utils'

type Commodity = {
  id: string
  name: string
  price: number
  change: number
  history: number[]
  unit: string
  icon: string
  category?: string
  source?: string
}

type FoodPriceResponse = {
  isRealtime: boolean
  source: string
  updatedAt: string
  commodities: Commodity[]
}

function getCommodityInsight(id: string, name: string) {
  const insights: Record<string, string> = {
    'beras-medium': 'Beras medium adalah indikator utama daya beli rumah tangga dan stabilitas pangan nasional.',
    'beras-premium': 'Beras premium mengikuti permintaan konsumen kota dan distribusi pasar modern.',
    'cabai-merah': 'Cabai merah termasuk komoditas volatile karena sangat dipengaruhi cuaca dan distribusi.',
    'bawang-merah': 'Bawang merah sensitif terhadap pasokan sentra produksi dan musim panen.',
    'telur-ayam': 'Telur ayam mencerminkan biaya pakan dan permintaan protein harian masyarakat.',
    'minyak-goreng': 'Minyak goreng dipengaruhi harga CPO, distribusi, dan kebijakan stok nasional.',
    gabah: 'Gabah menjadi dasar rantai pasok beras dan pendapatan petani padi.',
    jagung: 'Jagung penting untuk pakan ternak dan industri pangan olahan.',
    singkong: 'Singkong adalah karbohidrat alternatif dan bahan baku industri tapioka.',
    cabai: 'Cabai sangat fluktuatif karena cuaca, distribusi, dan permintaan harian.',
    jahe: 'Jahe memiliki pasar rempah, jamu, dan peluang ekspor.',
  }

  return insights[id] || `${name} dipantau sebagai bagian dari harga pangan nasional dan kebutuhan pasar harian.`
}

export default function CommoditiesPage() {
  const [commodities, setCommodities] = useState<Commodity[]>(fallbackCommodities)
  const [selectedCommodity, setSelectedCommodity] = useState(fallbackCommodities[0].id)
  const [isLoading, setIsLoading] = useState(true)
  const [isRealtime, setIsRealtime] = useState(false)
  const [source, setSource] = useState('Data lokal')
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadPrices() {
      try {
        const response = await fetch('/api/food-prices', { cache: 'no-store' })
        if (!response.ok) throw new Error('Failed to load food prices')
        const data: FoodPriceResponse = await response.json()
        if (!active) return
        setCommodities(data.commodities)
        setSelectedCommodity(data.commodities[0]?.id || fallbackCommodities[0].id)
        setIsRealtime(data.isRealtime)
        setSource(data.source)
        setUpdatedAt(data.updatedAt)
      } catch {
        if (!active) return
        setCommodities(fallbackCommodities)
        setSelectedCommodity(fallbackCommodities[0].id)
        setIsRealtime(false)
        setSource('Data lokal')
      } finally {
        if (active) setIsLoading(false)
      }
    }

    loadPrices()

    return () => {
      active = false
    }
  }, [])

  const selected = useMemo(() => {
    return commodities.find((c) => c.id === selectedCommodity) || commodities[0]
  }, [commodities, selectedCommodity])

  const chartData = (selected?.history || []).map((price, index) => ({
    name: `M${index + 1}`,
    harga: price,
  }))

  const updatedLabel = updatedAt
    ? new Date(updatedAt).toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Data lokal'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 py-6 md:py-8"
    >
      <div className="mb-6 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm dark:border-emerald-900/40 dark:bg-gray-900 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              Dashboard Komoditas
            </p>
            <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Harga Pangan Nasional
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {isLoading ? 'Mengambil data...' : `${isRealtime ? 'Realtime' : 'Fallback'} • ${source} • ${updatedLabel}`}
            </p>
          </div>
          <span className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
            isRealtime
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
              : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
          }`}>
            {isRealtime ? 'Live Data' : 'Demo/Fallback'}
          </span>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {commodities.map((commodity) => (
          <button
            key={commodity.id}
            onClick={() => setSelectedCommodity(commodity.id)}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 md:text-sm ${
              selectedCommodity === commodity.id
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {commodity.name}
          </button>
        ))}
      </div>

      {selected && (
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Grafik Harga {selected.name}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tren ringkas berdasarkan data yang tersedia ({selected.unit})
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(selected.price)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{selected.unit}</p>
              </div>
            </div>
            <div className="h-[260px] w-full md:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorHarga" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" opacity={0.2} />
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

          <Card>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Insight Singkat
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {getCommodityInsight(selected.id, selected.name)}
            </p>
            <div className="mt-4 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/60">
              <p className="text-xs text-gray-500 dark:text-gray-400">Perubahan</p>
              <p className={`mt-1 flex items-center gap-1 text-lg font-bold ${selected.change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {selected.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {selected.change >= 0 ? '+' : ''}{selected.change}%
              </p>
            </div>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {commodities.map((commodity) => (
          <Card key={commodity.id} className="transition-shadow duration-300 hover:shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {commodity.name}
                </h3>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {commodity.category || 'Pangan Nasional'}
                </p>
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${commodity.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {commodity.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {commodity.change >= 0 ? '+' : ''}{commodity.change}%
              </span>
            </div>
            <p className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(commodity.price)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{commodity.unit}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {getCommodityInsight(commodity.id, commodity.name)}
            </p>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
