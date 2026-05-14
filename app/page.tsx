"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Bot,
  ChevronRight,
  LineChart as LineChartIcon,
  MapPin,
  Newspaper,
  ScanLine,
  Sparkles,
  Wheat,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { commodities as fallbackCommodities } from "@/data/commodities"
import { provinces } from "@/data/provinces"
import { newsArticles } from "@/data/news"
import { formatCurrency, formatNumber } from "@/lib/utils"

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

const watchedNames = ["Padi", "Jagung", "Jahe", "Beras", "Kencur"]

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function buildTickerItems(items: Commodity[]) {
  const syntheticPadi: Commodity = {
    id: "padi",
    name: "Padi",
    price: 7200,
    change: 1.4,
    history: [6900, 7000, 7050, 7100, 7150, 7180, 7200],
    unit: "Rp/kg",
    icon: "Wheat",
    category: "Gabah & Padi",
  }

  const syntheticKencur: Commodity = {
    id: "kencur",
    name: "Kencur",
    price: 42000,
    change: -0.8,
    history: [43500, 43200, 42800, 42600, 42400, 42100, 42000],
    unit: "Rp/kg",
    icon: "Leaf",
    category: "Rempah",
  }

  const combined = [...items, syntheticPadi, syntheticKencur]
  return watchedNames.map((name) => {
    const found = combined.find((item) => item.name.toLowerCase().includes(name.toLowerCase()))
    return found || combined[0]
  })
}

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const chartData = data.map((value, index) => ({ index, value }))
  return (
    <div className="h-9 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={positive ? "#10b981" : "#ef4444"}
            strokeWidth={1.6}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function SectionTitle({ label, title, href }: { label: string; title: string; href?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-500">{label}</p>
        <h2 className="text-sm font-black text-gray-950 dark:text-white md:text-base">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
          Detail <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  )
}

export default function HomePage() {
  const [items, setItems] = useState<Commodity[]>(fallbackCommodities)
  const [isRealtime, setIsRealtime] = useState(false)
  const [source, setSource] = useState("Data lokal")
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadPrices() {
      try {
        const response = await fetch("/api/food-prices", { cache: "no-store" })
        if (!response.ok) throw new Error("Food prices API error")
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
      }
    }

    loadPrices()
    return () => {
      active = false
    }
  }, [])

  const tickerItems = useMemo(() => buildTickerItems(items), [items])
  const marketItems = useMemo(() => items.slice(0, 8), [items])
  const topMovers = useMemo(() => [...items].sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 4), [items])
  const provinceRank = useMemo(() => [...provinces].sort((a, b) => b.changePercent - a.changePercent), [])
  const gabah = items.find((item) => item.name.toLowerCase().includes("gabah")) || fallbackCommodities[0]
  const beras = items.find((item) => item.name.toLowerCase().includes("beras")) || items[0] || fallbackCommodities[0]
  const updatedLabel = updatedAt
    ? new Date(updatedAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })
    : "Data lokal"

  const provinceChartData = provinceRank.slice(0, 5).map((province) => ({
    name: province.name.replace("Jawa ", "J. ").replace("Sumatera ", "Sum. "),
    value: province.changePercent,
  }))

  return (
    <main className="min-h-screen bg-[#f6f8f5] pb-24 text-gray-950 dark:bg-[#080d0b] dark:text-gray-100 md:pb-8">
      <section className="border-b border-emerald-900/10 bg-[#0b1712] text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden px-3 py-2 md:px-5">
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Live Market
          </div>
          <div className="flex min-w-0 flex-1 gap-3 overflow-x-auto text-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[...tickerItems, ...tickerItems].map((item, index) => {
              const positive = item.change >= 0
              return (
                <div key={`${item.id}-${index}`} className="flex shrink-0 items-center gap-2 rounded-lg bg-white/5 px-2.5 py-1">
                  <span className="font-bold text-white">{item.name}</span>
                  <span className="text-gray-300">{formatCurrency(item.price)}</span>
                  <span className={positive ? "text-emerald-300" : "text-red-300"}>{positive ? "+" : ""}{item.change}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-3 py-4 md:px-5 md:py-5">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4 grid gap-3 lg:grid-cols-[1.45fr_0.55fr]"
        >
          <div className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm dark:border-emerald-800/30 dark:bg-[#101712] md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-700 dark:bg-amber-400/15 dark:text-amber-300">
                    Bloomberg Mini Agritech
                  </span>
                  <span className={classNames("rounded-full px-2.5 py-1 text-[10px] font-bold", isRealtime ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300")}>{isRealtime ? "Realtime" : "Fallback"}</span>
                </div>
                <h1 className="max-w-2xl text-2xl font-black leading-tight tracking-tight text-gray-950 dark:text-white md:text-4xl">
                  NusaTani Market Intelligence
                </h1>
                <p className="mt-2 max-w-2xl text-xs font-medium leading-relaxed text-gray-500 dark:text-gray-400 md:text-sm">
                  Dashboard data pertanian Indonesia untuk memantau harga pangan, gabah, ranking provinsi, cuaca, dan sinyal pasar secara cepat.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 md:w-[360px]">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/70">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Source</p>
                  <p className="mt-1 truncate text-xs font-black text-gray-900 dark:text-white">{source}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/70">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Update</p>
                  <p className="mt-1 text-xs font-black text-gray-900 dark:text-white">{updatedLabel.split(" ").slice(-2).join(" ")}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/70">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Watch</p>
                  <p className="mt-1 text-xs font-black text-gray-900 dark:text-white">{items.length} aset</p>
                </div>
              </div>
            </div>
          </div>

          <Link href="/ai-assistant" className="group rounded-2xl border border-emerald-900/10 bg-gradient-to-br from-emerald-600 to-emerald-900 p-4 text-white shadow-sm transition hover:scale-[1.01] dark:border-emerald-600/30">
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-white/15 p-2"><Bot className="h-5 w-5" /></div>
                <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100">AI Tani Assistant</p>
                <h2 className="mt-1 text-lg font-black">Tanya kondisi pasar & rekomendasi tanam</h2>
                <p className="mt-2 text-xs leading-relaxed text-emerald-50/85">Mode cepat untuk petani, investor, dan pengamat harga komoditas.</p>
              </div>
            </div>
          </Link>
        </motion.section>

        <section className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topMovers.map((item, index) => {
            const positive = item.change >= 0
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-[#101712]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400">{item.category || "Komoditas"}</p>
                    <h3 className="mt-0.5 text-sm font-black text-gray-950 dark:text-white">{item.name}</h3>
                  </div>
                  <span className={classNames("rounded-full px-2 py-0.5 text-[10px] font-black", positive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300" : "bg-red-100 text-red-700 dark:bg-red-400/15 dark:text-red-300")}>{positive ? "Naik" : "Turun"}</span>
                </div>
                <div className="mt-3 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-lg font-black text-gray-950 dark:text-white">{formatCurrency(item.price)}</p>
                    <p className={classNames("mt-1 flex items-center gap-1 text-xs font-black", positive ? "text-emerald-600" : "text-red-500")}>{positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}{positive ? "+" : ""}{item.change}%</p>
                  </div>
                  <MiniSparkline data={item.history} positive={positive} />
                </div>
              </motion.div>
            )
          })}
        </section>

        <section className="mb-4 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-[#101712] md:p-4">
            <SectionTitle label="Market Overview" title="Tabel Harga Pangan Nasional" href="/commodities" />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] uppercase tracking-[0.12em] text-gray-400 dark:border-gray-800">
                    <th className="px-2 py-2 font-black">Komoditas</th>
                    <th className="px-2 py-2 font-black">Harga</th>
                    <th className="px-2 py-2 font-black">Perubahan</th>
                    <th className="px-2 py-2 font-black">Provinsi</th>
                    <th className="px-2 py-2 font-black">Update</th>
                    <th className="px-2 py-2 font-black">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {marketItems.map((item, index) => {
                    const positive = item.change > 0
                    const negative = item.change < 0
                    const province = provinceRank[index % provinceRank.length]
                    return (
                      <tr key={item.id} className="border-b border-gray-50 last:border-0 dark:border-gray-800/70">
                        <td className="px-2 py-2.5 font-black text-gray-950 dark:text-white">{item.name}</td>
                        <td className="px-2 py-2.5 font-bold">{formatCurrency(item.price)}</td>
                        <td className={classNames("px-2 py-2.5 font-black", positive ? "text-emerald-600" : negative ? "text-red-500" : "text-gray-500")}>{positive ? "+" : ""}{item.change}%</td>
                        <td className="px-2 py-2.5 text-gray-500 dark:text-gray-400">{province?.name || "Nasional"}</td>
                        <td className="px-2 py-2.5 text-gray-500 dark:text-gray-400">{updatedLabel}</td>
                        <td className="px-2 py-2.5"><MiniSparkline data={item.history} positive={!negative} /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-[#101712] md:p-4">
              <SectionTitle label="Gabah & Padi" title="Harga Acuan Cepat" />
              <div className="grid grid-cols-2 gap-2">
                {[gabah, beras].map((item) => {
                  const positive = item.change >= 0
                  return (
                    <div key={item.id} className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900/70">
                      <p className="text-[11px] font-bold text-gray-500">{item.name}</p>
                      <p className="mt-1 text-lg font-black">{formatCurrency(item.price)}</p>
                      <p className={classNames("mt-1 text-xs font-black", positive ? "text-emerald-600" : "text-red-500")}>{positive ? "+" : ""}{item.change}%</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 shadow-sm dark:border-amber-500/20 dark:bg-amber-500/10 md:p-4">
              <SectionTitle label="Peringatan Pasar" title="Berita & Alert" href="/news" />
              <div className="space-y-2">
                {newsArticles.slice(0, 3).map((news) => (
                  <div key={news.id} className="flex gap-2 rounded-xl bg-white/70 p-2 dark:bg-gray-950/40">
                    <Newspaper className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    <div>
                      <p className="line-clamp-1 text-xs font-black text-gray-900 dark:text-white">{news.title}</p>
                      <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{news.category} • {news.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-[#101712] md:p-4">
            <SectionTitle label="Ranking Provinsi" title="Naik / Turun Produksi" href="/province" />
            <div className="space-y-2">
              {provinceRank.slice(0, 5).map((province, index) => {
                const positive = province.changePercent >= 0
                return (
                  <div key={province.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-900/70">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white text-[11px] font-black text-gray-600 dark:bg-gray-800 dark:text-gray-300">{index + 1}</span>
                      <div>
                        <p className="text-xs font-black">{province.name}</p>
                        <p className="text-[10px] text-gray-500">{province.mainCommodity}</p>
                      </div>
                    </div>
                    <span className={classNames("rounded-full px-2 py-0.5 text-[10px] font-black", positive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300" : "bg-red-100 text-red-700 dark:bg-red-400/15 dark:text-red-300")}>{positive ? "+" : ""}{province.changePercent}%</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-[#101712] md:p-4">
            <SectionTitle label="Visual Grafik" title="Momentum Provinsi dan Produksi" />
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={provinceChartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "12px", color: "#f9fafb", fontSize: "12px" }}
                  />
                  <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} name="Perubahan %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
