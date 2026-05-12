export interface Commodity {
  id: string
  name: string
  price: number
  change: number
  history: number[]
  unit: string
  icon: string
}

export const commodities: Commodity[] = [
  {
    id: 'gabah',
    name: 'Gabah',
    price: 5200,
    change: 2.3,
    history: [4800, 4900, 5000, 5100, 5050, 5150, 5200],
    unit: 'Rp/kg',
    icon: 'Wheat',
  },
  {
    id: 'jagung',
    name: 'Jagung',
    price: 4800,
    change: 1.8,
    history: [4500, 4600, 4550, 4700, 4750, 4800, 4800],
    unit: 'Rp/kg',
    icon: 'Corn',
  },
  {
    id: 'singkong',
    name: 'Singkong',
    price: 2100,
    change: -0.5,
    history: [2200, 2150, 2180, 2100, 2050, 2080, 2100],
    unit: 'Rp/kg',
    icon: 'Carrot',
  },
  {
    id: 'cabai',
    name: 'Cabai',
    price: 45000,
    change: 5.2,
    history: [38000, 40000, 42000, 41000, 43000, 44000, 45000],
    unit: 'Rp/kg',
    icon: 'Flame',
  },
  {
    id: 'jahe',
    name: 'Jahe',
    price: 32000,
    change: 3.1,
    history: [28000, 29000, 30000, 31000, 30500, 31500, 32000],
    unit: 'Rp/kg',
    icon: 'Leaf',
  },
]
