import AppSideBar from '@/components/AppSideBar'

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
import { Route, Routes } from 'react-router-dom'
import AppBreadcrumb from './components/AppBreadcrumb'

function App() {
  return (
    <>
      <SidebarProvider className='flex h-screen'>
        <AppSideBar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 border-b'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mr-2 data-[orientation=vertical]:h-4'
              />
              <AppBreadcrumb />
            </div>
          </header>
          <div className='flex-1 p-4 overflow-y-auto'>
            <Routes>
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
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default App
