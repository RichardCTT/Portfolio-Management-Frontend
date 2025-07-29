import { Route, Routes } from 'react-router-dom'
import SideBar from './components/SideBar'
import PortfolioPage from './pages/portfolio/PortfolioPage'
import ChartPage from './pages/portfolio/ChartPage'

function App() {
  return (
    <>
      <div className='flex h-screen'>
        <SideBar />
        <main className='flex-1 p-4'>
          <Routes>
            <Route
              path='/'
              element={<PortfolioPage />}
            />
            <Route
              path='/chart'
              element={<ChartPage />}
            />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
