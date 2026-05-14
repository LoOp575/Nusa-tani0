import { NextResponse } from 'next/server'

type WeatherResponse = {
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
  source: 'Open-Meteo'
  updatedAt: string
}

function weatherCodeToText(code: number | null | undefined): string {
  const map: Record<number, string> = {
    0: 'Cerah',
    1: 'Cerah berawan',
    2: 'Berawan sebagian',
    3: 'Berawan',
    45: 'Berkabut',
    48: 'Kabut rime',
    51: 'Gerimis ringan',
    53: 'Gerimis sedang',
    55: 'Gerimis lebat',
    56: 'Gerimis beku ringan',
    57: 'Gerimis beku lebat',
    61: 'Hujan ringan',
    63: 'Hujan sedang',
    65: 'Hujan lebat',
    66: 'Hujan beku ringan',
    67: 'Hujan beku lebat',
    71: 'Salju ringan',
    73: 'Salju sedang',
    75: 'Salju lebat',
    77: 'Butiran salju',
    80: 'Hujan lokal ringan',
    81: 'Hujan lokal sedang',
    82: 'Hujan lokal lebat',
    85: 'Hujan salju ringan',
    86: 'Hujan salju lebat',
    95: 'Badai petir',
    96: 'Badai petir dengan hujan es ringan',
    99: 'Badai petir dengan hujan es lebat',
  }

  if (code === null || code === undefined) return 'Tidak diketahui'
  return map[code] ?? 'Tidak diketahui'
}

function toNumber(value: unknown): number | null {
  if (typeof value !== 'number') return null
  if (Number.isNaN(value)) return null
  return value
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const lat = searchParams.get('lat') ?? '-6.1593'
  const lon = searchParams.get('lon') ?? '107.2981'
  const location = searchParams.get('location') ?? 'Rengasdengklok'

  const url =
    'https://api.open-meteo.com/v1/forecast' +
    `?latitude=${encodeURIComponent(lat)}` +
    `&longitude=${encodeURIComponent(lon)}` +
    '&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m' +
    '&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code' +
    '&timezone=Asia%2FJakarta'

  try {
    const res = await fetch(url, {
      next: { revalidate: 1800 },
    })

    if (!res.ok) {
      return NextResponse.json(
        {
          error: 'Gagal mengambil data cuaca dari Open-Meteo',
        },
        { status: 500 }
      )
    }

    const data = await res.json()

    const current = data.current ?? {}
    const hourly = data.hourly ?? {}

    const times: string[] = Array.isArray(hourly.time) ? hourly.time : []

    const forecast = times.slice(0, 24).map((time, index) => {
      const code = hourly.weather_code?.[index]

      return {
        time,
        temperature: toNumber(hourly.temperature_2m?.[index]),
        humidity: toNumber(hourly.relative_humidity_2m?.[index]),
        weather: weatherCodeToText(code),
        rainProbability: toNumber(hourly.precipitation_probability?.[index]),
        rainfall: toNumber(hourly.precipitation?.[index]),
      }
    })

    const result: WeatherResponse = {
      location,
      temperature: toNumber(current.temperature_2m),
      humidity: toNumber(current.relative_humidity_2m),
      weather: weatherCodeToText(current.weather_code),
      windSpeed: toNumber(current.wind_speed_10m),
      rainfall: toNumber(current.rain ?? current.precipitation),
      forecast,
      source: 'Open-Meteo',
      updatedAt: current.time ?? new Date().toISOString(),
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json(
      {
        error: 'Server error saat mengambil data cuaca',
      },
      { status: 500 }
    )
  }
}
