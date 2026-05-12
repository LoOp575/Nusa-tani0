export interface Stat {
  label: string
  value: number
  unit: string
  change: number
}

export const nationalStats: Stat[] = [
  {
    label: 'Produksi Gabah Nasional',
    value: 54600000,
    unit: 'Ton',
    change: 2.1,
  },
  {
    label: 'Produksi Jagung',
    value: 22500000,
    unit: 'Ton',
    change: 3.4,
  },
  {
    label: 'Produksi Singkong',
    value: 18300000,
    unit: 'Ton',
    change: -1.2,
  },
  {
    label: 'Total Provinsi Aktif',
    value: 34,
    unit: 'Provinsi',
    change: 0,
  },
]
