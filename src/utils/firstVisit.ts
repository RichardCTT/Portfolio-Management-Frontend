// 首次访问检测和管理
export class FirstVisitManager {
  private static readonly STORAGE_KEY = 'portfolio-manager-visited'
  
  /**
   * 检查是否是首次访问
   */
  static isFirstVisit(): boolean {
    return !localStorage.getItem(this.STORAGE_KEY)
  }
  
  /**
   * 标记已访问
   */
  static markAsVisited(): void {
    localStorage.setItem(this.STORAGE_KEY, 'true')
  }
  
  /**
   * 重置访问状态（用于测试或重新显示欢迎页面）
   */
  static resetVisitStatus(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }
  
  /**
   * 获取推荐的初始路径
   */
  static getInitialRoute(): string {
    return this.isFirstVisit() ? '/welcome' : '/'
  }
}

// 便捷导出
export const { isFirstVisit, markAsVisited, resetVisitStatus, getInitialRoute } = FirstVisitManager
