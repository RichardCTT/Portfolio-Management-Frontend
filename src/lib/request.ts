import { PortfolioAnalysisApi } from '@/lib/api'
import {
  Configuration,
  AnalysisApi,
  AssetsApi,
  TransactionsApi,
} from '@/lib/api/'

// 根据环境动态配置 basePath
const getBasePath = () => {
  if (import.meta.env.DEV) {
    // 开发环境使用代理
    return 'http://localhost:3000' // 确保与 http.ts 中的 baseURL 一致
  } else {
    // 生产环境使用实际 API 地址
    return 'https://your-production-api.com/api'
  }
}

// 全局 API 配置
const apiConfiguration = new Configuration({
  basePath: getBasePath(),
})

// 预配置的 API 实例 - 所有组件都可以直接使用
export const analysisApi = new AnalysisApi(apiConfiguration)
export const assetsApi = new AssetsApi(apiConfiguration)
export const transactionsApi = new TransactionsApi(apiConfiguration)
export const assetTypesApi = new AssetsApi(apiConfiguration) // 假设资产类型 API 也使用 AssetsApi
export const portfolioAnalysisApi = new PortfolioAnalysisApi(apiConfiguration)

// 如果需要自定义配置，也可以导出配置对象
export { apiConfiguration }

// 默认导出常用的 API
export default {
  analysis: analysisApi,
  assets: assetsApi,
  transactions: transactionsApi,
  portfolioAnalysisApi: portfolioAnalysisApi,
}
