import PortfolioTable from '@/components/PortfolioTable'
import { usePortfolioStore } from '@/store/portfolioStore'
import { useEffect } from 'react'

export default function PortfolioPage() {
  const { items, fetch, remove } = usePortfolioStore()

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>My Portfolio</h1>
      <PortfolioTable
        data={items}
        onDelete={remove}
      />
    </>
  )
}
