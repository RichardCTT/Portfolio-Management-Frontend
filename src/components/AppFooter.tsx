import { Github, Heart, HelpCircle, Info, Mail } from 'lucide-react'

export default function AppFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-background to-accent/10 border-t border-border/50 backdrop-blur-sm mt-8">
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* 主要内容区域 */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
          {/* 左侧：版权信息和品牌 */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">PM</span>
              </div>
              <span className="font-semibold text-foreground">
                Portfolio Manager
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>© {currentYear} Made with</span>
              <Heart className="w-3 h-3 mx-1 text-red-500 animate-pulse" />
              <span>by Jasper, Clementine, Grant, Haiyan, Richard</span>
            </div>
          </div>

          {/* 右侧：链接和操作 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
            {/* 快速链接 */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-accent/50 px-2 py-1.5 rounded-md group"
              >
                <HelpCircle className="w-3 h-3 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                <span>Help</span>
              </a>
              <div className="w-px h-4 bg-border hidden sm:block"></div>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-accent/50 px-2 py-1.5 rounded-md group"
              >
                <Info className="w-3 h-3 group-hover:text-green-500 transition-colors flex-shrink-0" />
                <span>About</span>
              </a>
              <div className="w-px h-4 bg-border hidden sm:block"></div>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-accent/50 px-2 py-1.5 rounded-md group"
              >
                <Mail className="w-3 h-3 group-hover:text-purple-500 transition-colors flex-shrink-0" />
                <span>Contact</span>
              </a>
            </div>

            {/* GitHub链接 */}
            <div className="flex items-center">
              <a
                href="https://github.com/richardsun-voyager/Portfolio-Management-Frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-accent/30 hover:bg-accent/60 px-3 py-2 rounded-lg transition-all duration-200 border border-border/50 hover:border-border overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-x-full transition-transform duration-500 group-hover:translate-x-full"></span>
                <Github className="w-4 h-4 relative z-10" />
                <span className="relative z-10">View on GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground/70">Built with</span>
              <span className="tech-badge">React</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">Tailwind CSS</span>
              <span className="tech-badge">Vite</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground/70">
              <span>Version</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full font-mono text-xs">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
