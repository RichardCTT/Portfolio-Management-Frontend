import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  getTransationsByTypeAPI,
  type Transaction,
} from '@/services/portfolioApi'
import type { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

export default function BondPage() {
  const [data, setData] = useState<Transaction[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const pageSizeOptions = [10, 50, 100]

  const getBondTransactions = async (currentPage: number, pageSize: number) => {
    const res = await getTransationsByTypeAPI('bond', currentPage, pageSize)
    if (res.success) {
      setData(res.data.transactions)
      setTotal(res.data.total_transactions)
    } else {
      console.error('Get bond transactions failed', res.message)
    }
  }

  useEffect(() => {
    getBondTransactions(currentPage, pageSize)
  }, [currentPage, pageSize])

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
          <CardTitle>Bond Holdings</CardTitle>
          <Button
            onClick={() => console.log('###', 'you clicked search button')}
          >
            Search??
          </Button>
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
    </>
  )
}
