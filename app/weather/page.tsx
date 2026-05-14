                'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Thermometer,
  Droplets,
  CloudRain,
  Wind,
  Sun,
  Cloud,
  AlertTriangle,
  Sprout,
} from 'lucide-react'
import Card from '@/components/ui/card'

type WeatherApiData = {
  location: string
  temperature: number | null
  humidity: number | null
  weather: string
  windSpeed: number | null
  rainfall: number | null
  forecast: {
    time: string
    temperature: number | null
    humidity: number | null
    weather: string
    rainProbability: number | null
    rainfall: number | null
  }[]
  source: string
  updatedAt: string
}

const fallbackForecastData = [
  { day: 'Senin', temp: '27-31', condition: 'Cerah', icon: 'sun' },
  { day: 'Selasa', temp: '26-30', condition: 'Berawan', icon: 'cloud' },
  { day: 'Rabu', temp: '26-29', condition: 'Hujan Ringan', icon: 'rain' },
  { day: 'Kamis', temp: '27-30', condition: 'Berawan', icon: 'cloud' },
  { day: 'Jumat', temp: '28-31', condition: 'Cerah', icon: 'sun' },
  { day: 'Sabtu', temp: '26-28', condition: 'Hujan Ringan', icon: 'rain' },
  { day: 'Minggu', temp: '27-30', condition: 'Berawan', icon: 'cloud' },
]

const fallbackRainfallChart = [
  { day: 'Sen', curah: 15 },
  { day: 'Sel', curah: 8 },
  { day: 'Rab', curah: 25 },
  { day: 'Kam', curah: 12 },
  { day: 'Jum', curah: 5 },
  { day: 'Sab', curah: 30 },
  { day: 'Min', curah: 18 },
]

const farmingRecommendations = [
  {
    title: 'Waktu Tanam Optimal',
    description:
      'Dengan kelembaban tanah yang tinggi, ini waktu yang tepat untuk menanam padi sawah. Pastikan drainase lahan sudah disiapkan dengan baik.',
    icon: Sprout,
  },
  {
    title: 'Tunda Pemupukan',
    description:
      'Hindari pemupukan saat curah hujan tinggi untuk mencegah pencucian nutrisi. Tunggu 1-2 hari setelah hujan reda.',
    icon: Droplets,
  },
  {
    title: 'Waspadai Hama',
    description:
      'Kelembaban tinggi meningkatkan risiko serangan hama wereng dan penyakit blast. Lakukan monitoring rutin setiap 3 hari.',
    icon: AlertTriangle,
  },
  {
    title: 'Siapkan Irigasi Cadangan',
    description:
      'Meskipun sedang musim hujan, siapkan sistem irigasi untuk periode kering mendadak yang bisa terjadi di pertengahan musim.',
    icon: CloudRain,
  },
]

const plantingCalendar = [
  { crop: 'Padi Sawah', months: 'November - Maret', season: 'Musim Hujan' },
  { crop: 'Jagung', months: 'April - Agustus', season: 'Musim Kemarau' },
  { crop: 'Kedelai', months: 'April - Juli', season: 'Musim Kemarau' },
  { crop: 'Cabai', months: 'Mei - September', season: 'Musim Kemarau' },
  { crop: 'Bawang Merah', months: 'Juni - September', season: 'Musim Kemarau' },
  { crop: 'Kentang', months: 'Maret - Juni', season: 'Transisi' },
]

function getWeatherIcon(icon: string) {
  switch (icon) {
    case 'sun':
      return <Sun className="w-6 h-6 text-amber-400" />
    case 'cloud':
      return <Cloud className="w-6 h-6 text-gray-400" />
    case 'rain':
      return <CloudRain className="w-6 h-6 text-blue-400" />
    default:
      return <Sun className="w-6 h-6 text-amber-400" />
  }
}

function getIconFromCondition(condition: string) {
  const lower = condition.toLowerCase()

  if (lower.includes('hujan') || lower.includes('gerimis') || lower.includes('badai')) {
    return 'rain'
  }

  if (lower.includes('awan') || lower.includes('berawan') || lower.includes('kabut')) {
    return 'cloud'
  }

  return 'sun'
}

function formatNumber(value: number | null, fallback = '-') {
  if (value === null || value === undefined) return fallback
  return Number(value).toFixed(1).replace('.0', '')
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherApiData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true)
        setError('')

        const res = await fetch(
          '/api/weather?lat=-6.1593&lon=107.2981&location=Rengasdengklok'
        )

        if (!res.ok) {
          throw new Error('Gagal mengambil data cuaca')
        }

        const data = await res.json()
        setWeather(data)
      } catch {
        setError('Data cuaca belum bisa dimuat.')
      } finally {
        setLoading(false)
      }
    }

    loadWeather()
  }, [])

  const currentWeather: WeatherApiData = weather ?? {
    location: 'Rengasdengklok',
    temperature: null,
    humidity: null,
    weather: loading ? 'Memuat data...' : 'Data demo',
    windSpeed: null,
    rainfall: null,
    forecast: [],
    source: loading ? 'Open-Meteo' : 'Mode demo',
    updatedAt: new Date().toISOString(),
  }

  const realtimeForecastData =
    currentWeather.forecast.length > 0
      ? currentWeather.forecast.slice(0, 7).map((item) => ({
          day: new Date(item.time).toLocaleDateString('id-ID', {
            weekday: 'short',
          }),
          temp: item.temperature !== null ? `${formatNumber(item.temperature)}` : '-',
          condition: item.weather,
          icon: getIconFromCondition(item.weather),
        }))
      : fallbackForecastData

  const realtimeRainfallChart =
    currentWeather.forecast.length > 0
      ? currentWeather.forecast.slice(0, 7).map((item) => ({
          day: new Date(item.time).toLocaleDateString('id-ID', {
            weekday: 'short',
          }),
          curah: item.rainfall ?? 0,
        }))
      : fallbackRainfallChart

  const weatherWarning =
    currentWeather.rainfall !== null && currentWeather.rainfall >= 10
      ? 'Curah hujan cukup tinggi terdeteksi. Petani disarankan memeriksa sistem drainase, menghindari pemupukan langsung sebelum hujan, dan memantau potensi genangan di lahan.'
      : 'Pantau kondisi cuaca harian sebelum melakukan pemupukan, penyemprotan pestisida, dan pengairan. Gunakan data ini sebagai referensi awal, bukan satu-satunya keputusan lapangan.'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Cuaca & Kondisi Pertanian
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Informasi cuaca terbaru dan rekomendasi musim tanam
        </p>
      </div>

      {/* Current Conditions Hero */}
      <Card className="mb-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lokasi: {currentWeather.location}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Update terakhir:{' '}
              {new Date(currentWeather.updatedAt).toLocaleString('id-ID')}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
            Sumber: {currentWeather.source}
          </span>
        </div>

        {loading && (
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Memuat data cuaca terbaru...
          </p>
        )}

        {error && (
          <p className="mb-4 text-sm text-amber-600 dark:text-amber-400">
            {error} Menampilkan data demo sementara.
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <CloudRain className="w-12 h-12 text-blue-400 mb-2" />
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {formatNumber(currentWeather.temperature)}°C
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {currentWeather.weather}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <Thermometer className="w-6 h-6 text-red-400 mb-2" />
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatNumber(currentWeather.temperature)}°C
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Suhu</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <Droplets className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatNumber(currentWeather.humidity)}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Kelembaban</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <CloudRain className="w-6 h-6 text-indigo-400 mb-2" />
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatNumber(currentWeather.rainfall)}mm
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Curah Hujan</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <Wind className="w-6 h-6 text-emerald-400 mb-2" />
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatNumber(currentWeather.windSpeed)} km/h
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Kec. Angin</p>
          </div>
        </div>
      </Card>

      {/* Weather Alert */}
      <div className="mb-8 p-4 rounded-2xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-300">
              Peringatan Cuaca
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
              {weatherWarning}
            </p>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Prakiraan Cuaca
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {realtimeForecastData.map((day, index) => (
            <div
              key={`${day.day}-${index}`}
              className="flex flex-col items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {day.day}
              </p>
              <div className="my-2">{getWeatherIcon(day.icon)}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {day.temp}°C
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 text-center">
                {day.condition}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Rainfall Chart */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Curah Hujan Prakiraan (mm)
        </h2>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={realtimeRainfallChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.75rem',
                  color: '#f9fafb',
                }}
              />
              <Bar dataKey="curah" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Farming Recommendations */}
      <div className="py-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Rekomendasi Bertani
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {farmingRecommendations.map((rec) => (
            <Card key={rec.title} className="hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <rec.icon className="w-5 h-5 text-emerald-500" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {rec.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {rec.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Seasonal Planting Calendar */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Kalender Musim Tanam
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Tanaman
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Bulan Tanam
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">
                  Musim
                </th>
              </tr>
            </thead>

            <tbody>
              {plantingCalendar.map((item) => (
                <tr
                  key={item.crop}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-3 px-2 text-gray-900 dark:text-white font-medium">
                    {item.crop}
                  </td>

                  <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                    {item.months}
                  </td>

                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.season === 'Musim Hujan'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : item.season === 'Musim Kemarau'
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {item.season}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  )
}
