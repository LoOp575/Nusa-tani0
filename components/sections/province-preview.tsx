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
    name: province.name.length > 10 ? province.name.slice(0, 10) + "..." : province.name,
    padi: province.ppiPadi / 1000000,
    jagung: province.prodJagung / 1000000,
  }))

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
          Data Pertanian Per Provinsi
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-2 text-gray-500 dark:text-gray-400 font-medium">
                        Provinsi
                      </th>
                      <th className="text-right py-3 px-2 text-gray-500 dark:text-gray-400 font-medium">
                        Produksi Padi
                      </th>
                      <th className="text-right py-3 px-2 text-gray-500 dark:text-gray-400 font-medium">
                        Produksi Jagung
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewProvinces.map((province) => (
                      <tr
                        key={province.id}
                        className="border-b border-gray-100 dark:border-gray-800 last:border-0"
                      >
                        <td className="py-3 px-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {province.name}
                        </td>
                        <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">
                          {formatNumber(province.ppiPadi)} ton
                        </td>
                        <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">
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
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full flex flex-col justify-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Perbandingan Produksi (juta ton)
              </p>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      className="text-gray-500 dark:text-gray-400"
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      className="text-gray-500 dark:text-gray-400"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#f9fafb",
                      }}
                    />
                    <Bar dataKey="padi" fill="#10b981" radius={[4, 4, 0, 0]} name="Padi" />
                    <Bar dataKey="jagung" fill="#34d399" radius={[4, 4, 0, 0]} name="Jagung" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="text-center mt-8">
          <Button href="/province" variant="secondary">
            Lihat Semua Provinsi
          </Button>
        </div>
      </div>
    </section>
  )
}
