export type AssetType = 'stock' | 'bond' | 'cash'

export interface PortfolioItem {
  id: number
  ticker: string
  type: AssetType
  quantity: number
  dateAdded: string
}
