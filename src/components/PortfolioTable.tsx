import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { PortfolioItem } from '@/types/portfolio'

interface PortfolioTableProps {
  data: PortfolioItem[]
  onDelete: (id: number) => void
}

export default function PortfolioTable({
  data,
  onDelete,
}: PortfolioTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ticker</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.ticker}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.dateAdded}</TableCell>
            <TableCell>
              <Button
                onClick={() => onDelete(item.id)}
                variant='destructive'
                size='sm'
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
