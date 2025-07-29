import http from '@/lib/http'
import type { PortfolioItem } from '@/types/portfolio'

// 基础投资组合 API
export const getPortfolio = () => http.get<PortfolioItem[]>('/portfolio')
export const addItem = (item: Omit<PortfolioItem, 'id'>) =>
  http.post('/portfolio', item)
export const deleteItem = (id: number) => http.delete(`/portfolio/${id}`)
