import type { PortfolioItem } from '@/types/portfolio'

let mockData: PortfolioItem[] = [
  {
    id: 1,
    ticker: 'AAPL',
    type: 'stock',
    quantity: 10,
    dateAdded: '2025-07-28',
  },
  {
    id: 2,
    ticker: 'TSLA',
    type: 'stock',
    quantity: 5,
    dateAdded: '2025-07-27',
  },
  {
    id: 3,
    ticker: 'USD',
    type: 'cash',
    quantity: 1000,
    dateAdded: '2025-07-26',
  },
]

let nextId = 4

function simulateDelay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export const getPortfolio = async () => {
  return simulateDelay(mockData)
}

export const addItem = async (item: Omit<PortfolioItem, 'id'>) => {
  const newItem: PortfolioItem = { ...item, id: nextId++ }
  mockData.push(newItem)
  return simulateDelay(newItem)
}

export const deleteItem = async (id: number) => {
  mockData = mockData.filter((item) => item.id !== id)
  return simulateDelay(true)
}
