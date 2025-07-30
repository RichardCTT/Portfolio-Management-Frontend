import { create } from 'zustand'
// import { getPortfolio, addItem, deleteItem } from '@/services/portfolioApi'
import { getPortfolio, addItem, deleteItem } from '@/services/mockPortfolioApi'
import type { PortfolioItem } from '@/types/portfolio'

interface State {
  items: PortfolioItem[]
  loading: boolean
  fetch: () => Promise<void>
  add: (item: Omit<PortfolioItem, 'id'>) => Promise<void>
  remove: (id: number) => Promise<void>
}

export const usePortfolioStore = create<State>(set => ({
  items: [],
  loading: false,
  fetch: async () => {
    set({ loading: true })
    try {
      // const res = await getPortfolio()
      // set({ items: res.data })
      const data = await getPortfolio()
      set({ items: data })
    } finally {
      set({ loading: false })
    }
  },
  add: async item => {
    await addItem(item)
    await usePortfolioStore.getState().fetch()
  },
  remove: async id => {
    await deleteItem(id)
    await usePortfolioStore.getState().fetch()
  },
}))
