import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  ArrowRightLeft,
  ChevronRight,
  Landmark,
  LayoutDashboard,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function AppSideBar() {
  const location = useLocation()
  
  const isActive = (path: string) => {
    return location.pathname === path
  }

  const isPortfolioActive = () => {
    return location.pathname.startsWith('/portfolio')
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-3 hover:bg-accent/50 transition-colors sidebar-brand"
            >
              <div className="flex justify-center w-full">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">PM</span>
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Portfolio
                  </span>
                </Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={`mb-2 ${isActive('/') ? 'sidebar-menu-item-active' : ''}`}>
              <Link to="/" className="text-base hover:bg-accent/80 rounded-lg transition-all duration-200 group">
                <LayoutDashboard className={`group-hover:text-blue-600 transition-colors ${isActive('/') ? 'text-blue-600' : ''}`} />
                <span className="font-medium">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible asChild defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Portfolio" className={`mb-2 hover:bg-accent/80 rounded-lg transition-all duration-200 group ${isPortfolioActive() ? 'sidebar-menu-item-active' : ''}`}>
                  <Landmark className={`group-hover:text-green-600 transition-colors ${isPortfolioActive() ? 'text-green-600' : ''}`} />
                  <span className="font-medium">Portfolio</span>
                  <ChevronRight className={`ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-hover:text-green-600 ${isPortfolioActive() ? 'text-green-600' : ''}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="ml-4 border-l-2 border-gray-200 dark:border-gray-700">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link
                        to="/portfolio/stock"
                        className={`text-sm hover:bg-accent/60 rounded-md transition-all duration-200 pl-4 hover:text-blue-600 hover:border-l-blue-500 sidebar-submenu-item ${
                          isActive('/portfolio/stock') ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/30' : ''
                        }`}
                      >
                        <span className={`w-2 h-2 bg-blue-500 rounded-full mr-2 ${isActive('/portfolio/stock') ? 'animate-pulse' : ''}`}></span>
                        Stock
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link
                        to="/portfolio/bond"
                        className={`text-sm hover:bg-accent/60 rounded-md transition-all duration-200 pl-4 hover:text-green-600 hover:border-l-green-500 sidebar-submenu-item ${
                          isActive('/portfolio/bond') ? 'bg-green-50 text-green-600 dark:bg-green-950/30' : ''
                        }`}
                      >
                        <span className={`w-2 h-2 bg-green-500 rounded-full mr-2 ${isActive('/portfolio/bond') ? 'animate-pulse' : ''}`}></span>
                        Bond
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link
                        to="/portfolio/cash"
                        className={`text-sm hover:bg-accent/60 rounded-md transition-all duration-200 pl-4 hover:text-yellow-600 hover:border-l-yellow-500 sidebar-submenu-item ${
                          isActive('/portfolio/cash') ? 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950/30' : ''
                        }`}
                      >
                        <span className={`w-2 h-2 bg-yellow-500 rounded-full mr-2 ${isActive('/portfolio/cash') ? 'animate-pulse' : ''}`}></span>
                        Cash
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className={`mb-2 ${isActive('/trades') ? 'sidebar-menu-item-active' : ''}`}>
              <Link to="/trades" className="text-base hover:bg-accent/80 rounded-lg transition-all duration-200 group">
                <ArrowRightLeft className={`group-hover:text-purple-600 transition-colors ${isActive('/trades') ? 'text-purple-600' : ''}`} />
                <span className="font-medium">Trades</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
