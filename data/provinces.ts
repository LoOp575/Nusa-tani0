export interface Province {
  id: string
  name: string
  ppiPadi: number
  prodJagung: number
  luasLahan: number
  produktivitas: number
  trend: 'up' | 'down' | 'stable'
  changePercent: number
  mainCommodity: string
}

export const provinces: Province[] = [
  {
    id: 'jawa-barat',
    name: 'Jawa Barat',
    ppiPadi: 12500000,
    prodJagung: 2800000,
    luasLahan: 1200000,
    produktivitas: 5.8,
    trend: 'up',
    changePercent: 4.8,
    mainCommodity: 'Padi / Gabah',
  },
  {
    id: 'jawa-tengah',
    name: 'Jawa Tengah',
    ppiPadi: 11200000,
    prodJagung: 3500000,
    luasLahan: 1100000,
    produktivitas: 5.6,
    trend: 'stable',
    changePercent: 1.2,
    mainCommodity: 'Padi / Gabah',
  },
  {
    id: 'jawa-timur',
    name: 'Jawa Timur',
    ppiPadi: 13100000,
    prodJagung: 6200000,
    luasLahan: 1300000,
    produktivitas: 5.9,
    trend: 'up',
    changePercent: 5.6,
    mainCommodity: 'Padi & Jagung',
  },
  {
    id: 'ntb',
    name: 'Nusa Tenggara Barat',
    ppiPadi: 2400000,
    prodJagung: 1100000,
    luasLahan: 400000,
    produktivitas: 5.2,
    trend: 'down',
    changePercent: -2.4,
    mainCommodity: 'Jagung',
  },
  {
    id: 'sumatera-barat',
    name: 'Sumatera Barat',
    ppiPadi: 2800000,
    prodJagung: 800000,
    luasLahan: 500000,
    produktivitas: 5.0,
    trend: 'up',
    changePercent: 3.1,
    mainCommodity: 'Padi / Gabah',
  },
]
