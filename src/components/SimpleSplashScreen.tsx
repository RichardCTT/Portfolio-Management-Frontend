import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'

interface SimpleSplashScreenProps {
  onFinish: () => void
  duration?: number
}

export default function SimpleSplashScreen({ onFinish, duration = 2000 }: SimpleSplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onFinish, 300) // 淡出动画时间
    }, duration)

    return () => clearTimeout(timer)
  }, [onFinish, duration])

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center z-50 transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-5xl font-bold text-white">Portfolio</h1>
            <h2 className="text-3xl font-light text-blue-200">Manager</h2>
          </div>
        </div>
        
        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
