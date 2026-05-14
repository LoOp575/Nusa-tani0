"use client"

import { motion } from "framer-motion"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import { provinces } from "@/data/provinces"
import { formatNumber } from "@/lib/utils"

export default function ProvincePreview() {
  const rankedProvinces = [...provinces].sort(
    (a, b) => b.changePercent - a.changePercent
  )

  const topUp = rankedProvinces.slice(0, 3)
  const topWatch = [...provinces]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 2)

  const previewProvinces = rankedProvinces.slice(0, 5)

  const chartData = previewProvinces.map((province) => ({
    name: province.name.length > 8 ? province.name.slice(0, 8) + ".." : province.name,
    padi: province.ppiPadi / 1000000,
    jagung: province.prodJagung / 1000000,
  }))

  const trendBadge = (trend: string, changePercent: number) => {
    if (trend === "up") {
      return (
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
          Naik +{changePercent}%
        </span>
      )
    }

    if (trend === "down") {
      return (
        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
          Turun {changePercent}%
        </span>
      )
    }

    return (
      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
        Stabil +{changePercent}%
      </span>
    )
  }

  return (
    <section className="py-7 md:py-9">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-5 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Ranking Provinsi
          </p>
          <h2 className="mt-1 text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
            Pergerakan Padi, Gabah & Jagung
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Ringkasan ringan untuk melihat provinsi yang sedang naik, turun, dan stabil.
          </p>
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card>
            <p className="mb-3 text-xs font-semibold text-gray-800 dark:text-gray-100">
              Top Provinsi Naik
            </p>
            <div className="space-y-2">
              {topUp.map((province, index) => (
                <div
                  key={province.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-3 py-2 dark:border-gray-800"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      #{index + 1} {province.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Komoditas: {province.mainCommodity}
                    </p>
                  </div>
                  {trendBadge(province.trend, province.changePercent)}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="mb-3 text-xs font-semibold text-gray-800 dark:text-gray-100">
              Provinsi Perlu Dipantau
            </p>
            <div className="space-y-2">
              {topWatch.map((province) => (
                <div
                  key={province.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-3 py-2 dark:border-gray-800"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {province.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Produktivitas: {province.produktivitas} ton/ha
                    </p>
                  </div>
                  {trendBadge(province.trend, province.changePercent)}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="text-left py-2 px-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Provinsi
                      </th>
                      <th className="text-right py-2 px-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Padi/Gabah
                      </th>
                      <th className="text-right py-2 px-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewProvinces.map((province) => (
                      <tr
                        key={province.id}
                        className="border-b border-gray-50 dark:border-gray-800/50 last:border-0"
                      >
                        <td className="py-2.5 px-2 text-xs font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {province.name}
                          <span className="block text-[11px] font-normal text-gray-500 dark:text-gray-400">
                            {province.mainCommodity}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-right text-xs text-gray-600 dark:text-gray-300">
                          {formatNumber(province.ppiPadi)} ton
                        </td>
                        <td className="py-2.5 px-2 text-right">
                          {trendBadge(province.trend, province.changePercent)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full flex flex-col justify-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Perbandingan Produksi Padi/Gabah & Jagung (juta ton)
              </p>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#f9fafb",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="padi" fill="#10b981" radius={[3, 3, 0, 0]} name="Padi/Gabah" />
                    <Bar dataKey="jagung" fill="#34d399" radius={[3, 3, 0, 0]} name="Jagung" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="text-center mt-6">
          <Button href="/province" variant="secondary" size="sm">
            Lihat Semua Provinsi
          </Button>
        </div>
      </div>
    </section>
  )
}
