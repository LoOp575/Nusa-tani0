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
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
          Komoditas Utama
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {commodities.map((commodity, index) => {
            const chartData = commodity.history.map((value, i) => ({
              index: i,
              value,
            }))
            const isPositive = commodity.change >= 0

            return (
              <motion.div
                key={commodity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {commodity.name}
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrency(commodity.price)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {isPositive ? (
                      <ArrowUp className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <ArrowDown className="h-3.5 w-3.5 text-red-500" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        isPositive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {commodity.change}%
                    </span>
                  </div>
                  <div className="mt-3 h-[60px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={isPositive ? "#10b981" : "#ef4444"}
                          strokeWidth={2}
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

        <div className="text-center mt-8">
          <Button href="/commodities" variant="secondary">
            Lihat Semua Komoditas
          </Button>
        </div>
      </div>
    </section>
  )
}
