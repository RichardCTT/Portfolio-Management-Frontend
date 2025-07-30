/**
 * 获取指定月份的第一天和最后一天
 * @param date 可选，指定日期，默认为当前日期
 * @returns 返回包含第一天和最后一天字符串的对象
 */
export const getMonthFirstLastDay = (date?: Date) => {
  const targetDate = date || new Date()
  const year = targetDate.getFullYear()
  const month = targetDate.getMonth()

  // 本月第一天
  const firstDay = new Date(year, month, 1)

  // 本月最后一天 (下个月的第0天就是本月最后一天)
  const lastDay = new Date(year, month + 1, 0)

  // 使用本地时间格式化，避免时区问题
  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const firstDayStr = formatDate(firstDay)
  const lastDayStr = formatDate(lastDay)

  return {
    firstDay: firstDayStr,
    lastDay: lastDayStr,
    startDate: firstDayStr, // 别名，方便API调用
    endDate: lastDayStr, // 别名，方便API调用
  }
}

/**
 * 获取当前月份的第一天和最后一天
 * @returns 返回包含第一天和最后一天字符串的对象
 */
export const getCurrentMonthFirstLastDay = () => {
  return getMonthFirstLastDay()
}

/**
 * 获取指定年月的第一天和最后一天
 * @param year 年份
 * @param month 月份 (1-12)
 * @returns 返回包含第一天和最后一天字符串的对象
 */
export const getSpecificMonthFirstLastDay = (year: number, month: number) => {
  // 注意：Date构造函数中月份是从0开始的，所以要减1
  const date = new Date(year, month - 1, 1)
  return getMonthFirstLastDay(date)
}
