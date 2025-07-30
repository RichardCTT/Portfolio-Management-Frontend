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
import { assetsApi, portfolioAnalysisApi, transactionsApi } from '@/lib/request'
import { getCurrentMonthFirstLastDay } from '@/utils/getFirstLastDay'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  List,
  Calendar,
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
import { set } from 'react-hook-form'

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
  const [chartData, setChartData] = useState([])
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cash Management
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Cash Balance Card */}
        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"></div>
          <CardContent className="relative p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-blue-100 text-xs font-medium">
                  Cash Balance
                </p>
                <p className="text-2xl font-bold">
                  ${balance.toLocaleString()}
                </p>
              </div>
              <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Wallet className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Income Card */}
        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-green-700"></div>
          <CardContent className="relative p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-green-100 text-xs font-medium">
                  Monthly Income
                </p>
                <p className="text-2xl font-bold">
                  ${inComeThisMonth.toLocaleString()}
                </p>
              </div>
              <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <TrendingUp className="h-3 w-3 text-green-200 mr-1" />
              <span className="text-green-200 text-xs">Income this month</span>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Expenses Card */}
        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700"></div>
          <CardContent className="relative p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-red-100 text-xs font-medium">
                  Monthly Expenses
                </p>
                <p className="text-2xl font-bold">
                  ${expensesThisMonth.toLocaleString()}
                </p>
              </div>
              <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <TrendingDown className="h-3 w-3 text-red-200 mr-1" />
              <span className="text-red-200 text-xs">Expenses this month</span>
            </div>
          </CardContent>
        </Card>

        {/* Net Cash Flow Card */}
        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div
            className={`absolute inset-0 ${
              inComeThisMonth - expensesThisMonth >= 0
                ? 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700'
                : 'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700'
            }`}
          ></div>
          <CardContent className="relative p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p
                  className={`text-xs font-medium ${inComeThisMonth - expensesThisMonth >= 0 ? 'text-emerald-100' : 'text-orange-100'}`}
                >
                  Net Cash Flow
                </p>
                <p className="text-2xl font-bold">
                  ${(inComeThisMonth - expensesThisMonth).toLocaleString()}
                </p>
              </div>
              <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              {inComeThisMonth - expensesThisMonth >= 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-emerald-200 mr-1" />
                  <span className="text-emerald-200 text-xs">
                    Positive cash flow
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-orange-200 mr-1" />
                  <span className="text-orange-200 text-xs">
                    Negative cash flow
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Chart/Table */}
      <div className="mt-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {viewMode === 'chart'
                    ? 'Cash Balance Trend'
                    : 'Transaction History'}
                </h2>
              </div>
              <div className="flex gap-2 items-center">

                {/* View Mode Selector */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'chart' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('chart')}
                    className="flex items-center gap-2"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Chart
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="flex items-center gap-2"
                  >
                    <List className="h-4 w-4" />
                    Table
                  </Button>
                </div>
              </div>
            </div>

            {viewMode === 'chart' ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={cashFlowData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="date"
                      stroke="#666"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#666"
                      fontSize={12}
                      tickLine={false}
                      tickFormatter={value => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                      formatter={(value: number) => [
                        `$${value.toLocaleString()}`,
                        'Cash Balance',
                      ]}
                      labelStyle={{ color: '#374151' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{
                        r: 6,
                        stroke: '#3b82f6',
                        strokeWidth: 2,
                        fill: 'white',
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold text-gray-700">
                          Date
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          Type
                        </TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">
                          Amount
                        </TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">
                          Balance
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableTransactions.length > 0 ? (
                        tableTransactions.map(
                          (transaction: any, index: number) => (
                            <TableRow key={transaction.id || index}>
                              <TableCell className="font-medium">
                                {new Date(
                                  transaction.transaction_date
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    transaction.transaction_type === 'IN'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {transaction.transaction_type === 'IN'
                                    ? 'Deposit'
                                    : 'Withdrawal'}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <span
                                  className={
                                    transaction.transaction_type === 'IN'
                                      ? 'text-green-600'
                                      : 'text-red-600'
                                  }
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
                              <TableCell className="text-right font-medium">
                                ${transaction.balance?.toLocaleString() || '0'}
                              </TableCell>
                            </TableRow>
                          )
                        )
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center py-8 text-gray-500"
                          >
                            No transactions found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 px-2">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      Showing {(currentPage - 1) * pageSize + 1} to{' '}
                      {Math.min(currentPage * pageSize, totalTransactions)} of{' '}
                      {totalTransactions} transactions
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Show:</span>
                      <Select value={pageSize.toString()} onValueChange={(value) => {
                        setPageSize(Number(value));
                        setCurrentPage(1); // 重置到第一页
                      }}>
                        <SelectTrigger className="w-16 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-gray-500">per page</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 h-8 px-3"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <span className="text-sm text-gray-500 px-3">
                      Page {currentPage} of {totalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 h-8 px-3"
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
  )
}

export default CashPage
