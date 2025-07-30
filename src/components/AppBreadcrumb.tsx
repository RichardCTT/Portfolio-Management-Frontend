import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link, useLocation } from 'react-router-dom'

export default function AppBreadcrumb() {
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const lastPart = pathParts[pathParts.length - 1] || 'home'

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {lastPart !== 'home' && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{formatLabel(lastPart)}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function formatLabel(str: string) {
  const labelMap: Record<string, string> = {
    stock: 'Stock',
    bond: 'Bond',
    cash: 'Cash',
    trades: 'Trades',
    portfolio: 'Portfolio',
  }
  return labelMap[str.toLowerCase()] || capitalize(str)
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
