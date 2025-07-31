import { useEffect, useState } from 'react'
import { TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FirstVisitManager } from '@/utils/firstVisit'
import MoneyAnimation from './MoneyAnimation'

interface SplashScreenProps {
  onFinish: () => void
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  // 循环播放的宣传文案 (替换原来的加载步骤)
  const slogans = [
    '📊 Real-time market insights at your fingertips',
    '💰 Maximize your investment returns today',
    '🚀 Advanced analytics for smart investing',
    '🛡️ Secure and professional portfolio management',
    '⚡ Lightning-fast trade execution',
    '🎯 Data-driven investment strategies',
    '💎 Discover hidden investment opportunities',
    '📈 Track your wealth growth in real-time',
    '🌟 Smart portfolio diversification',
    '💡 AI-powered investment insights',
    '🔔 Real-time market alerts',
    '📱 Mobile-first trading experience',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          // 进度完成后显示按钮
          setTimeout(() => setShowButton(true), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  // 文案循环切换 (无限循环)
  useEffect(() => {
    const sloganTimer = setInterval(() => {
      setCurrentSloganIndex(prev => (prev + 1) % slogans.length)
    }, 1500) // 每1.5秒切换一次文案，更快节奏

    return () => clearInterval(sloganTimer)
  }, [slogans.length])

  const handleGetStarted = () => {
    // 标记为已访问
    FirstVisitManager.markAsVisited()
    setShowButton(false)
    setIsExiting(true)

    // 向上滑动动画完成后切换页面
    setTimeout(() => {
      onFinish()
    }, 800) // 与动画时间同步
  }

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center z-50 transition-all duration-800 ease-in-out ${
        isExiting
          ? 'transform -translate-y-full opacity-0'
          : 'transform translate-y-0 opacity-100'
      }`}
    >
      {/* 背景动画点 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gray-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-600 to-slate-600 rounded-2xl flex items-center justify-center shadow-xl">
              <TrendingUp className="w-12 h-12 text-gray-200" />
            </div>
            {/* 脉冲动画 */}
            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-gray-600 to-slate-600 rounded-2xl animate-ping opacity-20"></div>
          </div>
          <div>
            <h1 className="text-6xl font-bold text-gray-100 glow-text">
              Portfolio Manager
            </h1>
          </div>
        </div>

        {/* 当前文案 */}
        <div className="flex items-center justify-center space-x-3 text-gray-100">
          <div className="text-gray-400 animate-bounce">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-lg font-medium">
            {slogans[currentSloganIndex]}
          </span>
        </div>

        {/* 金钱飞行动画 */}
        <MoneyAnimation progress={progress} />

        {/* Get Started 按钮 */}
        {showButton && (
          <div className="animate-fade-in">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-gray-700 to-slate-700 hover:from-gray-600 hover:to-slate-600 text-gray-100 font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-gray-600"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-gray-400 text-sm mt-3">
              Ready to manage your portfolio
            </p>
          </div>
        )}

        {/* 特性列表（仅在显示按钮时显示） */}
        {showButton && (
          <div className="grid grid-cols-2 gap-4 text-gray-400 text-sm max-w-md mx-auto">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span>Real-time Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span>Portfolio Analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span>Risk Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span>Secure Trading</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
