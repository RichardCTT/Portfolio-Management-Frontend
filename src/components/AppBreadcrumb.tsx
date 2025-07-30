import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'

export default function AppBreadcrumb() {
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)
  
  // 构建面包屑项目
  const breadcrumbItems = []
  
  // 始终添加首页
  breadcrumbItems.push({
    label: 'Dashboard',
    path: '/',
    isLast: pathParts.length === 0
  })
  
  // 添加路径中的每一层
  if (pathParts.length > 0) {
    pathParts.forEach((part, index) => {
      const isLast = index === pathParts.length - 1
      const path = '/' + pathParts.slice(0, index + 1).join('/')
      
      breadcrumbItems.push({
        label: formatLabel(part),
        path: path,
        isLast: isLast
      })
    })
  }

  return (
    <Breadcrumb className="breadcrumb-enhanced">
      <BreadcrumbList className="flex items-center">
        {breadcrumbItems.map((item) => (
          <React.Fragment key={item.path}>
            <BreadcrumbItem className="breadcrumb-item">
              {item.isLast ? (
                <BreadcrumbPage className="text-foreground font-semibold px-2 py-1 bg-accent/30 rounded-md">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link 
                    to={item.path}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium hover:bg-accent/50 px-2 py-1 rounded-md"
                  >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && (
              <BreadcrumbSeparator className="text-muted-foreground/50" />
            )}
          </React.Fragment>
        ))}
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
