import { useEffect, useState } from 'react'
import { TrendingUp, DollarSign, BarChart3, PieChart, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FirstVisitManager } from '@/utils/firstVisit'

interface SplashScreenProps {
  onFinish: () => void
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [showButton, setShowButton] = useState(false)
  
  const steps = [
    { text: 'Initializing Portfolio Manager...', icon: <BarChart3 className="w-6 h-6" /> },
    { text: 'Loading market data...', icon: <TrendingUp className="w-6 h-6" /> },
    { text: 'Connecting to services...', icon: <DollarSign className="w-6 h-6" /> },
    { text: 'Preparing dashboard...', icon: <PieChart className="w-6 h-6" /> },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
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

  useEffect(() => {
    const stepIndex = Math.floor(progress / 25)
    setCurrentStep(Math.min(stepIndex, steps.length - 1))
  }, [progress, steps.length])

  const handleGetStarted = () => {
    // 标记为已访问
    FirstVisitManager.markAsVisited()
    setShowButton(false)
    setTimeout(onFinish, 300) // 短暂延迟后进入应用
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center z-50">
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
        <div className="flex items-center justify-center space-x-3">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-gray-200" />
            </div>
            {/* 脉冲动画 */}
            <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-xl animate-ping opacity-20"></div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-100">Portfolio Manager</h1>
            <p className="text-gray-400 text-lg">Professional Investment Platform</p>
          </div>
        </div>

        {/* 当前步骤 */}
        <div className="flex items-center justify-center space-x-3 text-gray-100">
          <div className="text-gray-400 animate-spin">
            {steps[currentStep]?.icon}
          </div>
          <span className="text-lg font-medium">{steps[currentStep]?.text}</span>
        </div>

        {/* 进度条 */}
        <div className="w-80 mx-auto space-y-2">
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-gray-500 to-slate-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>0%</span>
            <span className="font-medium">{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

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

        {/* 特性列表 */}
        {!showButton && (
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
