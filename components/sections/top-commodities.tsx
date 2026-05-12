"use client"

import { ArrowUp, ArrowDown } from "lucide-react"
import { ResponsiveContainer, LineChart, Line } from "recharts"
import { commodities } from "@/data/commodities"
import { formatCurrency } from "@/lib/utils"

export default function TopCommodities() {
  return (
    <section className="py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Komoditas
          </h2>
          <a
            href="/commodities"
            className="text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Lihat semua
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {commodities.map((commodity) => {
            const chartData = commodity.history.map((value, i) => ({
              index: i,
              value,
            }))
            const isPositive = commodity.change >= 0

            return (
              <div
                key={commodity.id}
                className="bg-gray-900/50 border border-gray-800/50 rounded-lg p-2.5 hover:border-emerald-500/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-gray-400">
                    {commodity.name}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {isPositive ? (
                      <ArrowUp className="h-2.5 w-2.5 text-emerald-400" />
                    ) : (
                      <ArrowDown className="h-2.5 w-2.5 text-red-400" />
                    )}
                    <span
                      className={`text-[10px] font-medium ${
                        isPositive ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {isPositive ? "+" : ""}{commodity.change}%
                    </span>
                  </div>
                </div>
                <p className="text-sm font-bold text-white mb-1">
                  {formatCurrency(commodity.price)}
                </p>
                <div className="h-[28px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={isPositive ? "#10b981" : "#ef4444"}
                        strokeWidth={1.2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
