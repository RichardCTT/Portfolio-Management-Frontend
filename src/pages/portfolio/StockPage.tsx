import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { type Transaction } from '@/services/portfolioApi'
import type { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState, useMemo } from 'react'
import { AnalysisApi, PortfolioAnalysisApi } from '@/lib/api'

// 持仓数据类型
interface Holding {
  id: number
  asset_id: number
  asset_name: string
  asset_code: string
  asset_type_name: string
  holding: number
  current_price: number
  total_value: number
  avg_price: number
  transaction_count: number
}

export default function StockPage() {
  const [data, setData] = useState<Transaction[]>([])
  const [filteredData, setFilteredData] = useState<Transaction[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'holdings' | 'transactions'>(
    'holdings'
  )
  const pageSizeOptions = [10, 50, 100]

  // 获取股票交易记录
  const getStockTransactions = async (
    currentPage: number,
    pageSize: number
  ) => {
    setIsLoading(true)
    try {
      const portfolioAnalysisApi = new PortfolioAnalysisApi()
      const res =
        await portfolioAnalysisApi.apiPortfolioTransactionsByTypeAssetTypeIdGet(
          {
            assetTypeId: 2,
            page: currentPage,
            limit: pageSize,
          }
        )
      if (res.data.success) {
        // @ts-ignore
        setData(res.data.data.transactions)
        // @ts-ignore
        setTotal(res.data.data?.total_transactions)
      } else {
        setData([])
        setTotal(0)
      }
    } catch (error) {
      console.error('Error fetching stock transactions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getStockTransactions(currentPage, pageSize)
  }, [currentPage, pageSize])

  // get stock holdings analysis
  const getStockAnaylsis = async () => {
    setIsLoading(true)
    try {
      const analysisApi = new AnalysisApi()
      const res = await analysisApi.apiAnalysisAssetTotalsByTypeGet({
        date: new Date().toISOString().split('T')[0], // 使用当前日期
      })
      console.log('Stock analysis response:', res)
    } catch (error) {
      console.error('Error fetching stock analysis:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getStockAnaylsis()
  }, [])

  // 搜索过滤逻辑
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(data)
    } else {
      const filtered = data.filter(
        transaction =>
          transaction.asset_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          transaction.asset_code
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          transaction.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
      setFilteredData(filtered)
    }
  }, [data, searchQuery])

  // 刷新数据
  const handleRefresh = () => {
    getStockTransactions(currentPage, pageSize)
  }

  // 搜索处理
  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  // 将交易数据转换为持仓数据
  const getHoldingsData = useMemo(() => {
    const dataToUse = searchQuery ? filteredData : data
    const holdings = dataToUse.reduce(
      (acc, transaction) => {
        const key = `${transaction.asset_id}-${transaction.asset_code}`
        if (!acc[key]) {
          acc[key] = {
            id: transaction.asset_id,
            asset_id: transaction.asset_id,
            asset_name: transaction.asset_name,
            asset_code: transaction.asset_code,
            asset_type_name: transaction.asset_type_name,
            holding: 0,
            current_price: transaction.price,
            total_value: 0,
            avg_price: 0,
            transaction_count: 0,
            prices: [] as number[],
          }
        }

        // 使用最新的持仓数量
        acc[key].holding = Math.max(acc[key].holding, transaction.holding)
        acc[key].current_price = transaction.price // 使用最新价格
        acc[key].prices.push(transaction.price)
        acc[key].transaction_count += 1

        return acc
      },
      {} as Record<
        string,
        {
          id: number
          asset_id: number
          asset_name: string
          asset_code: string
          asset_type_name: string
          holding: number
          current_price: number
          total_value: number
          avg_price: number
          transaction_count: number
          prices: number[]
        }
      >
    )

    // 计算平均价格和总价值
    return Object.values(holdings).map(holding => ({
      ...holding,
      avg_price:
        holding.prices.reduce((sum, price) => sum + price, 0) /
        holding.prices.length,
      total_value: holding.holding * holding.current_price,
    })) as Holding[]
  }, [data, filteredData, searchQuery])

  // 计算统计数据
  const stockStats = useMemo(() => {
    const dataToUse = filteredData.length > 0 ? filteredData : data
    if (!dataToUse.length) {
      return {
        totalStocks: 0,
        totalValue: 0,
        topHolding: { name: '-', code: '-', holding: 0 },
        avgPrice: 0,
      }
    }

    // 按股票分组，计算每只股票的总持仓
    const stockHoldings = dataToUse.reduce(
      (acc, transaction) => {
        const key = `${transaction.asset_id}-${transaction.asset_code}`
        if (!acc[key]) {
          acc[key] = {
            name: transaction.asset_name,
            code: transaction.asset_code,
            totalHolding: 0,
            totalValue: 0,
            prices: [],
          }
        }
        acc[key].totalHolding = Math.max(
          acc[key].totalHolding,
          transaction.holding
        )
        acc[key].totalValue = acc[key].totalHolding * transaction.price
        acc[key].prices.push(transaction.price)
        return acc
      },
      {} as Record<
        string,
        {
          name: string
          code: string
          totalHolding: number
          totalValue: number
          prices: number[]
        }
      >
    )

    const holdings = Object.values(stockHoldings)
    const totalStocks = holdings.length
    const totalValue = holdings.reduce(
      (sum, stock) => sum + stock.totalValue,
      0
    )

    // 找出持股最多的股票
    const topHolding = holdings.reduce(
      (max, stock) =>
        stock.totalHolding > max.holding
          ? { name: stock.name, code: stock.code, holding: stock.totalHolding }
          : max,
      { name: '-', code: '-', holding: 0 }
    )

    // 计算平均股价
    const allPrices = dataToUse.map(t => t.price)
    const avgPrice =
      allPrices.length > 0
        ? allPrices.reduce((sum, price) => sum + price, 0) / allPrices.length
        : 0

    return {
      totalStocks,
      totalValue,
      topHolding,
      avgPrice,
    }
  }, [data, filteredData])

  // 交易记录表格列
  const transactionColumns: ColumnDef<Transaction>[] = [
    {
      accessorKey: 'asset_id',
      enableHiding: false,
      header: () => {
        return <div className="text-center">ID</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.asset_id}</div>
      },
    },
    {
      accessorKey: 'asset_name',
      enableHiding: false,
      header: () => {
        return <div className="text-center">Name</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.asset_name}</div>
      },
    },
    {
      accessorKey: 'asset_code',
      enableHiding: false,
      header: () => {
        return <div className="text-center">Code</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.asset_code}</div>
      },
    },
    {
      accessorKey: 'asset_type_name',
      enableHiding: false,
      header: () => {
        return <div className="text-center">Type</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.asset_type_name}</div>
      },
    },
    {
      accessorKey: 'transaction_type',
      enableHiding: false,
      header: () => {
        return <div className="text-center">Transaction Type</div>
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.original.transaction_type}</div>
        )
      },
    },
    {
      accessorKey: 'quantity',
      enableHiding: false,
      header: () => {
        return <div className="text-center">Quantity</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.quantity}</div>
      },
    },
    {
      accessorKey: 'price',
      enableHiding: false,
      header: () => {
        return <div className="text-center">Price</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.price}</div>
      },
    },
    {
      accessorKey: 'transaction_date',
      enableHiding: false,
      header: () => {
        return <div className="text-center">Transaction Date</div>
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.original.transaction_date}</div>
        )
      },
    },
    {
      accessorKey: 'holding',
      enableHiding: false,
      header: () => {
        return <div className="text-center">Holding</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.holding}</div>
      },
    },
    {
      accessorKey: 'description',
      enableHiding: false,
      header: () => {
        return <div className="text-center">Description</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.description}</div>
      },
    },
  ]

  // 持仓表格列
  const holdingsColumns: ColumnDef<Holding>[] = [
    {
      accessorKey: 'asset_id',
      enableHiding: false,
      header: () => {
        return <div className="text-center">ID</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.asset_id}</div>
      },
    },
    {
      accessorKey: 'asset_name',
      enableHiding: false,
      header: () => {
        return <div className="text-center">股票名称</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.asset_name}</div>
      },
    },
    {
      accessorKey: 'asset_code',
      enableHiding: false,
      header: () => {
        return <div className="text-center">股票代码</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.asset_code}</div>
      },
    },
    {
      accessorKey: 'holding',
      enableHiding: false,
      header: () => {
        return <div className="text-center">持仓数量</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.holding}</div>
      },
    },
    {
      accessorKey: 'current_price',
      enableHiding: false,
      header: () => {
        return <div className="text-center">当前价格</div>
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">
            ${row.original.current_price.toFixed(2)}
          </div>
        )
      },
    },
    {
      accessorKey: 'avg_price',
      enableHiding: false,
      header: () => {
        return <div className="text-center">平均成本</div>
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">
            ${row.original.avg_price.toFixed(2)}
          </div>
        )
      },
    },
    {
      accessorKey: 'total_value',
      enableHiding: false,
      header: () => {
        return <div className="text-center">总价值</div>
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">
            $
            {row.original.total_value.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        )
      },
    },
    {
      accessorKey: 'transaction_count',
      enableHiding: false,
      header: () => {
        return <div className="text-center">交易次数</div>
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.original.transaction_count}</div>
        )
      },
    },
  ]

  return (
    <div className="p-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">持有股票数目</CardTitle>
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
            <div className="text-2xl font-bold">{stockStats.totalStocks}</div>
            <p className="text-xs text-muted-foreground">只不同的股票</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总市值</CardTitle>
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
              $
              {stockStats.totalValue.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground">总持仓价值</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">最大持股</CardTitle>
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
              {stockStats.topHolding.code}
            </div>
            <p className="text-xs text-muted-foreground">
              {stockStats.topHolding.name} ({stockStats.topHolding.holding} 股)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均股价</CardTitle>
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
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stockStats.avgPrice.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">每股平均价格</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4">
            <CardTitle>Stock Data</CardTitle>
            {/* 切换按钮 */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                onClick={() => setViewMode('holdings')}
                variant={viewMode === 'holdings' ? 'default' : 'ghost'}
                size="sm"
                className="text-sm"
              >
                持仓状况
              </Button>
              <Button
                onClick={() => setViewMode('transactions')}
                variant={viewMode === 'transactions' ? 'default' : 'ghost'}
                size="sm"
                className="text-sm"
              >
                交易记录
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder={
                viewMode === 'holdings'
                  ? '搜索股票名称、代码...'
                  : '搜索股票名称、代码或描述...'
              }
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              className="w-64"
            />
            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              )}
              刷新
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'holdings' ? (
            <DataTable
              columns={holdingsColumns as any}
              currentPage={currentPage}
              data={getHoldingsData as any}
              pageSize={pageSize}
              pageSizeOptions={pageSizeOptions}
              total={getHoldingsData.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          ) : (
            <DataTable
              columns={transactionColumns}
              currentPage={currentPage}
              data={searchQuery ? filteredData : data}
              pageSize={pageSize}
              pageSizeOptions={pageSizeOptions}
              total={searchQuery ? filteredData.length : total}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
