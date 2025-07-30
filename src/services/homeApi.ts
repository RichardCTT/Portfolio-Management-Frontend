import http from '@/lib/http'

export interface ResponseData {
  code: number
  message: string
}

export interface SummaryResponseData extends ResponseData {
  data: {
    total_asset_value: number
    total_profit_loss: number
    today_profit_loss: number
    total_profit_loss_percentage: number
    today_profit_loss_percentage: number
  }
}

export const getSummaryAPI = () => {
  return http<never, SummaryResponseData>({
    url: `/main_page/summary`,
    method: 'GET',
  })
}

export interface AssetsByDateResponseData {
  success: boolean
  error?: string
  message?: string
  data?: {
    date: string
    totalValueUSD: number
    assetTypes: {
      cash: {
        count: number
        totalPrice: number
        percentage: number
        typeName: string
        unit: string
        assets: [
          {
            id: number
            name: string
            code: string
            quantity: number
            price: number
            valueUSD: number
            percentage: number
          },
        ]
      }
      stock: {
        count: number
        totalPrice: number
        percentage: number
        typeName: string
        unit: string
        assets: [
          {
            id: number
            name: string
            code: string
            quantity: number
            price: number
            valueUSD: number
            percentage: number
          },
        ]
      }
      bond: {
        count: number
        totalPrice: number
        percentage: number
        typeName: string
        unit: string
        assets: []
      }
      cryptocurrency: {
        count: number
        totalPrice: number
        percentage: number
        typeName: string
        unit: string
        assets: []
      }
      foreigncurrency: {
        count: number
        totalPrice: number
        percentage: number
        typeName: string
        unit: string
        assets: []
      }
      futures: {
        count: number
        totalPrice: number
        percentage: number
        typeName: string
        unit: string
        assets: []
      }
    }
    summary: {
      totalAssets: number
      totalValueUSD: number
    }
  }
}

export const getAssetsByDateAPI = () => {
  return http<never, AssetsByDateResponseData>({
    url: `/analysis/asset-totals-by-type`,
    method: 'GET',
  })
}

export interface AssetsHistoryResponseData extends ResponseData {
  data: {
    date: string
    total_asset_value: number
  }[]
}

export const getAssetsHistoryAPI = () => {
  return http<never, AssetsHistoryResponseData>({
    url: `/main_page/totalAssetsHistory`,
    method: 'GET',
  })
}
