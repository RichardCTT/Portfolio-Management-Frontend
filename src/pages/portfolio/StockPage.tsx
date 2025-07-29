import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react'
import { analysisApi } from '@/lib/request'

export default function StockPage() {

  const [totalStocks, setTotalStocks] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const [avgStockValue, setAvgStockValue] = useState(0)
  const [topStock, setTopStock] = useState('')

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await analysisApi.apiAnalysisAssetTotalsByTypeGet({
          date: new Date().toISOString().substring(0, 10), // 使用当前日期
        })
        console.log(response.data)
        // 处理 API 响应数据
        if (response.data.success && response.data.data) {
          const { assetTypes } = response.data.data
          console.log(assetTypes)

          // 获取股票相关数据
          const stockData = assetTypes?.stock
          
          if (stockData) {
            // 设置股票总数
            setTotalStocks(stockData.count || 0)
            
            // 设置股票总价值
            setTotalValue(stockData.totalPrice || 0)
            
            // 计算平均股票价值
            const avgValue = stockData.count && stockData.count > 0 
              ? (stockData.totalPrice || 0) / stockData.count 
              : 0
            setAvgStockValue(avgValue)
            
            // 获取最大持仓股票 (如果有assets数组的话)
            if (stockData.assets && stockData.assets.length > 0) {
              // 假设按价值排序，取第一个作为最大持仓
              const topStockAsset = stockData.assets[0]
              setTopStock(topStockAsset.code || topStockAsset.name || 'N/A')
            } else {
              setTopStock('N/A')
            }
          } else {
            // 如果没有股票数据，设置默认值
            setTotalStocks(0)
            setTotalValue(0)
            setAvgStockValue(0)
            setTopStock('N/A')
          }
        }
      } catch (error) {
        console.error('Failed to fetch stock data:', error)
        // 设置默认值
        setTotalStocks(0)
        setTotalValue(0)
        setAvgStockValue(0)
        setTopStock('N/A')
      }
    }
    fetchStockData()
  }, [])



  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Stock Portfolio</h1>

      {/* Four cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total stocks */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              Total Holdings
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{totalStocks}</div>
            <CardDescription className="text-blue-600">
              Different stocks
            </CardDescription>
          </CardContent>
        </Card>

        {/* Card 2: Total value */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Total Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              ${totalValue.toLocaleString()}
            </div>
            <CardDescription className="text-green-600">
              Current valuation
            </CardDescription>
          </CardContent>
        </Card>

        {/* Card 3: Average stock value */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">
              Average Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              ${avgStockValue.toLocaleString()}
            </div>
            <CardDescription className="text-purple-600">
              Per stock average
            </CardDescription>
          </CardContent>
        </Card>

        {/* Card 4: Top stock */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">
              Top Stock
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{topStock}</div>
            <CardDescription className="text-orange-600">
              Largest holding
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Stock list table area */}
      {/* <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Stock Details</h2>
        {stockItems.length > 0 ? (
          <div className="text-gray-600">
            Stock list will be displayed here...
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No stock investments found
          </div>
        )}
      </div> */}
    </div>
  )
}
