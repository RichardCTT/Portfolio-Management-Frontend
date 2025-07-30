import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectItem } from '@radix-ui/react-select'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface DataTablePaginationProps {
  total: number
  currentPage: number
  pageSize: number
  pageSizeOptions: number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function DataTablePagination({
  total,
  currentPage,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const pages = Math.ceil(total / pageSize)
  const [inputValue, setInputValue] = useState<string>(currentPage.toString())

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^\d+$/.test(value)) {
      setInputValue(value)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue.length > 0 && e.key === 'Enter') {
      onPageChange(Math.min(Math.max(parseInt(inputValue), 1), pages))
    }
  }

  useEffect(() => {
    setInputValue(currentPage.toString())
  }, [currentPage])

  return (
    <div className='flex items-center justify-between px-2'>
      <div className='hidden md:block flex-1 text-sm text-muted-foreground'>
        Total: {total}
      </div>
      <div className='flex mx-auto flex-col-reverse gap-y-4 md:flex-row items-center md:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              const pageSize: number = parseInt(value, 10)
              if (currentPage > Math.ceil(total / pageSize)) {
                onPageChange(Math.ceil(total / pageSize))
              }
              onPageSizeChange(pageSize)
            }}
          >
            <SelectTrigger className='h-8 w-[100px]'>
              {/* TODO: There is a bug in here, the placeholder is not showing as expected. */}
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent side='top'>
              {pageSizeOptions.map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize} / page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 md:flex'
            onClick={() => onPageChange(1)}
            disabled={currentPage <= 1}
          >
            <span className='sr-only'>First Page</span>
            <ChevronsLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <span className='sr-only'>Previous Page</span>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
            <div className='mx-2 h-8 flex-1'>
              <Input
                className='h-full w-full px-2 text-right'
                type='number'
                min='1'
                max={pages}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
              />
            </div>
            <span> / {pages}</span>
          </div>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= pages}
          >
            <span className='sr-only'>Next Page</span>
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 md:flex'
            onClick={() => onPageChange(pages)}
            disabled={currentPage >= pages}
          >
            <span className='sr-only'>Last Page</span>
            <ChevronsRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
