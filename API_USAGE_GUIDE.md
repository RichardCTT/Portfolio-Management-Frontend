# 如何使用生成的 API

恭喜！您已经成功从 Swagger 文档生成了 TypeScript API 客户端。以下是如何使用这些生成的 API 的完整指南。

## 🚀 快速开始

### 1. 生成的文件结构
```
src/generated/api/
├── api/                  # API 类文件
│   ├── assets-api.ts        # 资产相关 API
│   ├── asset-types-api.ts   # 资产类型 API  
│   ├── transactions-api.ts  # 交易 API
│   ├── price-daily-api.ts   # 价格数据 API
│   └── asset-analysis-api.ts # 分析 API
├── models/               # 类型定义文件
│   ├── api-assets-get-200-response.ts
│   ├── asset-type-response-data-summary.ts
│   └── ...              # 其他类型文件
├── index.ts             # 统一导出文件
└── configuration.ts     # API 配置文件
```

### 2. 基本用法示例

```typescript
// 导入需要的 API 类和配置
import { AssetsApi, Configuration } from '@/generated/api'

// 创建配置
const config = new Configuration({
  basePath: 'http://localhost:3000'
})

// 创建 API 实例
const assetsApi = new AssetsApi(config)

// 使用 API
const fetchAssets = async () => {
  try {
    const response = await assetsApi.apiAssetsGet({
      page: 1,
      pageSize: 10,
      assetTypeId: 1 // 股票类型
    })
    console.log('Assets:', response.data)
  } catch (error) {
    console.error('API Error:', error)
  }
}
```

## 📝 实际应用示例

### 在 React Hook 中使用

```typescript
import { useState, useEffect } from 'react'
import { AssetsApi, Configuration } from '@/generated/api'

export function useAssets() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(false)

  const assetsApi = new AssetsApi(new Configuration({
    basePath: 'http://localhost:3000'
  }))

  const fetchAssets = async () => {
    setLoading(true)
    try {
      const response = await assetsApi.apiAssetsGet({})
      setAssets(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch assets:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssets()
  }, [])

  return { assets, loading, refetch: fetchAssets }
}
```

### 在组件中使用

```typescript
import { useAssets } from './hooks/useAssets'

export function StockPage() {
  const { assets, loading } = useAssets()

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>My Assets</h1>
      {assets.map(asset => (
        <div key={asset.id}>
          <h3>{asset.name}</h3>
          <p>Ticker: {asset.ticker}</p>
        </div>
      ))}
    </div>
  )
}
```

## 🔧 常用 API 操作

### 获取数据
```typescript
// 获取所有资产
const assets = await assetsApi.apiAssetsGet({ page: 1, pageSize: 20 })

// 获取单个资产
const asset = await assetsApi.apiAssetsIdGet({ id: 123 })

// 获取资产类型汇总
const summary = await assetTypesApi.apiAssetTypesGet({})
```

### 创建和更新
```typescript
// 创建新资产
const newAsset = await assetsApi.apiAssetsPost({
  apiAssetsPostRequest: {
    name: 'Apple Inc.',
    ticker: 'AAPL',
    assetTypeId: 1,
    quantity: 10
  }
})

// 更新资产
const updatedAsset = await assetsApi.apiAssetsIdPut({
  id: 123,
  apiAssetsIdPutRequest: {
    quantity: 15
  }
})
```

### 删除数据
```typescript
// 删除资产
await assetsApi.apiAssetsIdDelete({ id: 123 })
```

## 🎯 集成到现有代码

### 更新 Zustand Store

```typescript
// src/store/portfolioStore.ts
import { create } from 'zustand'
import { AssetsApi, Configuration } from '@/generated/api'

const assetsApi = new AssetsApi(new Configuration({
  basePath: process.env.VITE_API_BASE_URL || 'http://localhost:3000'
}))

interface PortfolioState {
  assets: any[]
  loading: boolean
  fetch: () => Promise<void>
  add: (asset: any) => Promise<void>
  remove: (id: number) => Promise<void>
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  assets: [],
  loading: false,
  
  fetch: async () => {
    set({ loading: true })
    try {
      const response = await assetsApi.apiAssetsGet({})
      set({ assets: response.data.data || [] })
    } catch (error) {
      console.error('Failed to fetch assets:', error)
    } finally {
      set({ loading: false })
    }
  },

  add: async (assetData) => {
    await assetsApi.apiAssetsPost({ apiAssetsPostRequest: assetData })
    get().fetch() // 重新获取数据
  },

  remove: async (id) => {
    await assetsApi.apiAssetsIdDelete({ id })
    get().fetch() // 重新获取数据
  }
}))
```

## 🔄 重新生成 API

当后端 API 更新时，重新生成客户端：

```bash
# 清理并重新生成
pnpm generate-api:clean

# 或者只是重新生成
pnpm generate-api
```

## 💡 最佳实践

1. **错误处理**: 始终包装 API 调用在 try-catch 中
2. **类型安全**: 使用生成的 TypeScript 类型
3. **配置管理**: 使用环境变量管理 API 基础 URL
4. **缓存**: 考虑使用 React Query 或 SWR 进行数据缓存
5. **认证**: 在 Configuration 中添加认证 token

## 🎉 您现在可以：

- ✅ 使用类型安全的 API 调用
- ✅ 自动补全和 IntelliSense 支持  
- ✅ 自动生成的文档和类型
- ✅ 与后端 API 保持同步

开始在您的组件中使用这些 API 吧！
