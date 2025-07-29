// 开屏页面配置选项
export interface SplashConfig {
  minDuration?: number      // 最小显示时间（毫秒）
  maxDuration?: number      // 最大显示时间（毫秒）
  showProgress?: boolean    // 是否显示进度条
  showSteps?: boolean       // 是否显示加载步骤
  showFeatures?: boolean    // 是否显示特性列表
  autoClose?: boolean       // 是否自动关闭
  appName?: string         // 应用名称
  subtitle?: string        // 副标题
}

export const defaultSplashConfig: SplashConfig = {
  minDuration: 2000,       // 最少显示2秒
  maxDuration: 5000,       // 最多显示5秒
  showProgress: true,
  showSteps: true,
  showFeatures: true,
  autoClose: true,
  appName: 'Portfolio Manager',
  subtitle: 'Professional Investment Platform'
}

// 可以在本地存储中保存用户偏好
export const getSplashConfig = (): SplashConfig => {
  const saved = localStorage.getItem('splash-config')
  if (saved) {
    return { ...defaultSplashConfig, ...JSON.parse(saved) }
  }
  return defaultSplashConfig
}

export const setSplashConfig = (config: Partial<SplashConfig>) => {
  const current = getSplashConfig()
  const updated = { ...current, ...config }
  localStorage.setItem('splash-config', JSON.stringify(updated))
}
