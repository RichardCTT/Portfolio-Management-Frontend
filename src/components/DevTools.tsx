import { Button } from '@/components/ui/button'
import { FirstVisitManager } from '@/utils/firstVisit'
import { useNavigate } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'

export default function DevTools() {
  const navigate = useNavigate()

  const handleResetWelcome = () => {
    FirstVisitManager.resetVisitStatus()
    navigate('/welcome')
  }

  // 只在开发环境显示
  if (import.meta.env.PROD) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleResetWelcome}
        variant="outline"
        size="sm"
        className="bg-gray-900 text-gray-100 border-gray-600 hover:bg-gray-800"
        title="重新显示欢迎页面"
      >
        <RotateCcw className="w-4 h-4 mr-1" />
        Welcome
      </Button>
    </div>
  )
}
