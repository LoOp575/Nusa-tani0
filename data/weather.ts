export interface WeatherData {
  temperature: number
  humidity: number
  rainfall: number
  windSpeed: number
  condition: string
  recommendations: string[]
}

export const weatherData: WeatherData = {
  temperature: 28,
  humidity: 78,
  rainfall: 120,
  windSpeed: 12,
  condition: 'Hujan Ringan',
  recommendations: [
    'Tunda pemupukan hingga hujan reda untuk menghindari pencucian nutrisi',
    'Waktu ideal untuk menanam padi sawah karena kelembaban tanah optimal',
    'Periksa drainase lahan untuk mencegah genangan air berlebih pada tanaman palawija',
  ],
}
