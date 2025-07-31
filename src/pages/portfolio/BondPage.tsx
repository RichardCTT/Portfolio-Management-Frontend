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
import { analysisApi, assetsApi, portfolioAnalysisApi } from '@/lib/request'
import { TrendingUp, TrendingDown } from 'lucide-react'

const DEFAULT_ASSET_TYPE = 3 // Assuming 2 is the ID for Bond in your API

interface Bond {
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

interface TransactionBond {
  id: number
  name: string
  code: string
  transaction_date: string
  transaction_type: string
  amount: number
  balance: number
  price: number
  bond?: string
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

export default function BondPage() {
  const [totalBonds, setTotalBonds] = useState<number>(0)
  const [totalMarketValue, setTotalMarketValue] = useState<number>(0)
  const [largestPosition, setLargestPosition] = useState<{
    name: string
    shares: number
  } | null>(null)
  const [bonds, setBonds] = useState<Bond[]>([])
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const [selectedBonds, setSelectedBond] = useState<string>('all')
  const [selectedValueBond, setSelectedValueBond] = useState<string>('all')
  const [activeValueIndex, setActiveValueIndex] = useState<number | undefined>(
    undefined
  )

  // Pagination state for stock holdings table
  const [bondHoldTablePage, setBondHoldTablePage] = useState<number>(1)
  const [bondHoldTablePageSize, setBondHoldTablePageSize] =
    useState<number>(10)
  const [bondHoldTableTotal, setBondHoldTableTotal] = useState<number>(1)
  // State to hold stock holdings data for table
  const [holdingsData, setHoldingsData] = useState<HoldingTableData[]>([])

  // Pagination state for stock transactions table
  const [bondTransactionTablePage, setBondTransactionTablePage] =
    useState<number>(1)
  const [bondTransactionTablePageSize, setBondTransactionTablePageSize] =
    useState<number>(10)
  const [bondTransactionTableTotalPages, setBondTransactionTableTotalPages] =
    useState<number>(1)
  const [transactionData, setTransactionData] = useState<TransactionBond[]>([])

  // get total stocks, market value, and largest position
  const fetchBondData = async () => {
    try {
      const response = await analysisApi.apiAnalysisAssetTotalsByTypeGet()
      setTotalBonds(response.data.data?.assetTypes?.bond?.count || 0)
      setTotalMarketValue(
        response.data.data?.assetTypes?.bond?.totalPrice || 0
      )
      const bondsTmp: Bond[] =
        response.data.data?.assetTypes?.bond?.assets?.map((bond, index) => ({
          name: bond.name || 'Unknown',
          shares: bond.quantity || 0,
          code: bond.code || bond.name || 'N/A',
          quantity: bond.quantity || 0,
          price: bond.price || 0,
          marketValue: (bond.quantity || 0) * (bond.price || 0),
          color: COLORS[index % COLORS.length],
        })) || []
      setBonds(bondsTmp)

      // Find largest position by market value
      if (bondsTmp.length > 0) {
        const largest = bondsTmp.reduce((prev, current) =>
          prev.marketValue > current.marketValue ? prev : current
        )
        setLargestPosition({
          name: largest.name,
          shares: largest.shares,
        })
      }
    } catch (error) {
      console.error('Error fetching bond data:', error)
    }
  }

  // get hold stock data for table
  const fetchHoldingsData = async () => {
    try {
      const response = await assetsApi.apiAssetsGet({
        page: bondHoldTablePage,
        pageSize: bondHoldTablePageSize,
        assetTypeId: DEFAULT_ASSET_TYPE,
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
      setBondHoldTableTotal(
        Math.ceil((response.data.data?.total || 0) / bondHoldTablePageSize) ||
          1
      )
    } catch (error) {
      console.error('Error fetching holdings data:', error)
    }
  }

  useEffect(() => {
    fetchHoldingsData()
  }, [bondHoldTablePage, bondHoldTablePageSize])

  // get transaction data for table
  const fetchTransactionData = async () => {
    try {
      const response =
        await portfolioAnalysisApi.apiPortfolioTransactionsByTypeAssetTypeIdGet(
          {
            page: bondTransactionTablePage,
            limit: bondTransactionTablePageSize,
            assetTypeId: DEFAULT_ASSET_TYPE,
          }
        )

      const transactions: TransactionBond[] = (
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
      setBondTransactionTableTotalPages(
        Math.ceil(
          (response.data.data?.total_transactions || 0) /
            bondTransactionTablePageSize
        ) || 1
      )
    } catch (error) {
      console.error('Error fetching transaction data:', error)
    }
  }

  useEffect(() => {
    fetchTransactionData()
  }, [bondTransactionTablePage, bondTransactionTablePageSize])

  useEffect(() => {
    fetchBondData()
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
              <CardTitle className="text-sm font-medium text-blue-100">
                Total Bonds
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="m22 21-3-3" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">
                {totalBonds.toLocaleString()}
              </div>
              <p className="text-xs text-blue-100">Different bonds held</p>
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
              <p className="text-xs text-emerald-100">Total portfolio value</p>
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
                {largestPosition
                  ? `${largestPosition.shares} shares`
                  : 'No data'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 饼状图卡片 - 并排显示 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* 持仓量分布饼状图 */}
          <Card className="group relative border-0 shadow-2xl bg-white/95 backdrop-blur-lg hover:shadow-3xl transition-all duration-700 overflow-hidden rounded-2xl hover:scale-[1.02]">
            {/* 顶部装饰线 */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500"></div>

            <CardHeader className="relative pb-6 pt-8 px-8 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/40 rounded-t-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-6 w-6 text-white"
                    >
                      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-6z" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800 mb-1">
                      Share Distribution
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Portfolio composition by shares
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={selectedBonds}
                    onValueChange={setSelectedBond}
                  >
                    <SelectTrigger className="w-[200px] border-2 border-blue-200/50 bg-white/80 shadow-lg hover:shadow-xl hover:border-blue-300/70 transition-all duration-300 rounded-xl backdrop-blur-sm">
                      <SelectValue placeholder="Select bond" />
                    </SelectTrigger>
                    <SelectContent className="border-0 shadow-2xl rounded-xl bg-white/95 backdrop-blur-lg">
                      <SelectItem value="all" className="rounded-lg">
                        All Bonds
                      </SelectItem>
                      {bonds.map(bond => (
                        <SelectItem
                          key={bond.code}
                          value={bond.code}
                          className="rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full ring-2 ring-white shadow-lg"
                              style={{ backgroundColor: bond.color }}
                            />
                            <span className="font-medium">{bond.name}</span>
                            <span className="text-xs text-gray-500">
                              ({bond.shares} shares)
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="relative">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={bonds.map(bond => ({
                        name: bond.name,
                        value: bond.shares,
                        color: bond.color,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      innerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={4}
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(undefined)}
                    >
                      {bonds.map((bond, index) => {
                        const isSelected =
                          selectedBonds !== 'all' &&
                          bond.code === selectedBonds
                        const isHovered = activeIndex === index
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={bond.color}
                            stroke={isHovered ? '#1f2937' : '#ffffff'}
                            strokeWidth={isHovered ? 5 : 4}
                            style={{
                              filter:
                                selectedBonds !== 'all' && !isSelected
                                  ? 'opacity(0.2) brightness(0.8)'
                                  : activeIndex !== undefined && !isHovered
                                    ? 'opacity(0.7) brightness(0.9)'
                                    : 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
                              cursor: 'pointer',
                              transform:
                                isSelected || isHovered
                                  ? 'scale(1.08)'
                                  : 'scale(1)',
                              transformOrigin: 'center',
                              transition:
                                'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                          />
                        )
                      })}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: string) => [
                        <span className="font-semibold text-blue-600">
                          {value} shares
                        </span>,
                        <span className="font-medium text-gray-800">
                          {name}
                        </span>,
                      ]}
                      labelFormatter={() => ''}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        border: 'none',
                        borderRadius: '16px',
                        boxShadow:
                          '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                        backdropFilter: 'blur(20px)',
                        padding: '12px 16px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* 中心信息显示 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      {bonds.length}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Bonds
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 持仓市值分布饼状图 */}
          <Card className="group relative border-0 shadow-2xl bg-white/95 backdrop-blur-lg hover:shadow-3xl transition-all duration-700 overflow-hidden rounded-2xl hover:scale-[1.02]">
            {/* 顶部装饰线 */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500"></div>

            <CardHeader className="relative pb-6 pt-8 px-8 bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-teal-50/40 rounded-t-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-6 w-6 text-white"
                    >
                      <path d="M12 2v20m9-2H3" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800 mb-1">
                      Value Distribution
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Portfolio composition by value
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={selectedValueBond}
                    onValueChange={setSelectedValueBond}
                  >
                    <SelectTrigger className="w-[200px] border-2 border-emerald-200/50 bg-white/80 shadow-lg hover:shadow-xl hover:border-emerald-300/70 transition-all duration-300 rounded-xl backdrop-blur-sm">
                      <SelectValue placeholder="Select bond" />
                    </SelectTrigger>
                    <SelectContent className="border-0 shadow-2xl rounded-xl bg-white/95 backdrop-blur-lg">
                      <SelectItem value="all" className="rounded-lg">
                        All Bonds
                      </SelectItem>
                      {bonds.map(bond => (
                        <SelectItem
                          key={bond.code}
                          value={bond.code}
                          className="rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full ring-2 ring-white shadow-lg"
                              style={{ backgroundColor: bond.color }}
                            />
                            <span className="font-medium">{bond.name}</span>
                            <span className="text-xs text-gray-500">
                              (${bond.marketValue.toLocaleString()})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="relative">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={bonds.map(bond => ({
                        name: bond.name,
                        value: bond.marketValue,
                        color: bond.color,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      innerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={4}
                      onMouseEnter={(_, index) => setActiveValueIndex(index)}
                      onMouseLeave={() => setActiveValueIndex(undefined)}
                    >
                      {bonds.map((bond, index) => {
                        const isSelected =
                          selectedValueBond !== 'all' &&
                          bond.code === selectedValueBond
                        const isHovered = activeValueIndex === index
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={bond.color}
                            stroke={isHovered ? '#1f2937' : '#ffffff'}
                            strokeWidth={isHovered ? 5 : 4}
                            style={{
                              filter:
                                selectedValueBond !== 'all' && !isSelected
                                  ? 'opacity(0.2) brightness(0.8)'
                                  : activeValueIndex !== undefined && !isHovered
                                    ? 'opacity(0.7) brightness(0.9)'
                                    : 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
                              cursor: 'pointer',
                              transform:
                                isSelected || isHovered
                                  ? 'scale(1.08)'
                                  : 'scale(1)',
                              transformOrigin: 'center',
                              transition:
                                'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                          />
                        )
                      })}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: string) => [
                        <span className="font-semibold text-emerald-600">
                          ${value.toLocaleString()}
                        </span>,
                        <span className="font-medium text-gray-800">
                          {name}
                        </span>,
                      ]}
                      labelFormatter={() => ''}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        border: 'none',
                        borderRadius: '16px',
                        boxShadow:
                          '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                        backdropFilter: 'blur(20px)',
                        padding: '12px 16px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* 中心信息显示 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-lg">
                    <div className="text-xl font-bold text-gray-800">
                      ${totalMarketValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Total Value
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 数据表格区域 */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Bond Information
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
                    <h3 className="text-lg font-semibold text-gray-800">
                      Holdings Portfolio
                    </h3>
                    <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      Total: {holdingsData.length} bonds
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
                    <Table>
                      <TableHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
                        <TableRow className="border-b border-gray-200">
                          <TableHead className="font-semibold text-gray-700 py-4">
                            Bond
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4">
                            Code
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4 text-right">
                            Quantity
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4 text-right">
                            Current Price
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4 text-right">
                            Avg. Price
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4 text-right">
                            Market Value
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4 text-right">
                            Percentage
                          </TableHead>
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
                                <span className="text-gray-800">
                                  {holding.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono font-medium text-blue-600 py-4">
                              {holding.code}
                            </TableCell>
                            <TableCell className="text-right py-4">
                              {holding.quantity}
                            </TableCell>
                            <TableCell className="text-right py-4">
                              ${(holding.currentPrice || 0).toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right py-4">
                              ${holding.average_position_price}
                            </TableCell>
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
                      <p className="text-sm font-medium text-gray-700">
                        Rows per page
                      </p>
                      <Select
                        value={bondHoldTablePageSize.toString()}
                        onValueChange={value => {
                          setBondHoldTablePageSize(Number(value))
                          setBondHoldTablePage(1) // 重置到第一页
                        }}
                      >
                        <SelectTrigger className="h-9 w-[80px] border-0 bg-white shadow-md">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                          side="top"
                          className="border-0 shadow-xl"
                        >
                          {[5, 10, 20, 30, 50].map(pageSize => (
                            <SelectItem
                              key={pageSize}
                              value={pageSize.toString()}
                            >
                              {pageSize}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-4">
                      <p className="text-sm font-medium text-gray-700">
                        Page {bondHoldTablePage} of {bondHoldTableTotal}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setBondHoldTablePage(
                              Math.max(1, bondHoldTablePage - 1)
                            )
                          }
                          disabled={bondHoldTablePage <= 1}
                          className="border-0 bg-white shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setBondHoldTablePage(
                              Math.min(
                                bondHoldTableTotal,
                                bondHoldTablePage + 1
                              )
                            )
                          }
                          disabled={bondHoldTablePage >= bondHoldTableTotal}
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
                    <h3 className="text-lg font-semibold text-gray-800">
                      Transaction History
                    </h3>
                    <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      Total: {transactionData.length} transactions
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
                    <Table>
                      <TableHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
                        <TableRow className="border-b border-gray-200">
                          <TableHead className="font-semibold text-gray-700 py-4">
                            Date
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4">
                            Type
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4">
                            Bond
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4">
                            Code
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4 text-right">
                            Quantity
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4 text-right">
                            Price
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4 text-right">
                            Total
                          </TableHead>
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
                                      -$
                                      {(
                                        transaction.total || 0
                                      ).toLocaleString()}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md">
                                      +$
                                      {(
                                        transaction.total || 0
                                      ).toLocaleString()}
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
                      <p className="text-sm font-medium text-gray-700">
                        Rows per page
                      </p>
                      <Select
                        value={bondTransactionTablePageSize.toString()}
                        onValueChange={value => {
                          setBondTransactionTablePageSize(Number(value))
                          setBondTransactionTablePage(1) // 重置到第一页
                        }}
                      >
                        <SelectTrigger className="h-9 w-[80px] border-0 bg-white shadow-md">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                          side="top"
                          className="border-0 shadow-xl"
                        >
                          {[5, 10, 20, 30, 50].map(pageSize => (
                            <SelectItem
                              key={pageSize}
                              value={pageSize.toString()}
                            >
                              {pageSize}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-4">
                      <p className="text-sm font-medium text-gray-700">
                        Page {bondTransactionTablePage} of{' '}
                        {bondTransactionTableTotalPages}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setBondTransactionTablePage(
                              Math.max(1, bondTransactionTablePage - 1)
                            )
                          }
                          disabled={bondTransactionTablePage <= 1}
                          className="border-0 bg-white shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setBondTransactionTablePage(
                              Math.min(
                                bondTransactionTableTotalPages,
                                bondTransactionTablePage + 1
                              )
                            )
                          }
                          disabled={
                            bondTransactionTablePage >=
                            bondTransactionTableTotalPages
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
