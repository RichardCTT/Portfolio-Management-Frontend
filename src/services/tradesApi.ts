import http from '@/lib/http'
import type { Transaction } from './portfolioApi'

export interface ResponseData {
  code: number
  message: string
}

export interface Asset {
  asset_type_id: number
  average_position_price: number
  code: string
  create_date: string
  current_price: number
  description: string
  id: number
  name: string
  price_change_percentage: number | null
  quantity: number
}

export interface AssetsResponseData extends ResponseData {
  data: {
    items: Asset[]
    total: number
    page: number
    page_size: number
  }
}

export const getAssetsAPI = (currentPage: number, pageSize: number) => {
  return http<never, AssetsResponseData>({
    url: `/assets?page=${currentPage}&page_size=${pageSize}`,
    method: 'GET',
  })
}

export interface BuyTransactionResponseData extends ResponseData {
  data: {
    transaction: Transaction
    total_cost: number
    remaining_cash: number
  }
}

export interface SellTransactionResponseData extends ResponseData {
  data: {
    transaction: Transaction
    total_received: number
    new_cash_balance: number
  }
}

export interface TradeTransactionFormData {
  asset_id: number
  quantity: number
  date: string
  description: string
}

export const tradeTransactionAPI = (
  direction: string,
  formData: TradeTransactionFormData
) => {
  if (direction === 'buy') {
    return http<never, BuyTransactionResponseData>({
      url: `/transactions/${direction}`,
      method: 'POST',
      data: formData,
    })
  } else {
    return http<never, SellTransactionResponseData>({
      url: `/transactions/${direction}`,
      method: 'POST',
      data: formData,
    })
  }
}
