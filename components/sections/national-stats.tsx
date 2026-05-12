"use client"

import { Wheat, Sprout, TreePine, MapPin } from "lucide-react"
import { nationalStats } from "@/data/stats"
import { formatNumber } from "@/lib/utils"

const icons = [Wheat, Sprout, TreePine, MapPin]

export default function NationalStats() {
  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {nationalStats.map((stat, index) => {
            const Icon = icons[index]
            return (
              <div
                key={stat.label}
                className="flex items-center gap-2.5 bg-gray-900/50 border border-gray-800/50 rounded-lg px-3 py-2.5"
              >
                <Icon className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 truncate">{stat.label}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-white">
                      {formatNumber(stat.value)}
                    </span>
                    {stat.change !== 0 && (
                      <span
                        className={`text-[10px] font-medium ${
                          stat.change > 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {stat.change > 0 ? "+" : ""}{stat.change}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
