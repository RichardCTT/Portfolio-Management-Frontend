import AppSideBar from '@/components/AppSideBar'
import AppFooter from '@/components/AppFooter'
import SplashScreen from '@/components/SplashScreen'
import InitialRedirect from '@/components/InitialRedirect'

import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import HomePage from '@/pages/HomePage'
import TradesPage from '@/pages/TradesPage'
import BondPage from '@/pages/portfolio/BondPage'
import CashPage from '@/pages/portfolio/CashPage'
import StockPage from '@/pages/portfolio/StockPage'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import AppBreadcrumb from './components/AppBreadcrumb'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleSplashFinish = () => {
    // 从开屏页面跳转到首页
    navigate('/')
  }

  // 如果当前路径是 /welcome，显示开屏页面
  if (location.pathname === '/welcome') {
    return <SplashScreen onFinish={handleSplashFinish} />
  }

  return (
    <>
      <SidebarProvider className="flex min-h-screen">
        <AppSideBar />

        <SidebarInset className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 header-shadow sticky top-0 z-40">
            <div className="flex items-center gap-3 px-4">
              <SidebarTrigger className="-ml-1 hover:bg-accent/80 transition-colors rounded-md" />
              <Separator
                orientation="vertical"
                className="mr-2 h-5 bg-border/50"
              />
              <AppBreadcrumb />
            </div>
          </header>

          <main className="flex-1 min-h-0">
            <div className="h-full">
              <InitialRedirect />
              <Routes>
                <Route
                  path="/welcome"
                  element={<SplashScreen onFinish={handleSplashFinish} />}
                />
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio/stock" element={<StockPage />} />
                <Route path="/portfolio/bond" element={<BondPage />} />
                <Route path="/portfolio/cash" element={<CashPage />} />
                <Route path="/trades" element={<TradesPage />} />
              </Routes>
            </div>
          </main>
          <AppFooter />
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default App
