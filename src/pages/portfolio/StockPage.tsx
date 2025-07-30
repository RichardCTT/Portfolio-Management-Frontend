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
import { analysisApi, assetsApi } from '@/lib/request'
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
        Math.ceil(
          (response.data.data?.total || 0) /
            (response.data.data?.page_size || 10)
        ) || 1
      )
    } catch (error) {
      console.error('Error fetching holdings data:', error)
    }
  }

  useEffect(() => {
    fetchHoldingsData()
  }, [stockHoldTablePage, stockHoldTablePageSize])

  // 示例交易数据 - 实际应该从API获取
  const sampleTransactionsData = [
    {
      date: '2024-01-15',
      type: 'Buy',
      stock: 'AAPL',
      quantity: 50,
      price: 180.5,
      total: 9025.0,
      status: 'Completed',
    },
    {
      date: '2024-01-10',
      type: 'Sell',
      stock: 'MSFT',
      quantity: 30,
      price: 350.25,
      total: 10507.5,
      status: 'Completed',
    },
    {
      date: '2024-01-08',
      type: 'Buy',
      stock: 'GOOGL',
      quantity: 20,
      price: 140.75,
      total: 2815.0,
      status: 'Pending',
    },
    {
      date: '2024-01-05',
      type: 'Buy',
      stock: 'TSLA',
      quantity: 25,
      price: 245.8,
      total: 6145.0,
      status: 'Completed',
    },
    {
      date: '2024-01-03',
      type: 'Sell',
      stock: 'AMZN',
      quantity: 10,
      price: 580.45,
      total: 5804.5,
      status: 'Completed',
    },
    {
      date: '2024-01-02',
      type: 'Buy',
      stock: 'META',
      quantity: 15,
      price: 312.25,
      total: 4683.75,
      status: 'Completed',
    },
    {
      date: '2023-12-28',
      type: 'Buy',
      stock: 'NVDA',
      quantity: 8,
      price: 750.2,
      total: 6001.6,
      status: 'Completed',
    },
    {
      date: '2023-12-25',
      type: 'Sell',
      stock: 'NFLX',
      quantity: 5,
      price: 425.6,
      total: 2128.0,
      status: 'Completed',
    },
    {
      date: '2023-12-22',
      type: 'Buy',
      stock: 'ADBE',
      quantity: 12,
      price: 456.78,
      total: 5481.36,
      status: 'Completed',
    },
    {
      date: '2023-12-20',
      type: 'Buy',
      stock: 'CRM',
      quantity: 18,
      price: 245.3,
      total: 4415.4,
      status: 'Completed',
    },
    {
      date: '2023-12-18',
      type: 'Sell',
      stock: 'ORCL',
      quantity: 20,
      price: 189.45,
      total: 3789.0,
      status: 'Completed',
    },
    {
      date: '2023-12-15',
      type: 'Buy',
      stock: 'INTC',
      quantity: 50,
      price: 45.22,
      total: 2261.0,
      status: 'Completed',
    },
  ]

  const totalTransactionsPages = Math.ceil(
    sampleTransactionsData.length / stockTransactionTablePageSize
  )
  const currentTransactionsData = sampleTransactionsData.slice(
    (stockTransactionTablePage - 1) * stockTransactionTablePageSize,
    stockTransactionTablePage * stockTransactionTablePageSize
  )

  useEffect(() => {
    fetchStockData()
  }, [])
  return (
    <div className="p-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* 持有股票数量 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stocks</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="m22 21-3-3" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalStocks.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Different stocks held
            </p>
          </CardContent>
        </Card>

        {/* 总市值 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Market Value
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20m9-2H3" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalMarketValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total portfolio value
            </p>
          </CardContent>
        </Card>

        {/* 当前持有最多的股票 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Largest Position
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {largestPosition?.name || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {largestPosition ? `${largestPosition.shares} shares` : 'No data'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 饼状图卡片 - 并排显示 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 持仓量分布饼状图 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Share Distribution
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={selectedStock} onValueChange={setSelectedStock}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stocks</SelectItem>
                  {stocks.map(stock => (
                    <SelectItem key={stock.code} value={stock.code}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: stock.color }}
                        />
                        {stock.name} ({stock.shares} shares)
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={350}>
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
                      outerRadius={130}
                      innerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={2}
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
                            strokeWidth={isHovered ? 3 : 2}
                            style={{
                              filter:
                                selectedStock !== 'all' && !isSelected
                                  ? 'opacity(0.3)'
                                  : activeIndex !== undefined && !isHovered
                                    ? 'opacity(0.6)'
                                    : 'none',
                              cursor: 'pointer',
                              transform: isSelected ? 'scale(1.1)' : 'scale(1)',
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
                      labelStyle={{ color: '#000' }}
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 持仓市值分布饼状图 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Value Distribution
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select
                value={selectedValueStock}
                onValueChange={setSelectedValueStock}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stocks</SelectItem>
                  {stocks.map(stock => (
                    <SelectItem key={stock.code} value={stock.code}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: stock.color }}
                        />
                        {stock.name} (${stock.marketValue.toLocaleString()})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20m9-2H3" />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={350}>
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
                      outerRadius={130}
                      innerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={2}
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
                            strokeWidth={isHovered ? 3 : 2}
                            style={{
                              filter:
                                selectedValueStock !== 'all' && !isSelected
                                  ? 'opacity(0.3)'
                                  : activeValueIndex !== undefined && !isHovered
                                    ? 'opacity(0.6)'
                                    : 'none',
                              cursor: 'pointer',
                              transform: isSelected ? 'scale(1.1)' : 'scale(1)',
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
                      labelStyle={{ color: '#000' }}
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
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
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Stock Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="holdings" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="holdings">Holdings</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="holdings" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stock</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">
                        Current Price
                      </TableHead>
                      <TableHead className="text-right">Avg. Price</TableHead>
                      <TableHead className="text-right">Market Value</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {holdingsData.map(holding => (
                      <TableRow key={holding.code}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: holding.color }}
                            ></div>
                            {holding.name}
                          </div>
                        </TableCell>
                        <TableCell>{holding.code}</TableCell>
                        <TableCell className="text-right">
                          {holding.quantity}
                        </TableCell>
                        <TableCell className="text-right">
                          ${(holding.currentPrice || 0).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${holding.average_position_price}
                        </TableCell>
                        <TableCell className="text-right">
                          ${holding.marketValue.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {holding.priceChangeRate > 0 ? (
                              <>
                                <TrendingUp className="w-4 h-4 text-green-600" />
                                <span className="text-green-600 font-medium">
                                  +{holding.priceChangeRate.toFixed(2)}%
                                </span>
                              </>
                            ) : holding.priceChangeRate < 0 ? (
                              <>
                                <TrendingDown className="w-4 h-4 text-red-600" />
                                <span className="text-red-600 font-medium">
                                  {holding.priceChangeRate.toFixed(2)}%
                                </span>
                              </>
                            ) : (
                              <span className="text-gray-600 font-medium">
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
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">Rows per page</p>
                  <Select
                    value={stockHoldTablePageSize.toString()}
                    onValueChange={value => {
                      setStockHoldTablePageSize(Number(value))
                      setStockHoldTablePage(1) // 重置到第一页
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[5, 10, 20, 30, 50].map(pageSize => (
                        <SelectItem key={pageSize} value={pageSize.toString()}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">
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
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentTransactionsData.map((transaction, index) => (
                      <TableRow
                        key={`${transaction.date}-${transaction.stock}-${index}`}
                      >
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.type === 'Buy'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.stock}
                        </TableCell>
                        <TableCell className="text-right">
                          {transaction.quantity}
                        </TableCell>
                        <TableCell className="text-right">
                          ${transaction.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${transaction.total.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.status === 'Completed'
                                ? 'bg-blue-100 text-blue-800'
                                : transaction.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Transactions分页控件 */}
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">Rows per page</p>
                  <Select
                    value={stockTransactionTablePageSize.toString()}
                    onValueChange={value => {
                      setStockTransactionTablePageSize(Number(value))
                      setStockTransactionTablePage(1) // 重置到第一页
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[5, 10, 20, 30, 50].map(pageSize => (
                        <SelectItem key={pageSize} value={pageSize.toString()}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">
                    Page {stockTransactionTablePage} of {totalTransactionsPages}
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
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setStockTransactionTablePage(
                          Math.min(
                            totalTransactionsPages,
                            stockTransactionTablePage + 1
                          )
                        )
                      }
                      disabled={
                        stockTransactionTablePage >= totalTransactionsPages
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
