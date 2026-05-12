"use client"

import { motion } from "framer-motion"
import { ArrowUp, ArrowDown } from "lucide-react"
import { ResponsiveContainer, LineChart, Line } from "recharts"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import { commodities } from "@/data/commodities"
import { formatCurrency } from "@/lib/utils"

export default function TopCommodities() {
  return (
    <section className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Komoditas Utama
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {commodities.map((commodity, index) => {
            const chartData = commodity.history.map((value, i) => ({
              index: i,
              value,
            }))
            const isPositive = commodity.change >= 0

            return (
              <motion.div
                key={commodity.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                    {commodity.name}
                  </p>
                  <p className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                    {formatCurrency(commodity.price)}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {isPositive ? (
                      <ArrowUp className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={`text-[11px] font-medium ${
                        isPositive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {commodity.change}%
                    </span>
                  </div>
                  <div className="mt-2 h-[40px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={isPositive ? "#10b981" : "#ef4444"}
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-6">
          <Button href="/commodities" variant="secondary" size="sm">
            Lihat Semua Komoditas
          </Button>
        </div>
      </div>
    </section>
  )
}
