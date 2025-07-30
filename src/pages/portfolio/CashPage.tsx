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
import {
  getTransationsByTypeAPI,
  type Transaction,
} from '@/services/portfolioApi'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ColumnDef } from '@tanstack/react-table'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  amount: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a number greater than 0.',
  }),
})

export default function CashPage() {
  const [data, setData] = useState<Transaction[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const pageSizeOptions = [10, 50, 100]

  const getCashTransactions = async (currentPage: number, pageSize: number) => {
    const res = await getTransationsByTypeAPI('cash', currentPage, pageSize)
    if (res.success) {
      setData(res.data.transactions)
      setTotal(res.data.total_transactions)
    } else {
      console.error('Get cash transactions failed', res.message)
    }
  }

  useEffect(() => {
    getCashTransactions(currentPage, pageSize)
  }, [currentPage, pageSize])

  const [isAddCashDialogOpen, setIsAddCashDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: '',
    },
  })

  useEffect(() => {
    if (isAddCashDialogOpen) {
      form.reset({ amount: '' })
      form.clearErrors()
    }
  }, [isAddCashDialogOpen, form])

  const isLoading = form.formState.isSubmitting

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // const res = await addCashAPI({
    //   amount: data.amount,
    // })
    const amountAsNumber = Number(data.amount)
    const res = { code: 200 }
    if (res.code === 200) {
      // TODO: Inform user add cash successfully
      console.log('###', `Add amount: ${amountAsNumber}`)
      setIsAddCashDialogOpen(false)
    } else {
      // TODO: Inform user did not add cash successfully
    }
  }

  const columns: ColumnDef<Transaction>[] = [
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

  return (
    <>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Cash Holdings</CardTitle>
          <Button onClick={() => setIsAddCashDialogOpen(true)}>Add Cash</Button>
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
      <Dialog open={isAddCashDialogOpen} onOpenChange={setIsAddCashDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Cash</DialogTitle>
            <DialogDescription>
              Enter the amount to add to your cash holdings.
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
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="amount">Amount</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
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
    </>
  )
}
