import { Github } from "lucide-react"


export default function AppFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 px-6 py-4 mt-auto">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span>© 2025 Portfolio Manager</span>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="#" 
            className="hover:text-gray-900 transition-colors"
          >
            Help
          </a>
          <span className="text-gray-400">|</span>
          <a 
            href="#" 
            className="hover:text-gray-900 transition-colors"
          >
            About
          </a>
          <span className="text-gray-400">|</span>
          <a 
            href="#" 
            className="hover:text-gray-900 transition-colors"
          >
            Contact us
          </a>
          <span className="text-gray-400">|</span>
          <a 
            href="https://github.com/RichardCTT/Portfolio-Management-Frontend" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors flex items-center"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
