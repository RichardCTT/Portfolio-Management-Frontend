import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import {
  getAssetsAPI,
  tradeTransactionAPI,
  type Asset,
} from '@/services/tradesApi'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ColumnDef } from '@tanstack/react-table'
import { 
  Loader2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight 
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  direction: z.enum(['buy', 'sell']),
  amount: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a number greater than 0.',
  }),
  shares: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Shares must be a number greater than 0.',
  }),
})

export default function TradesPage() {
  const [data, setData] = useState<Asset[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(15)
  const pageSizeOptions = [10, 50, 100]

  const getAssets = async (currentPage: number, pageSize: number) => {
    const res = await getAssetsAPI(currentPage, pageSize)
    if (res.code === 200) {
      setData(res.data.items.filter(item => item.id !== 1))
      setTotal(Math.max(res.data.total - 1, 0))
    } else {
      console.error('Get assets failed', res.message)
    }
  }

  useEffect(() => {
    getAssets(currentPage, pageSize)
  }, [currentPage, pageSize])

  const [selectedAsset, setSelectedAsset] = useState<Asset>()
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      direction: 'buy',
      amount: '',
      shares: '',
    },
    mode: 'onBlur',
  })

  useEffect(() => {
    if (isTradeDialogOpen) {
      form.reset({
        direction: 'buy',
        amount: '',
        shares: '',
      })
      form.clearErrors()
    } else {
      setSelectedAsset(undefined)
    }
  }, [isTradeDialogOpen, form])

  const amount = form.watch('amount')
  const shares = form.watch('shares')
  const isLoading = form.formState.isSubmitting

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const amountAsNumber = Number(data.amount)
    const sharesAsNumber = Number(data.shares)
    const date = new Date().toISOString().slice(0, 10)
    const res = await tradeTransactionAPI(data.direction, {
      asset_id: selectedAsset!.id,
      quantity: sharesAsNumber,
      date: date,
      description: `${capitalize(data.direction)} ${sharesAsNumber} shares of ${selectedAsset!.name} (${selectedAsset!.code}) at $${amountAsNumber} per share on ${date}`,
    })
    if (res.code === 201) {
      // TODO: Inform user add cash successfully
      setIsTradeDialogOpen(false)
      getAssets(currentPage, pageSize)
    } else {
      // TODO: Inform user did not add cash successfully
    }
  }

  const columns: ColumnDef<Asset>[] = [
    {
      accessorKey: 'name',
      enableHiding: false,
      header: () => {
        return (
          <div className="flex items-center justify-center gap-2 font-semibold">
            <Activity className="w-4 h-4" />
            Asset Name
          </div>
        )
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <div className="font-medium text-foreground">{row.original.name}</div>
            <div className="text-xs text-muted-foreground">{row.original.code}</div>
          </div>
        )
      },
    },
    {
      accessorKey: 'current_price',
      enableHiding: false,
      header: () => {
        return (
          <div className="flex items-center justify-center gap-2 font-semibold">
            <DollarSign className="w-4 h-4" />
            Current Price
          </div>
        )
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <div className="font-mono font-medium text-foreground">
              ${Number(row.original.current_price).toFixed(2)}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'quantity',
      enableHiding: false,
      header: () => {
        return (
          <div className="flex items-center justify-center gap-2 font-semibold">
            Holdings
          </div>
        )
      },
      cell: ({ row }) => {
        const quantity = Number(row.original.quantity)
        return (
          <div className="text-center">
            <div className="font-medium text-foreground">
              {quantity > 0 ? quantity.toLocaleString() : '—'}
            </div>
            {quantity > 0 && (
              <div className="text-xs text-muted-foreground">shares</div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'average_position_price',
      enableHiding: false,
      header: () => {
        return (
          <div className="flex items-center justify-center gap-2 font-semibold">
            Avg. Cost
          </div>
        )
      },
      cell: ({ row }) => {
        const avgPrice = Number(row.original.average_position_price)
        const quantity = Number(row.original.quantity)
        return (
          <div className="text-center">
            {quantity > 0 ? (
              <div className="font-mono font-medium text-foreground">
                ${avgPrice.toFixed(2)}
              </div>
            ) : (
              <div className="text-muted-foreground">—</div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'price_change_percentage',
      enableHiding: false,
      header: () => {
        return (
          <div className="flex items-center justify-center gap-2 font-semibold">
            P&L
          </div>
        )
      },
      cell: ({ row }) => {
        const pnlPercentage = Number(row.original.price_change_percentage)
        const isPositive = pnlPercentage >= 0
        const quantity = Number(row.original.quantity)
        
        if (quantity === 0) {
          return <div className="text-center text-muted-foreground">—</div>
        }
        
        return (
          <div className="text-center">
            <Badge 
              variant={isPositive ? "default" : "destructive"}
              className={`font-mono ${
                isPositive 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {isPositive ? '+' : ''}{pnlPercentage.toFixed(2)}%
            </Badge>
          </div>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      header: () => {
        return (
          <div className="flex items-center justify-center gap-2 font-semibold">
            Actions
          </div>
        )
      },
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => {
                setIsTradeDialogOpen(true)
                setSelectedAsset(row.original)
              }}
            >
              <ArrowUpRight className="w-4 h-4 mr-1" />
              Trade
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      {/* 页面标题和描述 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Trading Center</h1>
        <p className="text-muted-foreground">
          Manage your portfolio by buying and selling assets. Track your holdings and performance.
        </p>
      </div>

      {/* 主要内容卡片 */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-accent/5">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Available Assets
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                View all tradeable assets and their current market information
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Market Data
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <DataTable
            columns={columns}
            currentPage={currentPage}
            data={data}
            pageSize={pageSize}
            pageSizeOptions={pageSizeOptions}
            total={total}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </CardContent>
      </Card>
      <Dialog open={isTradeDialogOpen} onOpenChange={setIsTradeDialogOpen}>
        <DialogContent className="sm:max-w-[480px] p-0">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6 rounded-t-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                {form.watch('direction') === 'buy' ? (
                  <ArrowUpRight className="w-5 h-5 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-red-500" />
                )}
                {form.watch('direction') === 'buy' ? 'Buy' : 'Sell'} {selectedAsset?.name}
              </DialogTitle>
              <DialogDescription className="text-base">
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="font-mono">
                    {selectedAsset?.code}
                  </Badge>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="font-semibold text-foreground">
                    ${Number(selectedAsset?.current_price || 0).toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">per share</span>
                </div>
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <div className="p-6 pt-2">
            <Form {...form}>
              <form
                className="space-y-6"
                autoComplete="off"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="direction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Transaction Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          className="flex gap-4"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                            <FormControl>
                              <RadioGroupItem value="buy" />
                            </FormControl>
                            <div className="flex items-center gap-2">
                              <ArrowUpRight className="w-4 h-4 text-green-500" />
                              <FormLabel className="mb-0 font-medium">Buy</FormLabel>
                            </div>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                            <FormControl>
                              <RadioGroupItem value="sell" />
                            </FormControl>
                            <div className="flex items-center gap-2">
                              <ArrowDownRight className="w-4 h-4 text-red-500" />
                              <FormLabel className="mb-0 font-medium">Sell</FormLabel>
                            </div>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Total Amount
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                            <Input
                              {...field}
                              id="amount"
                              className="pl-8 text-right font-mono"
                              placeholder="0.00"
                              onBlur={() => {
                                const amt = Number(amount)
                                if (!isNaN(amt) && amt > 0) {
                                  const calculatedShares =
                                    amt / selectedAsset!.current_price
                                  form.setValue(
                                    'shares',
                                    calculatedShares.toFixed(4),
                                    {
                                      shouldValidate: true,
                                    }
                                  )
                                }
                                field.onBlur()
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="shares"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Number of Shares</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="shares"
                            className="text-right font-mono"
                            placeholder="0"
                            onBlur={() => {
                              const shs = Number(shares)
                              if (!isNaN(shs) && shs > 0) {
                                const calculatedAmount =
                                  shs * selectedAsset!.current_price
                                form.setValue(
                                  'amount',
                                  calculatedAmount.toFixed(2),
                                  {
                                    shouldValidate: true,
                                  }
                                )
                              }
                              field.onBlur()
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* 交易摘要 */}
                {amount && shares && (
                  <div className="bg-accent/30 p-4 rounded-lg space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Transaction Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Shares:</span>
                        <span className="font-mono">{Number(shares).toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price per share:</span>
                        <span className="font-mono">${Number(selectedAsset?.current_price || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-1">
                        <span>Total:</span>
                        <span className="font-mono">${Number(amount).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 ${
                      form.watch('direction') === 'buy' 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white`}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {form.watch('direction') === 'buy' ? (
                      <>
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Buy Shares
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="w-4 h-4 mr-2" />
                        Sell Shares
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
