import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { usePortfolioStore } from '@/store/portfolioStore'
import { useState } from 'react'

interface AddCashModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddCashModal({ open, onOpenChange }: AddCashModalProps) {
  const [amount, setAmount] = useState('')
  const { add } = usePortfolioStore()

  // TODO: validate the input
  const handleSubmit = async () => {
    if (!amount || isNaN(+amount)) return
    await add({
      ticker: 'USD',
      quantity: +amount,
      type: 'cash',
      dateAdded: new Date().toISOString().slice(0, 10),
    })
    setAmount('')
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Cash</DialogTitle>
          <DialogDescription>
            Enter the amount to add to your cash holdings.
          </DialogDescription>
        </DialogHeader>

        {/* TODO: limit the input and it can be double */}
        <Input
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type='number'
        />

        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
