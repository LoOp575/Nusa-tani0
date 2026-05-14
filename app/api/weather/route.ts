import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const DEFAULT_LATITUDE = -6.2
const DEFAULT_LONGITUDE = 106.816666
const DEFAULT_LOCATION = 'Jakarta, Indonesia'

const weatherCodeMap: Record<number, string> = {
  0: 'Cerah',
  1: 'Cerah Berawan',
  2: 'Berawan Sebagian',
  3: 'Berawan',
  45: 'Berkabut',
  48: 'Kabut Rime',
  51: 'Gerimis Ringan',
  53: 'Gerimis Sedang',
  55: 'Gerimis Lebat',
  61: 'Hujan Ringan',
  63: 'Hujan Sedang',
  65: 'Hujan Lebat',
  80: 'Hujan Lokal Ringan',
  81: 'Hujan Lokal Sedang',
  82: 'Hujan Lokal Lebat',
  95: 'Badai Petir',
  96: 'Badai Petir dengan Hujan Es',
  99: 'Badai Petir Ekstrem',
}

function buildRecommendations(rainfall: number, humidity: number, windSpeed: number) {
  const recommendations: string[] = []

  if (rainfall >= 10) {
    recommendations.push('Curah hujan tinggi. Tunda pemupukan agar nutrisi tidak tercuci air hujan.')
    recommendations.push('Periksa drainase sawah dan lahan palawija untuk mencegah genangan berlebih.')
  } else if (rainfall >= 2) {
    recommendations.push('Ada potensi hujan. Pemupukan sebaiknya dilakukan setelah hujan reda.')
  } else {
    recommendations.push('Curah hujan rendah. Cek kelembapan tanah dan pertimbangkan irigasi ringan.')
  }

  if (humidity >= 80) {
    recommendations.push('Kelembapan tinggi. Pantau risiko jamur dan penyakit daun pada tanaman.')
  }

  if (windSpeed >= 25) {
    recommendations.push('Angin cukup kencang. Hindari penyemprotan pestisida agar tidak banyak terbuang.')
  }

  if (recommendations.length < 3) {
    recommendations.push('Pantau kondisi tanaman harian dan sesuaikan jadwal tanam dengan perubahan cuaca.')
  }

  return recommendations.slice(0, 3)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const latitude = Number(searchParams.get('lat')) || DEFAULT_LATITUDE
  const longitude = Number(searchParams.get('lon')) || DEFAULT_LONGITUDE
  const location = searchParams.get('location') || DEFAULT_LOCATION

  const endpoint = new URL('https://api.open-meteo.com/v1/forecast')
  endpoint.searchParams.set('latitude', String(latitude))
  endpoint.searchParams.set('longitude', String(longitude))
  endpoint.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m'
  )
  endpoint.searchParams.set('timezone', 'Asia/Jakarta')

  try {
    const response = await fetch(endpoint.toString(), {
      next: { revalidate: 900 },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const data = await response.json()
    const current = data.current || {}
    const temperature = Math.round(Number(current.temperature_2m ?? 0))
    const humidity = Math.round(Number(current.relative_humidity_2m ?? 0))
    const rainfall = Number(current.precipitation ?? current.rain ?? 0)
    const windSpeed = Math.round(Number(current.wind_speed_10m ?? 0))
    const weatherCode = Number(current.weather_code ?? 3)
    const condition = weatherCodeMap[weatherCode] || 'Cuaca Tidak Diketahui'

    return NextResponse.json({
      temperature,
      humidity,
      rainfall,
      windSpeed,
      condition,
      location,
      updatedAt: current.time || new Date().toISOString(),
      source: 'Open-Meteo',
      recommendations: buildRecommendations(rainfall, humidity, windSpeed),
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Gagal mengambil data cuaca realtime',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
