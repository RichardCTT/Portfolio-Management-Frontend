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
import OverviewPage from '@/pages/OverviewPage'
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
      <SidebarProvider className='flex h-screen'>
        <AppSideBar />

        <SidebarInset className='flex flex-col'>
          <header className='flex h-16 shrink-0 items-center gap-2'>

            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mr-2 data-[orientation=vertical]:h-4'
              />
              <AppBreadcrumb />
            </div>
          </header>

          <main className='flex-1 overflow-auto'>
            <InitialRedirect />
            <Routes>
              <Route
                path='/welcome'
                element={<SplashScreen onFinish={handleSplashFinish} />}
              />
              <Route

                path='/'
                element={<OverviewPage />}
              />
              <Route
                path='/portfolio/stock'
                element={<StockPage />}
              />
              <Route
                path='/portfolio/bond'
                element={<BondPage />}
              />
              <Route
                path='/portfolio/Cash'
                element={<CashPage />}
              />
              <Route
                path='/trades'
                element={<TradesPage />}
              />
            </Routes>

          </main>
          <AppFooter />

        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default App
