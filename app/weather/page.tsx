'use client'

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
import { weatherData } from '@/data/weather'

const forecastData = [
  { day: 'Senin', temp: '27-31', condition: 'Cerah', icon: 'sun' },
  { day: 'Selasa', temp: '26-30', condition: 'Berawan', icon: 'cloud' },
  { day: 'Rabu', temp: '26-29', condition: 'Hujan Ringan', icon: 'rain' },
  { day: 'Kamis', temp: '27-30', condition: 'Berawan', icon: 'cloud' },
  { day: 'Jumat', temp: '28-31', condition: 'Cerah', icon: 'sun' },
  { day: 'Sabtu', temp: '26-28', condition: 'Hujan Ringan', icon: 'rain' },
  { day: 'Minggu', temp: '27-30', condition: 'Berawan', icon: 'cloud' },
]

const rainfallChart = [
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
    description: 'Dengan kelembaban tanah yang tinggi, ini waktu yang tepat untuk menanam padi sawah. Pastikan drainase lahan sudah disiapkan dengan baik.',
    icon: Sprout,
  },
  {
    title: 'Tunda Pemupukan',
    description: 'Hindari pemupukan saat curah hujan tinggi untuk mencegah pencucian nutrisi. Tunggu 1-2 hari setelah hujan reda.',
    icon: Droplets,
  },
  {
    title: 'Waspadai Hama',
    description: 'Kelembaban tinggi meningkatkan risiko serangan hama wereng dan penyakit blast. Lakukan monitoring rutin setiap 3 hari.',
    icon: AlertTriangle,
  },
  {
    title: 'Siapkan Irigasi Cadangan',
    description: 'Meskipun sedang musim hujan, siapkan sistem irigasi untuk periode kering mendadak yang bisa terjadi di pertengahan musim.',
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

export default function WeatherPage() {
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
          Informasi cuaca realtime dan rekomendasi musim tanam
        </p>
      </div>

      {/* Current Conditions Hero */}
      <Card className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <CloudRain className="w-12 h-12 text-blue-400 mb-2" />
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {weatherData.temperature}°C
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {weatherData.condition}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <Thermometer className="w-6 h-6 text-red-400 mb-2" />
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {weatherData.temperature}°C
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Suhu</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <Droplets className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {weatherData.humidity}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Kelembaban</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <CloudRain className="w-6 h-6 text-indigo-400 mb-2" />
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {weatherData.rainfall}mm
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Curah Hujan</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <Wind className="w-6 h-6 text-emerald-400 mb-2" />
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {weatherData.windSpeed} km/h
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
              Curah hujan tinggi diprediksi berlangsung minggu ini (120-150mm). Petani di wilayah
              dataran rendah Jawa Barat dan Jawa Tengah disarankan memeriksa sistem drainase dan
              menunda kegiatan pemupukan. Potensi banjir lokal di beberapa kabupaten.
            </p>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Prakiraan 7 Hari
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {forecastData.map((day) => (
            <div
              key={day.day}
              className="flex flex-col items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {day.day}
              </p>
              <div className="my-2">{getWeatherIcon(day.icon)}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{day.temp}°C</p>
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
          Curah Hujan Harian (mm)
        </h2>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rainfallChart}>
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
