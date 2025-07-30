import http from '@/lib/http'
import type { AssetType } from '@/types/portfolio'

export interface ResponseData {
  success: boolean
  error?: string
  message?: string
}

export interface Transaction {
  id: number
  asset_id: number
  asset_name: string
  asset_code: string
  asset_type_name: string
  transaction_type: string
  quantity: number
  price: number
  transaction_date: string
  holding: number
  description: string
}

export interface TransationsByTypeResponseData extends ResponseData {
  data: {
    asset_type_id: number
    asset_type_name: string
    date_range: {
      start_date: string
      end_date: string
    }
    total_transactions: number
    transactions: Transaction[]
    summary: {
      total_in_quantity: number
      total_out_quantity: number
      net_quantity: number
      total_in_value: number
      total_out_value: number
      net_value: number
    }
    pagination: {
      page: number
      limit: number
      total_pages: number
      has_next: boolean
      has_prev: boolean
    }
  }
}

const assetTypeMapping: { [key in AssetType]: number } = {
  stock: 2,
  bond: 3,
  cash: 1,
}

export const getTransationsByTypeAPI = (
  type: AssetType,
  currentPage: number,
  pageSize: number
) => {
  return http<never, TransationsByTypeResponseData>({
    url: `/portfolio/transactions-by-type/${assetTypeMapping[type]}?page=${currentPage}&limit=${pageSize}`,
    method: 'GET',
  })
}

function simulateDelay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

const mockGetTransationsByTypeResponse = {
  success: true,
  data: {
    asset_type_id: 2,
    asset_type_name: 'Stock',
    date_range: {
      start_date: '2025-07-01',
      end_date: '2025-07-31',
    },
    total_transactions: 5,
    transactions: [
      {
        id: 1,
        asset_id: 2,
        asset_name: 'Apple Inc.',
        asset_code: 'AAPL',
        asset_type_name: 'Stock',
        transaction_type: 'IN',
        quantity: 100,
        price: 150,
        transaction_date: '2025-07-15T10:30:00',
        holding: 100,
        description: 'Initial purchase',
      },
      {
        id: 2,
        asset_id: 3,
        asset_name: 'Microsoft Corporation',
        asset_code: 'MSFT',
        asset_type_name: 'Stock',
        transaction_type: 'IN',
        quantity: 50,
        price: 300,
        transaction_date: '2025-07-16T14:20:00',
        holding: 50,
        description: 'Stock purchase',
      },
      {
        id: 2,
        asset_id: 3,
        asset_name: 'Microsoft Corporation',
        asset_code: 'MSFT',
        asset_type_name: 'Stock',
        transaction_type: 'IN',
        quantity: 50,
        price: 300,
        transaction_date: '2025-07-16T14:20:00',
        holding: 50,
        description: 'Stock purchase',
      },
      {
        id: 2,
        asset_id: 3,
        asset_name: 'Microsoft Corporation',
        asset_code: 'MSFT',
        asset_type_name: 'Stock',
        transaction_type: 'IN',
        quantity: 50,
        price: 300,
        transaction_date: '2025-07-16T14:20:00',
        holding: 50,
        description: 'Stock purchase',
      },
      {
        id: 2,
        asset_id: 3,
        asset_name: 'Microsoft Corporation',
        asset_code: 'MSFT',
        asset_type_name: 'Stock',
        transaction_type: 'IN',
        quantity: 50,
        price: 300,
        transaction_date: '2025-07-16T14:20:00',
        holding: 50,
        description: 'Stock purchase',
      },
      {
        id: 2,
        asset_id: 3,
        asset_name: 'Microsoft Corporation',
        asset_code: 'MSFT',
        asset_type_name: 'Stock',
        transaction_type: 'IN',
        quantity: 50,
        price: 300,
        transaction_date: '2025-07-16T14:20:00',
        holding: 50,
        description: 'Stock purchase',
      },
      {
        id: 2,
        asset_id: 3,
        asset_name: 'Microsoft Corporation',
        asset_code: 'MSFT',
        asset_type_name: 'Stock',
        transaction_type: 'IN',
        quantity: 50,
        price: 300,
        transaction_date: '2025-07-16T14:20:00',
        holding: 50,
        description: 'Stock purchase',
      },
      {
        id: 2,
        asset_id: 3,
        asset_name: 'Microsoft Corporation',
        asset_code: 'MSFT',
        asset_type_name: 'Stock',
        transaction_type: 'IN',
        quantity: 50,
        price: 300,
        transaction_date: '2025-07-16T14:20:00',
        holding: 50,
        description: 'Stock purchase',
      },
      {
        id: 2,
        asset_id: 3,
        asset_name: 'Microsoft Corporation',
        asset_code: 'MSFT',
        asset_type_name: 'Stock',
        transaction_type: 'IN',
        quantity: 50,
        price: 300,
        transaction_date: '2025-07-16T14:20:00',
        holding: 50,
        description: 'Stock purchase',
      },
      {
        id: 2,
        asset_id: 3,
        asset_name: 'Microsoft Corporation',
        asset_code: 'MSFT',
        asset_type_name: 'Stock',
        transaction_type: 'IN',
        quantity: 50,
        price: 300,
        transaction_date: '2025-07-16T14:20:00',
        holding: 50,
        description: 'Stock purchase',
      },
    ],
    summary: {
      total_in_quantity: 150,
      total_out_quantity: 0,
      net_quantity: 150,
      total_in_value: 30000,
      total_out_value: 0,
      net_value: 30000,
    },
    pagination: {
      page: 1,
      limit: 10,
      total_pages: 1,
      has_next: false,
      has_prev: false,
    },
  },
}

export const mockGetTransationsByTypeAPI = (
  type: AssetType,
  currentPage: number,
  pageSize: number
) => {
  return simulateDelay(mockGetTransationsByTypeResponse)
}
