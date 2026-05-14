import { NextResponse } from 'next/server'
import { commodities as fallbackCommodities } from '@/data/commodities'

export const dynamic = 'force-dynamic'

type FoodPrice = {
  id: string
  name: string
  price: number
  change: number
  history: number[]
  unit: string
  icon: string
  category: string
  source: string
}

const NATIONAL_FOOD_SOURCE_URL = process.env.NATIONAL_FOOD_SOURCE_URL

function normalizeCommodityName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function buildHistory(price: number, change: number) {
  const base = price / (1 + change / 100 || 1)
  return [
    Math.round(base * 0.97),
    Math.round(base * 0.985),
    Math.round(base),
    Math.round((base + price) / 2),
    Math.round(price * 0.992),
    Math.round(price * 0.998),
    Math.round(price),
  ]
}

function fallbackNationalFoodPrices(): FoodPrice[] {
  return [
    {
      id: 'beras-medium',
      name: 'Beras Medium',
      price: 13500,
      change: 0.7,
      history: buildHistory(13500, 0.7),
      unit: 'Rp/kg',
      icon: 'Wheat',
      category: 'Pangan Pokok',
      source: 'Fallback Nasional',
    },
    {
      id: 'beras-premium',
      name: 'Beras Premium',
      price: 15800,
      change: 0.5,
      history: buildHistory(15800, 0.5),
      unit: 'Rp/kg',
      icon: 'Wheat',
      category: 'Pangan Pokok',
      source: 'Fallback Nasional',
    },
    {
      id: 'cabai-merah',
      name: 'Cabai Merah',
      price: 45000,
      change: 5.2,
      history: buildHistory(45000, 5.2),
      unit: 'Rp/kg',
      icon: 'Flame',
      category: 'Hortikultura',
      source: 'Fallback Nasional',
    },
    {
      id: 'bawang-merah',
      name: 'Bawang Merah',
      price: 38000,
      change: -1.4,
      history: buildHistory(38000, -1.4),
      unit: 'Rp/kg',
      icon: 'Sprout',
      category: 'Hortikultura',
      source: 'Fallback Nasional',
    },
    {
      id: 'telur-ayam',
      name: 'Telur Ayam',
      price: 29500,
      change: 1.1,
      history: buildHistory(29500, 1.1),
      unit: 'Rp/kg',
      icon: 'Egg',
      category: 'Protein',
      source: 'Fallback Nasional',
    },
    {
      id: 'minyak-goreng',
      name: 'Minyak Goreng',
      price: 17800,
      change: 0.3,
      history: buildHistory(17800, 0.3),
      unit: 'Rp/liter',
      icon: 'Droplets',
      category: 'Pangan Pokok',
      source: 'Fallback Nasional',
    },
  ]
}

function normalizeExternalPayload(payload: unknown): FoodPrice[] {
  const rawItems = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { data?: unknown }).data)
      ? (payload as { data: unknown[] }).data
      : Array.isArray((payload as { results?: unknown }).results)
        ? (payload as { results: unknown[] }).results
        : []

  return rawItems
    .map((item) => {
      const row = item as Record<string, unknown>
      const name = String(row.name || row.nama || row.commodity || row.komoditas || '')
      const price = Number(row.price || row.harga || row.value || row.nilai || 0)
      const change = Number(row.change || row.perubahan || row.changePercent || row.persen || 0)

      if (!name || !Number.isFinite(price) || price <= 0) return null

      return {
        id: String(row.id || normalizeCommodityName(name)),
        name,
        price: Math.round(price),
        change: Number.isFinite(change) ? Number(change.toFixed(2)) : 0,
        history: Array.isArray(row.history)
          ? (row.history as number[]).map((value) => Number(value)).filter(Boolean)
          : buildHistory(price, change),
        unit: String(row.unit || row.satuan || 'Rp/kg'),
        icon: String(row.icon || 'Wheat'),
        category: String(row.category || row.kategori || 'Pangan Nasional'),
        source: String(row.source || row.sumber || 'External API'),
      }
    })
    .filter(Boolean) as FoodPrice[]
}

async function fetchExternalFoodPrices() {
  if (!NATIONAL_FOOD_SOURCE_URL) return []

  const response = await fetch(NATIONAL_FOOD_SOURCE_URL, {
    headers: {
      Accept: 'application/json',
    },
    next: { revalidate: 900 },
  })

  if (!response.ok) {
    throw new Error(`External food price API error: ${response.status}`)
  }

  const payload = await response.json()
  return normalizeExternalPayload(payload)
}

export async function GET() {
  try {
    const externalPrices = await fetchExternalFoodPrices()
    const prices = externalPrices.length > 0 ? externalPrices : fallbackNationalFoodPrices()
    const isRealtime = externalPrices.length > 0

    return NextResponse.json({
      isRealtime,
      source: isRealtime ? 'NATIONAL_FOOD_SOURCE_URL' : 'Fallback Nasional',
      updatedAt: new Date().toISOString(),
      note: isRealtime
        ? 'Data harga pangan nasional diambil dari endpoint eksternal yang dikonfigurasi.'
        : 'Fallback aktif. Tambahkan NATIONAL_FOOD_SOURCE_URL di Vercel untuk memakai sumber realtime resmi/API sendiri.',
      commodities: prices,
    })
  } catch (error) {
    return NextResponse.json({
      isRealtime: false,
      source: 'Fallback Nasional',
      updatedAt: new Date().toISOString(),
      note: error instanceof Error ? error.message : 'Gagal mengambil data harga pangan realtime',
      commodities: fallbackNationalFoodPrices().concat(
        fallbackCommodities.map((commodity) => ({
          ...commodity,
          category: 'Komoditas Lokal',
          source: 'Fallback Lokal',
        }))
      ),
    })
  }
}
