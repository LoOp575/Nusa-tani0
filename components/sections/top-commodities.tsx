"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown } from "lucide-react"
import { ResponsiveContainer, LineChart, Line } from "recharts"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import { commodities as fallbackCommodities } from "@/data/commodities"
import { formatCurrency } from "@/lib/utils"

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

export default function TopCommodities() {
  const [items, setItems] = useState<Commodity[]>(fallbackCommodities)
  const [isLoading, setIsLoading] = useState(true)
  const [isRealtime, setIsRealtime] = useState(false)
  const [source, setSource] = useState("Data lokal")
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadPrices() {
      try {
        const response = await fetch("/api/food-prices", { cache: "no-store" })
        if (!response.ok) throw new Error("Failed to load food prices")
        const data: FoodPriceResponse = await response.json()
        if (!active) return
        setItems(data.commodities)
        setIsRealtime(data.isRealtime)
        setSource(data.source)
        setUpdatedAt(data.updatedAt)
      } catch {
        if (!active) return
        setItems(fallbackCommodities)
        setIsRealtime(false)
        setSource("Data lokal")
      } finally {
        if (active) setIsLoading(false)
      }
    }

    loadPrices()

    return () => {
      active = false
    }
  }, [])

  const updatedLabel = updatedAt
    ? new Date(updatedAt).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Data lokal"

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Harga Pangan Nasional
          </p>
          <h2 className="mt-1 text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
            Komoditas Utama
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {isLoading
              ? "Mengambil harga pangan terbaru..."
              : `${isRealtime ? "Realtime" : "Fallback"} • ${source} • ${updatedLabel}`}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {items.slice(0, 6).map((commodity, index) => {
            const chartData = commodity.history.map((value, i) => ({ index: i, value }))
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
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {commodity.name}
                    </p>
                    {index === 0 && (
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                        isRealtime
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                      }`}>
                        {isRealtime ? "Live" : "Demo"}
                      </span>
                    )}
                  </div>

                  <p className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                    {formatCurrency(commodity.price)}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    {commodity.unit}
                  </p>

                  <div className="flex items-center gap-1 mt-1">
                    {isPositive ? (
                      <ArrowUp className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-[11px] font-medium ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                      {isPositive ? "+" : ""}{commodity.change}%
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
