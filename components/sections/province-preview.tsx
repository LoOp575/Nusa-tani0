"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
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
    <section className="py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Top Provinsi
          </h2>
          <a
            href="/province"
            className="text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Semua provinsi
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* Table */}
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-lg p-3">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800/50">
                  <th className="text-left py-1.5 text-[10px] text-gray-500 font-medium">
                    Provinsi
                  </th>
                  <th className="text-right py-1.5 text-[10px] text-gray-500 font-medium">
                    Padi
                  </th>
                  <th className="text-right py-1.5 text-[10px] text-gray-500 font-medium">
                    Jagung
                  </th>
                </tr>
              </thead>
              <tbody>
                {previewProvinces.map((province) => (
                  <tr
                    key={province.id}
                    className="border-b border-gray-800/30 last:border-0"
                  >
                    <td className="py-1.5 text-[11px] font-medium text-gray-300">
                      {province.name}
                    </td>
                    <td className="py-1.5 text-right text-[11px] text-gray-400">
                      {formatNumber(province.ppiPadi)}
                    </td>
                    <td className="py-1.5 text-right text-[11px] text-gray-400">
                      {formatNumber(province.prodJagung)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart */}
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-lg p-3">
            <p className="text-[10px] text-gray-500 mb-2">
              Produksi (juta ton)
            </p>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 9, fill: '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                      color: "#f9fafb",
                      fontSize: "10px",
                    }}
                  />
                  <Bar dataKey="padi" fill="#10b981" radius={[2, 2, 0, 0]} name="Padi" />
                  <Bar dataKey="jagung" fill="#34d399" radius={[2, 2, 0, 0]} name="Jagung" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
