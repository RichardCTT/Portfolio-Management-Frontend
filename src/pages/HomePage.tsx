import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  getAssetsByDateAPI,
  getAssetsHistoryAPI,
  getSummaryAPI,
} from '@/services/homeApi'
import {
  Banknote,
  LineChart as LineChartIcon,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, Pie, PieChart, XAxis } from 'recharts'

export default function HomePage() {
  const [totalAsset, setTotalAsset] = useState<number>(0)
  const [totalPnL, setTotalPnL] = useState<number>(0)
  const isTotalPnLNonNegative = totalPnL >= 0
  const [dailyPnL, setDailyPnL] = useState<number>(0)
  const isDailyPnLNonNegative = dailyPnL >= 0

  const getSummary = async () => {
    const res = await getSummaryAPI()
    if (res.code === 200) {
      setTotalAsset(res.data.total_asset_value)
      setTotalPnL(res.data.total_profit_loss)
      setDailyPnL(res.data.today_profit_loss)
    } else {
      console.error('Get summary failed', res.message)
    }
  }

  useEffect(() => {
    getSummary()
    getAssetsByDate()
    getAssetsHistory()
  }, [])

  const [pieChartData, setPieChartData] = useState<any[]>([])
  const pieChartConfig = {
    percentage: {
      label: 'Percentage',
    },
    stock: {
      label: 'Stock',
      // color: 'var(--chart-1)',
      color: '#a6cee3',
    },
    bond: {
      label: 'Bond',
      // color: 'var(--chart-2)',
      color: '#2f4b7c',
    },
    cash: {
      label: 'Cash',
      // color: 'var(--chart-3)',
      color: '#003f5c',
    },
  } satisfies ChartConfig

  const getAssetsByDate = async () => {
    const res = await getAssetsByDateAPI()
    if (res.success) {
      setPieChartData([
        {
          asset: 'stock',
          percentage: res!.data!.assetTypes.stock.percentage,
          fill: 'var(--color-stock)',
        },
        {
          asset: 'bond',
          percentage: res!.data!.assetTypes.bond.percentage,
          fill: 'var(--color-bond)',
        },
        {
          asset: 'cash',
          percentage: res!.data!.assetTypes.cash.percentage,
          fill: 'var(--color-cash)',
        },
      ])
    } else {
      console.error('Get summary failed', res.message)
    }
  }

  const [lineChartData, setLineChartData] = useState<any[]>()
  const lineChartConfig = {
    total_asset_value: {
      label: 'Total Asset:',
      // color: 'var(--chart-1)',
      color: '#003f5c',
    },
  } satisfies ChartConfig

  const getAssetsHistory = async () => {
    const res = await getAssetsHistoryAPI()
    if (res.code === 200) {
      setLineChartData(
        res.data.slice(3).map(item => {
          return {
            date: item.date.slice(8, 10),
            total_asset_value: item.total_asset_value,
          }
        })
      )
    } else {
      console.error('Get summary failed', res.message)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="pb-8 mb-8">
        <h2 className="text-3xl font-bold">Welcome back!</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Asset</CardTitle>
            <Banknote className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAsset}</div>
            <p className="text-xs text-muted-foreground">Cash + Holdings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total PnL</CardTitle>
            <LineChartIcon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${isTotalPnLNonNegative ? 'text-green-600' : 'text-red-500'}`}
            >
              {(isTotalPnLNonNegative ? '+' : '-') + '$' + Math.abs(totalPnL)}
            </div>
            <p className="text-xs text-muted-foreground">Excluding Cash</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily PnL</CardTitle>
            {isDailyPnLNonNegative ? (
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <TrendingDown className="h-5 w-5 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${isDailyPnLNonNegative ? 'text-green-600' : 'text-red-500'}`}
            >
              {(isDailyPnLNonNegative ? '+' : '-') + '$' + Math.abs(dailyPnL)}
            </div>
            <p className="text-xs text-muted-foreground">Since Yesterday</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="items-center pb-0">
            <CardTitle>Asset Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pb-0">
            <ChartContainer config={pieChartConfig} className="max-w-full">
              <PieChart>
                <Pie data={pieChartData} dataKey="percentage" />
                <ChartLegend
                  content={<ChartLegendContent nameKey="asset" />}
                  className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7-Day Asset Trend</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center h-full">
            <ChartContainer config={lineChartConfig} className="max-w-full">
              <LineChart
                accessibilityLayer
                data={lineChartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={value => value}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="total_asset_value"
                  type="natural"
                  stroke="var(--color-total_asset_value)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
