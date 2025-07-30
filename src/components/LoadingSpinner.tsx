import { Loader2 } from 'lucide-react'

export function LoadingSpinner() {
  return (
    <div className='fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center'>
      <div className='flex flex-col items-center space-y-2'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-600' />
        <p className='text-sm text-gray-600'>Loading...</p>
      </div>
    </div>
  )
}
