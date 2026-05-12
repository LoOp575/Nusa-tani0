"use client"

import { motion } from "framer-motion"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import { provinces } from "@/data/provinces"
import { formatNumber } from "@/lib/utils"

export default function ProvincePreview() {
  const previewProvinces = provinces.slice(0, 4)

  const chartData = previewProvinces.map((province) => ({
    name: province.name.length > 8 ? province.name.slice(0, 8) + ".." : province.name,
    padi: province.ppiPadi / 1000000,
    jagung: province.prodJagung / 1000000,
  }))

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Top Province Movement
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Table */}
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
                        Produksi Padi
                      </th>
                      <th className="text-right py-2 px-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Produksi Jagung
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
                        </td>
                        <td className="py-2.5 px-2 text-right text-xs text-gray-600 dark:text-gray-300">
                          {formatNumber(province.ppiPadi)} ton
                        </td>
                        <td className="py-2.5 px-2 text-right text-xs text-gray-600 dark:text-gray-300">
                          {formatNumber(province.prodJagung)} ton
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full flex flex-col justify-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Perbandingan Produksi (juta ton)
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
                    <Bar dataKey="padi" fill="#10b981" radius={[3, 3, 0, 0]} name="Padi" />
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
