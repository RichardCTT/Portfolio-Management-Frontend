import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import {
  analysisApi,
  assetsApi,
  transactionsApi,
  portfolioAnalysisApi,
} from '@/lib/request'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface Stock {
  name: string
  shares: number
  code: string
  quantity: number
  price: number
  marketValue: number
  color?: string
}

interface HoldingTableData {
  code: string
  name: string
  quantity: number
  currentPrice?: number
  average_position_price?: number
  marketValue: number
  priceChangeRate: number
  color: string
}

interface TransactionStock {
  id: number
  name: string
  code: string
  transaction_date: string
  transaction_type: string
  amount: number
  balance: number
  price: number
  stock?: string
  total?: number
  // 可以添加更多字段转换
}

const COLORS = [
  '#3b82f6',
  '#8b5cf6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#06b6d4',
  '#8b5a2b',
  '#ec4899',
  '#6366f1',
  '#84cc16',
  '#f97316',
  '#14b8a6',
]

export default function StockPage() {
  const [totalStocks, setTotalStocks] = useState<number>(0)
  const [totalMarketValue, setTotalMarketValue] = useState<number>(0)
  const [largestPosition, setLargestPosition] = useState<{
    name: string
    shares: number
  } | null>(null)
  const [stocks, setStocks] = useState<Stock[]>([])
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const [selectedStock, setSelectedStock] = useState<string>('all')
  const [selectedValueStock, setSelectedValueStock] = useState<string>('all')
  const [activeValueIndex, setActiveValueIndex] = useState<number | undefined>(
    undefined
  )

  // Pagination state for stock holdings table
  const [stockHoldTablePage, setStockHoldTablePage] = useState<number>(1)
  const [stockHoldTablePageSize, setStockHoldTablePageSize] =
    useState<number>(10)
  const [stockHoldTableTotal, setStockHoldTableTotal] = useState<number>(1)
  // State to hold stock holdings data for table
  const [holdingsData, setHoldingsData] = useState<HoldingTableData[]>([])

  // Pagination state for stock transactions table
  const [stockTransactionTablePage, setStockTransactionTablePage] =
    useState<number>(1)
  const [stockTransactionTablePageSize, setStockTransactionTablePageSize] =
    useState<number>(10)
  const [stockTransactionTableTotalPages, setStockTransactionTableTotalPages] =
    useState<number>(1)
  const [transactionData, setTransactionData] = useState<TransactionStock[]>([])

  // get total stocks, market value, and largest position
  const fetchStockData = async () => {
    try {
      const response = await analysisApi.apiAnalysisAssetTotalsByTypeGet()
      setTotalStocks(response.data.data?.assetTypes?.stock?.count || 0)
      setTotalMarketValue(
        response.data.data?.assetTypes?.stock?.totalPrice || 0
      )
      const stocksTmp: Stock[] =
        response.data.data?.assetTypes?.stock?.assets?.map((stock, index) => ({
          name: stock.name || 'Unknown',
          shares: stock.quantity || 0,
          code: stock.code || stock.name || 'N/A',
          quantity: stock.quantity || 0,
          price: stock.price || 0,
          marketValue: (stock.quantity || 0) * (stock.price || 0),
          color: COLORS[index % COLORS.length],
        })) || []
      setStocks(stocksTmp)

      // Find largest position by market value
      if (stocksTmp.length > 0) {
        const largest = stocksTmp.reduce((prev, current) =>
          prev.marketValue > current.marketValue ? prev : current
        )
        setLargestPosition({
          name: largest.name,
          shares: largest.shares,
        })
      }
    } catch (error) {
      console.error('Error fetching stock data:', error)
    }
  }

  // get hold stock data for table
  const fetchHoldingsData = async () => {
    try {
      const response = await assetsApi.apiAssetsGet({
        page: stockHoldTablePage,
        pageSize: stockHoldTablePageSize,
        assetTypeId: 2,
      })
      const holdings: HoldingTableData[] = (
        response.data.data?.items ?? []
      ).map((item: any, index: number) => ({
        name: item.name,
        code: item.code,
        quantity: item.quantity,
        currentPrice: item.current_price,
        priceChangeRate: item.price_change_percentage,
        average_position_price: item.average_position_price,
        marketValue: (item.quantity || 0) * (item.current_price || 0),
        color: COLORS[index % COLORS.length],
      }))
      setHoldingsData(holdings)
      setStockHoldTableTotal(
        Math.ceil((response.data.data?.total || 0) / stockHoldTablePageSize) ||
          1
      )
    } catch (error) {
      console.error('Error fetching holdings data:', error)
    }
  }

  useEffect(() => {
    fetchHoldingsData()
  }, [stockHoldTablePage, stockHoldTablePageSize])

  // get transaction data for table
  const fetchTransactionData = async () => {
    try {
      const response =
        await portfolioAnalysisApi.apiPortfolioTransactionsByTypeAssetTypeIdGet(
          {
            page: stockTransactionTablePage,
            limit: stockTransactionTablePageSize,
            assetTypeId: 2,
          }
        )

      const transactions: TransactionStock[] = (
        response.data.data?.transactions ?? []
      ).map((item: any) => ({
        name: item.asset_name,
        id: item.id,
        transaction_date: item.transaction_date,
        transaction_type: item.transaction_type,
        amount: item.quantity,
        balance: item.balance,
        price: item.price || 0,
        code: item.asset_code || 'N/A',
        total: Math.abs((item.quantity || 0) * (item.price || 0)),
      }))

      setTransactionData(transactions)
      setStockTransactionTableTotalPages(
        Math.ceil(
          (response.data.data?.total_transactions || 0) /
            stockTransactionTablePageSize
        ) || 1
      )
      console.log('Transaction data:', transactions)
    } catch (error) {
      console.error('Error fetching transaction data:', error)
    }
  }

  useEffect(() => {
    fetchTransactionData()
  }, [stockTransactionTablePage, stockTransactionTablePageSize])

  useEffect(() => {
    fetchStockData()
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/70 to-indigo-100/80 relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-400/10 to-transparent rounded-full blur-3xl" />
      
      <div className="relative space-y-8 p-8 max-w-7xl mx-auto">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 持有股票数量 */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Total Stocks</CardTitle>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-white"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="m22 21-3-3" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">
              {totalStocks.toLocaleString()}
            </div>
            <p className="text-xs text-blue-100">
              Different stocks held
            </p>
          </CardContent>
        </Card>

        {/* 总市值 */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-100">
              Total Market Value
            </CardTitle>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-white"
              >
                <path d="M12 2v20m9-2H3" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">
              ${totalMarketValue.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-100">
              Total portfolio value
            </p>
          </CardContent>
        </Card>

        {/* 当前持有最多的股票 */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">
              Largest Position
            </CardTitle>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-white"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">
              {largestPosition?.name || 'N/A'}
            </div>
            <p className="text-xs text-purple-100">
              {largestPosition ? `${largestPosition.shares} shares` : 'No data'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 饼状图卡片 - 并排显示 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 持仓量分布饼状图 */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Share Distribution
            </CardTitle>
            <div className="flex items-center gap-3">
              <Select value={selectedStock} onValueChange={setSelectedStock}>
                <SelectTrigger className="w-[200px] border-0 bg-white/70 shadow-md hover:shadow-lg transition-all duration-300">
                  <SelectValue placeholder="Select stock" />
                </SelectTrigger>
                <SelectContent className="border-0 shadow-xl">
                  <SelectItem value="all">All Stocks</SelectItem>
                  {stocks.map(stock => (
                    <SelectItem key={stock.code} value={stock.code}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full ring-2 ring-white shadow-sm"
                          style={{ backgroundColor: stock.color }}
                        />
                        {stock.name} ({stock.shares} shares)
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-white"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={380}>
                  <PieChart>
                    <Pie
                      data={stocks.map(stock => ({
                        name: stock.name,
                        value: stock.shares,
                        color: stock.color,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={140}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={3}
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(undefined)}
                    >
                      {stocks.map((stock, index) => {
                        const isSelected =
                          selectedStock !== 'all' &&
                          stock.code === selectedStock
                        const isHovered = activeIndex === index
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={stock.color}
                            stroke={isHovered ? '#000' : '#ffffff'}
                            strokeWidth={isHovered ? 4 : 3}
                            style={{
                              filter:
                                selectedStock !== 'all' && !isSelected
                                  ? 'opacity(0.3) drop-shadow(0 0 0 rgba(0,0,0,0.1))'
                                  : activeIndex !== undefined && !isHovered
                                    ? 'opacity(0.6) drop-shadow(0 0 0 rgba(0,0,0,0.1))'
                                    : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                              cursor: 'pointer',
                              transform: isSelected || isHovered ? 'scale(1.05)' : 'scale(1)',
                              transformOrigin: 'center',
                              transition: 'all 0.3s ease',
                            }}
                          />
                        )
                      })}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: string) => [
                        `${value} shares`,
                        name,
                      ]}
                      labelFormatter={() => ''}
                      labelStyle={{ color: '#000', fontWeight: '600' }}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 持仓市值分布饼状图 */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Value Distribution
            </CardTitle>
            <div className="flex items-center gap-3">
              <Select
                value={selectedValueStock}
                onValueChange={setSelectedValueStock}
              >
                <SelectTrigger className="w-[200px] border-0 bg-white/70 shadow-md hover:shadow-lg transition-all duration-300">
                  <SelectValue placeholder="Select stock" />
                </SelectTrigger>
                <SelectContent className="border-0 shadow-xl">
                  <SelectItem value="all">All Stocks</SelectItem>
                  {stocks.map(stock => (
                    <SelectItem key={stock.code} value={stock.code}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full ring-2 ring-white shadow-sm"
                          style={{ backgroundColor: stock.color }}
                        />
                        {stock.name} (${stock.marketValue.toLocaleString()})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-white"
                >
                  <path d="M12 2v20m9-2H3" />
                </svg>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={380}>
                  <PieChart>
                    <Pie
                      data={stocks.map(stock => ({
                        name: stock.name,
                        value: stock.marketValue,
                        color: stock.color,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={140}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={3}
                      onMouseEnter={(_, index) => setActiveValueIndex(index)}
                      onMouseLeave={() => setActiveValueIndex(undefined)}
                    >
                      {stocks.map((stock, index) => {
                        const isSelected =
                          selectedValueStock !== 'all' &&
                          stock.code === selectedValueStock
                        const isHovered = activeValueIndex === index
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={stock.color}
                            stroke={isHovered ? '#000' : '#ffffff'}
                            strokeWidth={isHovered ? 4 : 3}
                            style={{
                              filter:
                                selectedValueStock !== 'all' && !isSelected
                                  ? 'opacity(0.3) drop-shadow(0 0 0 rgba(0,0,0,0.1))'
                                  : activeValueIndex !== undefined && !isHovered
                                    ? 'opacity(0.6) drop-shadow(0 0 0 rgba(0,0,0,0.1))'
                                    : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                              cursor: 'pointer',
                              transform: isSelected || isHovered ? 'scale(1.05)' : 'scale(1)',
                              transformOrigin: 'center',
                              transition: 'all 0.3s ease',
                            }}
                          />
                        )
                      })}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: string) => [
                        `$${value.toLocaleString()}`,
                        name,
                      ]}
                      labelFormatter={() => ''}
                      labelStyle={{ color: '#000', fontWeight: '600' }}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 数据表格区域 */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Stock Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="holdings" className="w-full">
            <div className="px-8 pt-6">
              <TabsList className="grid w-full grid-cols-2 bg-white/70 border border-gray-200 shadow-md rounded-lg p-1">
                <TabsTrigger 
                  value="holdings" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                  >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                  Holdings
                </TabsTrigger>
                <TabsTrigger 
                  value="transactions" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M3 6h18l-2 13H5L3 6z" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Transactions
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="holdings" className="p-8 pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Holdings Portfolio</h3>
                  <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    Total: {holdingsData.length} stocks
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
                  <Table>
                    <TableHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
                      <TableRow className="border-b border-gray-200">
                        <TableHead className="font-semibold text-gray-700 py-4">Stock</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Code</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-right">Quantity</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-right">Current Price</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-right">Avg. Price</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-right">Market Value</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-right">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {holdingsData.map(holding => (
                        <TableRow 
                          key={holding.code} 
                          className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300"
                        >
                          <TableCell className="font-medium py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-4 h-4 rounded-full ring-2 ring-white shadow-sm"
                                style={{ backgroundColor: holding.color }}
                              ></div>
                              <span className="text-gray-800">{holding.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono font-medium text-blue-600 py-4">{holding.code}</TableCell>
                          <TableCell className="text-right py-4">{holding.quantity}</TableCell>
                          <TableCell className="text-right py-4">${(holding.currentPrice || 0).toFixed(2)}</TableCell>
                          <TableCell className="text-right py-4">${holding.average_position_price}</TableCell>
                          <TableCell className="text-right font-semibold text-gray-800 py-4">
                            ${holding.marketValue.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right py-4">
                            <div className="flex items-center justify-end gap-1">
                              {holding.priceChangeRate > 0 ? (
                                <>
                                  <TrendingUp className="w-4 h-4 text-green-500" />
                                  <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md">
                                    +{holding.priceChangeRate.toFixed(2)}%
                                  </span>
                                </>
                              ) : holding.priceChangeRate < 0 ? (
                                <>
                                  <TrendingDown className="w-4 h-4 text-red-500" />
                                  <span className="text-red-600 font-medium bg-red-50 px-2 py-1 rounded-md">
                                    {holding.priceChangeRate.toFixed(2)}%
                                  </span>
                                </>
                              ) : (
                                <span className="text-gray-600 font-medium bg-gray-50 px-2 py-1 rounded-md">
                                  {holding.priceChangeRate.toFixed(2)}%
                                </span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Holdings分页控件 */}
                <div className="flex items-center justify-between space-x-2 py-4 bg-gray-50/50 rounded-lg px-4">
                  <div className="flex items-center space-x-3">
                    <p className="text-sm font-medium text-gray-700">Rows per page</p>
                    <Select
                      value={stockHoldTablePageSize.toString()}
                      onValueChange={value => {
                        setStockHoldTablePageSize(Number(value))
                        setStockHoldTablePage(1) // 重置到第一页
                      }}
                    >
                      <SelectTrigger className="h-9 w-[80px] border-0 bg-white shadow-md">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent side="top" className="border-0 shadow-xl">
                        {[5, 10, 20, 30, 50].map(pageSize => (
                          <SelectItem key={pageSize} value={pageSize.toString()}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-4">
                    <p className="text-sm font-medium text-gray-700">
                      Page {stockHoldTablePage} of {stockHoldTableTotal}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setStockHoldTablePage(
                            Math.max(1, stockHoldTablePage - 1)
                          )
                        }
                        disabled={stockHoldTablePage <= 1}
                        className="border-0 bg-white shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setStockHoldTablePage(
                            Math.min(stockHoldTableTotal, stockHoldTablePage + 1)
                          )
                        }
                        disabled={stockHoldTablePage >= stockHoldTableTotal}
                        className="border-0 bg-white shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="p-8 pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Transaction History</h3>
                  <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    Total: {transactionData.length} transactions
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
                  <Table>
                    <TableHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
                      <TableRow className="border-b border-gray-200">
                        <TableHead className="font-semibold text-gray-700 py-4">Date</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Type</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Stock</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Code</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-right">Quantity</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-right">Price</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactionData.map(transaction => (
                        <TableRow 
                          key={transaction.id} 
                          className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-green-50/50 transition-all duration-300"
                        >
                          <TableCell className="py-4 text-gray-700">
                            {new Date(
                              transaction.transaction_date
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                                transaction.transaction_type === 'IN'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {transaction.transaction_type === 'IN'
                                ? 'Buy'
                                : 'Sell'}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium text-gray-800 py-4">
                            {transaction.name || 'Unknown'}
                          </TableCell>
                          <TableCell className="font-mono font-medium text-blue-600 py-4">
                            {transaction.code || 'N/A'}
                          </TableCell>
                          <TableCell className="text-right py-4">
                            {Math.abs(transaction.amount).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right py-4">
                            ${transaction.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right py-4">
                            <div className="flex items-center justify-end gap-1">
                              {transaction.transaction_type === 'IN' ? (
                                <>
                                  <span className="text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-md">
                                    -${(transaction.total || 0).toLocaleString()}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md">
                                    +${(transaction.total || 0).toLocaleString()}
                                  </span>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Transactions分页控件 */}
                <div className="flex items-center justify-between space-x-2 py-4 bg-gray-50/50 rounded-lg px-4">
                  <div className="flex items-center space-x-3">
                    <p className="text-sm font-medium text-gray-700">Rows per page</p>
                    <Select
                      value={stockTransactionTablePageSize.toString()}
                      onValueChange={value => {
                        setStockTransactionTablePageSize(Number(value))
                        setStockTransactionTablePage(1) // 重置到第一页
                      }}
                    >
                      <SelectTrigger className="h-9 w-[80px] border-0 bg-white shadow-md">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent side="top" className="border-0 shadow-xl">
                        {[5, 10, 20, 30, 50].map(pageSize => (
                          <SelectItem key={pageSize} value={pageSize.toString()}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-4">
                    <p className="text-sm font-medium text-gray-700">
                      Page {stockTransactionTablePage} of{' '}
                      {stockTransactionTableTotalPages}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setStockTransactionTablePage(
                            Math.max(1, stockTransactionTablePage - 1)
                          )
                        }
                        disabled={stockTransactionTablePage <= 1}
                        className="border-0 bg-white shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setStockTransactionTablePage(
                            Math.min(
                              stockTransactionTableTotalPages,
                              stockTransactionTablePage + 1
                            )
                          )
                        }
                        disabled={
                          stockTransactionTablePage >=
                          stockTransactionTableTotalPages
                        }
                        className="border-0 bg-white shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
