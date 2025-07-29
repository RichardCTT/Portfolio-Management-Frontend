import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FirstVisitManager } from '@/utils/firstVisit'

export default function InitialRedirect() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // 只在根路径执行重定向逻辑
    if (location.pathname === '/') {
      if (FirstVisitManager.isFirstVisit()) {
        // 首次访问，重定向到欢迎页面
        navigate('/welcome', { replace: true })
      }
      // 如果不是首次访问，保持在根路径即可
    }
  }, [navigate, location.pathname])

  return null // 这个组件不渲染任何内容
}
