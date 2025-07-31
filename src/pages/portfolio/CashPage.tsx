import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  analysisApi,
  portfolioAnalysisApi,
  transactionsApi,
} from '@/lib/request'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  List,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface Transaction {
  id: number
  transaction_date: string
  transaction_type: string
  amount: number
  balance: number
  // 可以添加更多字段转换
}

const CashPage: React.FC = () => {
  const [balance, setBalance] = useState(0)
  const [inComeThisMonth, setInComeThisMonth] = useState(0)
  const [expensesThisMonth, setExpensesThisMonth] = useState(0)

  // 图表和表格的独立数据和状态
  const [tableTransactions, setTableTransactions] = useState<Transaction[]>([])
  const [cashFlowData, setCashFlowData] = useState<
    { date: string; amount: number }[]
  >([])
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart')

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [totalTransactions, setTotalTransactions] = useState(0)

  // Update Cards
  const upDateCards = async () => {
    try {
      const response = await transactionsApi.apiTransactionsCashSummaryGet() // 假设资产ID为1
      setBalance(response.data.data?.total_cash || 0)
      setInComeThisMonth(response.data.data?.monthly_income || 0)
      setExpensesThisMonth(response.data.data?.monthly_expense || 0)
    } catch (error) {
      console.error('Error fetching balance:', error)
      setBalance(0)
    }
  }
  useEffect(() => {
    upDateCards()
  }, [])

  // Update Table
  const fetchTableTransactions = async () => {
    try {
      const response =
        await portfolioAnalysisApi.apiPortfolioTransactionsByTypeAssetTypeIdGet(
          {
            assetTypeId: 1,
            page: currentPage,
            limit: pageSize,
          }
        )
      setTotalPages(
        Math.ceil((response.data.data?.total_transactions ?? 0) / pageSize) || 1
      )
      const transformedTransactions: Transaction[] =
        response.data.data?.transactions?.map((transaction: any) => ({
          id: transaction.id,
          transaction_date: transaction.date || transaction.transaction_date,
          transaction_type: transaction.type || transaction.transaction_type,
          amount: transaction.quantity,
          balance: transaction.holding || transaction.current_balance,
          // 可以添加更多字段转换
        })) || []
      setTableTransactions(transformedTransactions)
      setTotalTransactions(response.data.data?.total_transactions || 0)
    } catch (error) {
      console.error('Error fetching table transactions:', error)
      setTableTransactions([])
    }
  }

  useEffect(() => {
    fetchTableTransactions()
  }, [currentPage, pageSize, viewMode])

  // Update Chart
  const fetchCashFlowData = async () => {
    try {
      const response = await analysisApi.apiAnalysisDailyCashBalanceGet({
        days: 30,
      })
      const charData =
        response.data.data?.daily_balances?.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          amount: item.holding_end,
        })) || []
      setCashFlowData(charData)
    } catch (error) {
      console.error('Error fetching cash flow data:', error)
      setCashFlowData([])
    }
  }
  useEffect(() => {
    fetchCashFlowData()
  }, [viewMode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2">
                Cash Management
              </h1>
              <p className="text-gray-600 text-lg">
                Monitor your cash flow and transactions
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cash Balance Card */}
          <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
            <CardContent className="relative p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse"></div>
                    <p className="text-blue-100 text-sm font-medium tracking-wide">
                      Cash Balance
                    </p>
                  </div>
                  <p className="text-3xl font-bold tracking-tight">
                    ${balance.toLocaleString()}
                  </p>
                </div>
                <div className="h-14 w-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Wallet className="h-7 w-7 text-white drop-shadow-sm" />
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <div className="h-1 w-12 bg-blue-200/50 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-blue-200 rounded-full transform origin-left animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Income Card */}
          <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
            <CardContent className="relative p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-200 rounded-full animate-pulse"></div>
                    <p className="text-emerald-100 text-sm font-medium tracking-wide">
                      Monthly Income
                    </p>
                  </div>
                  <p className="text-3xl font-bold tracking-tight">
                    ${inComeThisMonth.toLocaleString()}
                  </p>
                </div>
                <div className="h-14 w-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7 text-white drop-shadow-sm" />
                </div>
              </div>
              <div className="mt-6 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-emerald-200" />
                <span className="text-emerald-200 text-sm font-medium">
                  Income this month
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Expenses Card */}
          <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-red-600 to-pink-700"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
            <CardContent className="relative p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-rose-200 rounded-full animate-pulse"></div>
                    <p className="text-rose-100 text-sm font-medium tracking-wide">
                      Monthly Expenses
                    </p>
                  </div>
                  <p className="text-3xl font-bold tracking-tight">
                    ${expensesThisMonth.toLocaleString()}
                  </p>
                </div>
                <div className="h-14 w-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingDown className="h-7 w-7 text-white drop-shadow-sm" />
                </div>
              </div>
              <div className="mt-6 flex items-center space-x-2">
                <TrendingDown className="h-4 w-4 text-rose-200" />
                <span className="text-rose-200 text-sm font-medium">
                  Expenses this month
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Net Cash Flow Card */}
          <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div
              className={`absolute inset-0 ${
                inComeThisMonth - expensesThisMonth >= 0
                  ? 'bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700'
                  : 'bg-gradient-to-br from-amber-500 via-orange-600 to-red-700'
              }`}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
            <CardContent className="relative p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full animate-pulse ${inComeThisMonth - expensesThisMonth >= 0 ? 'bg-violet-200' : 'bg-amber-200'}`}
                    ></div>
                    <p
                      className={`text-sm font-medium tracking-wide ${inComeThisMonth - expensesThisMonth >= 0 ? 'text-violet-100' : 'text-amber-100'}`}
                    >
                      Net Cash Flow
                    </p>
                  </div>
                  <p className="text-3xl font-bold tracking-tight">
                    ${(inComeThisMonth - expensesThisMonth).toLocaleString()}
                  </p>
                </div>
                <div className="h-14 w-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-7 w-7 text-white drop-shadow-sm" />
                </div>
              </div>
              <div className="mt-6 flex items-center space-x-2">
                {inComeThisMonth - expensesThisMonth >= 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-violet-200" />
                    <span className="text-violet-200 text-sm font-medium">
                      Positive cash flow
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-amber-200" />
                    <span className="text-amber-200 text-sm font-medium">
                      Negative cash flow
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cash Flow Chart/Table */}
        <div className="mt-12">
          <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/80 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20"></div>
            <CardContent className="relative p-8">
              <div className="mb-8 flex justify-between items-center">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                    {viewMode === 'chart'
                      ? 'Cash Balance Trend'
                      : 'Transaction History'}
                  </h2>
                  <p className="text-gray-600">
                    {viewMode === 'chart'
                      ? 'Track your cash balance over time'
                      : 'Detailed view of all transactions'}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  {/* View Mode Selector */}
                  <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                    <Button
                      variant={viewMode === 'chart' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('chart')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        viewMode === 'chart'
                          ? 'bg-white shadow-md text-blue-600'
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      <BarChart3 className="h-4 w-4" />
                      Trend
                    </Button>
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        viewMode === 'table'
                          ? 'bg-white shadow-md text-blue-600'
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      <List className="h-4 w-4" />
                      Transaction
                    </Button>
                  </div>
                </div>
              </div>

              {viewMode === 'chart' ? (
                <div className="h-96 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={cashFlowData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient
                          id="cashFlowGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0.05}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                        strokeOpacity={0.6}
                      />
                      <XAxis
                        dataKey="date"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: '#64748b' }}
                      />
                      <YAxis
                        dataKey="amount"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: '#64748b' }}
                        tickFormatter={value => `$${value.toLocaleString()}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '16px',
                          boxShadow:
                            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                          backdropFilter: 'blur(10px)',
                        }}
                        formatter={(value: number) => [
                          `$${value.toLocaleString()}`,
                          'Cash Balance',
                        ]}
                        labelStyle={{ color: '#374151', fontWeight: 600 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="url(#lineGradient)"
                        strokeWidth={4}
                        dot={{
                          fill: '#3b82f6',
                          strokeWidth: 3,
                          r: 6,
                          filter:
                            'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))',
                        }}
                        activeDot={{
                          r: 8,
                          stroke: '#3b82f6',
                          strokeWidth: 3,
                          fill: 'white',
                          filter:
                            'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.4))',
                        }}
                        fill="url(#cashFlowGradient)"
                      />
                      <defs>
                        <linearGradient
                          id="lineGradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-gray-200/60 bg-gray-50/50">
                          <TableHead className="font-semibold text-gray-700 py-4 px-6">
                            Date
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 py-4 px-6">
                            Type
                          </TableHead>
                          <TableHead className="text-right font-semibold text-gray-700 py-4 px-6">
                            Amount
                          </TableHead>
                          <TableHead className="text-right font-semibold text-gray-700 py-4 px-6">
                            Balance
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tableTransactions.length > 0 ? (
                          tableTransactions.map(
                            (transaction: any, index: number) => (
                              <TableRow
                                key={transaction.id || index}
                                className="hover:bg-blue-50/30 transition-colors duration-200 border-b border-gray-100/60"
                              >
                                <TableCell className="font-medium py-4 px-6 text-gray-900">
                                  {new Date(
                                    transaction.transaction_date
                                  ).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                  <span
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                                      transaction.transaction_type === 'IN'
                                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                        : 'bg-rose-100 text-rose-700 border border-rose-200'
                                    }`}
                                  >
                                    {transaction.transaction_type === 'IN'
                                      ? 'Deposit'
                                      : 'Withdrawal'}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right py-4 px-6">
                                  <span
                                    className={`font-semibold ${
                                      transaction.transaction_type === 'IN'
                                        ? 'text-emerald-600'
                                        : 'text-rose-600'
                                    }`}
                                  >
                                    {transaction.transaction_type === 'IN'
                                      ? '+'
                                      : '-'}
                                    $
                                    {Math.abs(
                                      transaction.amount
                                    ).toLocaleString()}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right font-semibold py-4 px-6 text-gray-900">
                                  $
                                  {transaction.balance?.toLocaleString() || '0'}
                                </TableCell>
                              </TableRow>
                            )
                          )
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center py-12 text-gray-500"
                            >
                              <div className="flex flex-col items-center space-y-2">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                  <List className="h-6 w-6 text-gray-400" />
                                </div>
                                <p className="text-lg font-medium">
                                  No transactions found
                                </p>
                                <p className="text-sm">
                                  Your transaction history will appear here
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20">
                    <div className="flex items-center gap-6">
                      <div className="text-sm text-gray-600 font-medium">
                        Showing {(currentPage - 1) * pageSize + 1} to{' '}
                        {Math.min(currentPage * pageSize, totalTransactions)} of{' '}
                        {totalTransactions} transactions
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 font-medium">
                          Show:
                        </span>
                        <Select
                          value={pageSize.toString()}
                          onValueChange={value => {
                            setPageSize(Number(value))
                            setCurrentPage(1) // 重置到第一页
                          }}
                        >
                          <SelectTrigger className="w-20 h-10 bg-white/80 backdrop-blur-sm border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-gray-600 font-medium">
                          per page
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 h-10 px-4 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-blue-50 disabled:opacity-50 transition-all duration-200"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 font-medium px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200">
                          Page {currentPage} of {totalPages}
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 h-10 px-4 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-blue-50 disabled:opacity-50 transition-all duration-200"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CashPage
