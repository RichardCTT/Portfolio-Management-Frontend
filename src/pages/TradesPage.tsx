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
import {
  getAssetsAPI,
  tradeTransactionAPI,
  type Asset,
} from '@/services/tradesApi'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ColumnDef } from '@tanstack/react-table'
import { Loader2 } from 'lucide-react'
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
      console.log('###1', res.data.items.length)
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
        return <div className="text-center">Name</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.name}</div>
      },
    },
    {
      accessorKey: 'current_price',
      enableHiding: false,
      header: () => {
        return <div className="text-center">Price</div>
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.current_price}</div>
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
      accessorKey: 'average_position_price',
      enableHiding: false,
      header: () => {
        return <div className="text-center">Average Cost</div>
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">
            {row.original.average_position_price}
          </div>
        )
      },
    },
    {
      accessorKey: 'price_change_percentage',
      enableHiding: false,
      header: () => {
        return <div className="text-center">P&L (%)</div>
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">
            {row.original.price_change_percentage}
          </div>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      header: () => {
        return <div className="text-center">Actions</div>
      },
      cell: ({ row }) => {
        return (
          <div className="flex text-center justify-center">
            <Button
              onClick={() => {
                setIsTradeDialogOpen(true)
                setSelectedAsset(row.original)
              }}
            >
              Buy / Sell
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Trades</CardTitle>
        </CardHeader>
        <CardContent>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Trade</DialogTitle>
            <DialogDescription>
              You are going to {form.watch('direction')} {selectedAsset?.name} (
              {selectedAsset?.code}).
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-8"
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="direction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="direction">Direction</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex gap-4"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="buy" />
                          </FormControl>
                          <FormLabel className="mb-0">Buy</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="sell" />
                          </FormControl>
                          <FormLabel className="mb-0">Sell</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="amount">Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="amount"
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
                    <FormLabel htmlFor="shares">Shares</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="shares"
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
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  className="mb-2 md:mb-0"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Confirm
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
