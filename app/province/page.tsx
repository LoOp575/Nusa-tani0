'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import Card from '@/components/ui/card'
import { provinces } from '@/data/provinces'
import { formatNumber } from '@/lib/utils'

export default function ProvincePage() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)

  const selected = provinces.find((p) => p.id === selectedProvince)

  const chartData = provinces.map((p) => ({
    name: p.name.length > 12 ? p.name.substring(0, 12) + '...' : p.name,
    'Padi (Juta Ton)': +(p.ppiPadi / 1000000).toFixed(1),
    'Jagung (Juta Ton)': +(p.prodJagung / 1000000).toFixed(1),
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
          Data Pertanian Per Provinsi
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Perbandingan hasil tani dan produksi nasional
        </p>
      </div>

      {/* Simplified SVG Map */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Peta Sentra Produksi
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Klik pada area provinsi untuk melihat detail
        </p>
        <div className="w-full overflow-x-auto">
          <svg
            viewBox="0 0 800 350"
            className="w-full max-w-3xl mx-auto h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sumatera Barat */}
            <g
              onClick={() => setSelectedProvince('sumatera-barat')}
              className="cursor-pointer"
            >
              <rect
                x="80"
                y="100"
                width="100"
                height="80"
                rx="8"
                className={`transition-all duration-200 ${
                  selectedProvince === 'sumatera-barat'
                    ? 'fill-emerald-500 stroke-emerald-300'
                    : 'fill-emerald-700/60 stroke-emerald-600 hover:fill-emerald-600/80'
                }`}
                strokeWidth="2"
              />
              <text
                x="130"
                y="135"
                textAnchor="middle"
                className="fill-white text-[10px] font-medium pointer-events-none"
              >
                Sumatera
              </text>
              <text
                x="130"
                y="150"
                textAnchor="middle"
                className="fill-white text-[10px] font-medium pointer-events-none"
              >
                Barat
              </text>
            </g>

            {/* Jawa Barat */}
            <g
              onClick={() => setSelectedProvince('jawa-barat')}
              className="cursor-pointer"
            >
              <rect
                x="280"
                y="200"
                width="110"
                height="70"
                rx="8"
                className={`transition-all duration-200 ${
                  selectedProvince === 'jawa-barat'
                    ? 'fill-emerald-500 stroke-emerald-300'
                    : 'fill-blue-700/60 stroke-blue-600 hover:fill-blue-600/80'
                }`}
                strokeWidth="2"
              />
              <text
                x="335"
                y="235"
                textAnchor="middle"
                className="fill-white text-[11px] font-medium pointer-events-none"
              >
                Jawa Barat
              </text>
            </g>

            {/* Jawa Tengah */}
            <g
              onClick={() => setSelectedProvince('jawa-tengah')}
              className="cursor-pointer"
            >
              <rect
                x="400"
                y="200"
                width="110"
                height="70"
                rx="8"
                className={`transition-all duration-200 ${
                  selectedProvince === 'jawa-tengah'
                    ? 'fill-emerald-500 stroke-emerald-300'
                    : 'fill-indigo-700/60 stroke-indigo-600 hover:fill-indigo-600/80'
                }`}
                strokeWidth="2"
              />
              <text
                x="455"
                y="235"
                textAnchor="middle"
                className="fill-white text-[11px] font-medium pointer-events-none"
              >
                Jawa Tengah
              </text>
            </g>

            {/* Jawa Timur */}
            <g
              onClick={() => setSelectedProvince('jawa-timur')}
              className="cursor-pointer"
            >
              <rect
                x="520"
                y="200"
                width="110"
                height="70"
                rx="8"
                className={`transition-all duration-200 ${
                  selectedProvince === 'jawa-timur'
                    ? 'fill-emerald-500 stroke-emerald-300'
                    : 'fill-purple-700/60 stroke-purple-600 hover:fill-purple-600/80'
                }`}
                strokeWidth="2"
              />
              <text
                x="575"
                y="235"
                textAnchor="middle"
                className="fill-white text-[11px] font-medium pointer-events-none"
              >
                Jawa Timur
              </text>
            </g>

            {/* NTB */}
            <g
              onClick={() => setSelectedProvince('ntb')}
              className="cursor-pointer"
            >
              <rect
                x="640"
                y="200"
                width="100"
                height="70"
                rx="8"
                className={`transition-all duration-200 ${
                  selectedProvince === 'ntb'
                    ? 'fill-emerald-500 stroke-emerald-300'
                    : 'fill-amber-700/60 stroke-amber-600 hover:fill-amber-600/80'
                }`}
                strokeWidth="2"
              />
              <text
                x="690"
                y="235"
                textAnchor="middle"
                className="fill-white text-[11px] font-medium pointer-events-none"
              >
                NTB
              </text>
            </g>

            {/* Ocean label */}
            <text
              x="400"
              y="320"
              textAnchor="middle"
              className="fill-gray-400 dark:fill-gray-500 text-[10px] italic"
            >
              Laut Jawa
            </text>
          </svg>
        </div>
      </Card>

      {/* Selected Province Detail */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {selected.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Produksi Padi</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatNumber(selected.ppiPadi)} Ton
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Produksi Jagung</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatNumber(selected.prodJagung)} Ton
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Luas Lahan</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatNumber(selected.luasLahan)} Ha
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Produktivitas</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {selected.produktivitas} Ton/Ha
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Comparison Table */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Tabel Perbandingan Provinsi
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Provinsi
                </th>
                <th className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Produksi Padi (Ton)
                </th>
                <th className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Produksi Jagung (Ton)
                </th>
                <th className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Luas Lahan (Ha)
                </th>
                <th className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Produktivitas (Ton/Ha)
                </th>
              </tr>
            </thead>
            <tbody>
              {provinces.map((province) => (
                <tr
                  key={province.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-3 px-2 text-gray-900 dark:text-white font-medium">
                    {province.name}
                  </td>
                  <td className="py-3 px-2 text-right text-gray-700 dark:text-gray-300">
                    {formatNumber(province.ppiPadi)}
                  </td>
                  <td className="py-3 px-2 text-right text-gray-700 dark:text-gray-300">
                    {formatNumber(province.prodJagung)}
                  </td>
                  <td className="py-3 px-2 text-right text-gray-700 dark:text-gray-300">
                    {formatNumber(province.luasLahan)}
                  </td>
                  <td className="py-3 px-2 text-right text-gray-700 dark:text-gray-300">
                    {province.produktivitas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bar Chart */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Perbandingan Produksi (Juta Ton)
        </h2>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.75rem',
                  color: '#f9fafb',
                }}
              />
              <Legend />
              <Bar dataKey="Padi (Juta Ton)" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Jagung (Juta Ton)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Province Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {provinces.map((province) => (
          <Card key={province.id} className="hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {province.name}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Produksi Padi</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatNumber(province.ppiPadi)} Ton
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Produksi Jagung</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatNumber(province.prodJagung)} Ton
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Luas Lahan</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatNumber(province.luasLahan)} Ha
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Produktivitas</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {province.produktivitas} Ton/Ha
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
