import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  getAssetsByDateAPI,
  getAssetsHistoryAPI,
  getSummaryAPI,
} from '@/services/homeApi'
import {
  LineChart as LineChartIcon,
  TrendingDown,
  TrendingUp,
  Wallet,
  Activity,
  BarChart3,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts'

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`
}

// Chart configurations
const PIE_CHART_CONFIG = {
  percentage: { label: 'Percentage' },
  stock: { label: 'Stocks', color: '#4f46e5' },
  bond: { label: 'Bonds', color: '#06b6d4' },
  cash: { label: 'Cash', color: '#10b981' },
} satisfies ChartConfig

const LINE_CHART_CONFIG = {
  total_asset_value: {
    label: 'Portfolio Value',
    color: '#4f46e5',
  },
} satisfies ChartConfig

// Loading skeleton components
const MetricCardSkeleton = () => (
  <Card className="overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-10 rounded-full" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-24 mb-2" />
      <Skeleton className="h-3 w-16" />
    </CardContent>
  </Card>
)

const ChartCardSkeleton = ({ title }: { title: string }) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl">
        <Skeleton className="h-5 w-5" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[300px] w-full" />
    </CardContent>
  </Card>
)

export default function HomePage() {
  // State management
  const [isLoading, setIsLoading] = useState(true)
  const [totalAsset, setTotalAsset] = useState<number>(0)
  const [totalPnL, setTotalPnL] = useState<number>(0)
  const [dailyPnL, setDailyPnL] = useState<number>(0)
  const [pieChartData, setPieChartData] = useState<any[]>([])
  const [lineChartData, setLineChartData] = useState<any[]>([])

  // Computed values
  const isTotalPnLPositive = totalPnL >= 0
  const isDailyPnLPositive = dailyPnL >= 0

  // Data fetching functions
  const getSummary = async () => {
    try {
      const res = await getSummaryAPI()
      if (res.code === 200) {
        setTotalAsset(res.data.total_asset_value)
        setTotalPnL(res.data.total_profit_loss)
        setDailyPnL(res.data.today_profit_loss)
      } else {
        console.error('Get summary failed', res.message)
      }
    } catch (error) {
      console.error('Error fetching summary:', error)
    }
  }

  const getAssetsByDate = async () => {
    try {
      const res = await getAssetsByDateAPI()
      if (res.success && res.data) {
        setPieChartData([
          {
            asset: 'stock',
            percentage: res.data.assetTypes.stock.percentage,
            fill: 'var(--color-stock)',
            value: res.data.assetTypes.stock.totalPrice,
          },
          {
            asset: 'bond',
            percentage: res.data.assetTypes.bond.percentage,
            fill: 'var(--color-bond)',
            value: res.data.assetTypes.bond.totalPrice,
          },
          {
            asset: 'cash',
            percentage: res.data.assetTypes.cash.percentage,
            fill: 'var(--color-cash)',
            value: res.data.assetTypes.cash.totalPrice,
          },
        ])
      } else {
        console.error('Get assets by date failed', res.message)
      }
    } catch (error) {
      console.error('Error fetching assets by date:', error)
    }
  }

  const getAssetsHistory = async () => {
    try {
      const res = await getAssetsHistoryAPI()
      if (res.code === 200) {
        setLineChartData(
          res.data.slice(-7).map((item, index) => ({
            date: new Date(item.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
            total_asset_value: item.total_asset_value,
            dayIndex: index,
          }))
        )
      } else {
        console.error('Get assets history failed', res.message)
      }
    } catch (error) {
      console.error('Error fetching assets history:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await Promise.all([getSummary(), getAssetsByDate(), getAssetsHistory()])
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 animate-fade-in">
      {/* Header Section */}
      <div className="pb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Portfolio Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's your portfolio overview.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </>
        ) : (
          <>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Assets
                </CardTitle>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {formatCurrency(totalAsset)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Total portfolio value
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total P&L
                </CardTitle>
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    isTotalPnLPositive ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <Activity
                    className={`h-5 w-5 ${
                      isTotalPnLPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-3xl font-bold ${
                    isTotalPnLPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isTotalPnLPositive ? '+' : ''}
                  {formatCurrency(totalPnL)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  All-time performance
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Daily P&L
                </CardTitle>
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    isDailyPnLPositive ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  {isDailyPnLPositive ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-3xl font-bold ${
                    isDailyPnLPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isDailyPnLPositive ? '+' : ''}
                  {formatCurrency(dailyPnL)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Today's performance
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {isLoading ? (
          <>
            <ChartCardSkeleton title="Asset Allocation" />
            <ChartCardSkeleton title="7-Day Portfolio Trend" />
          </>
        ) : (
          <>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="items-center pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BarChart3 className="h-5 w-5" />
                  Asset Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <ChartContainer
                  config={PIE_CHART_CONFIG}
                  className="mx-auto aspect-square max-h-[300px]"
                >
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="percentage"
                      nameKey="asset"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label={({ percentage }) => `${percentage.toFixed(1)}%`}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="rounded-lg border bg-white p-3 shadow-lg">
                              <p className="font-medium capitalize">
                                {data.asset}
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatPercentage(data.percentage)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatCurrency(data.value)}
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <ChartLegend
                      content={<ChartLegendContent nameKey="asset" />}
                      className="flex-wrap gap-4 pt-4"
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <LineChartIcon className="h-5 w-5" />
                  7-Day Portfolio Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={LINE_CHART_CONFIG}
                  className="h-[300px]"
                >
                  <LineChart
                    accessibilityLayer
                    data={lineChartData}
                    margin={{
                      left: 12,
                      right: 12,
                      top: 12,
                      bottom: 12,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-white p-3 shadow-lg">
                              <p className="font-medium">{label}</p>
                              <p className="text-sm text-blue-600">
                                {formatCurrency(payload[0].value as number)}
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      dataKey="total_asset_value"
                      type="monotone"
                      stroke="var(--color-total_asset_value)"
                      strokeWidth={3}
                      dot={{
                        fill: 'var(--color-total_asset_value)',
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
