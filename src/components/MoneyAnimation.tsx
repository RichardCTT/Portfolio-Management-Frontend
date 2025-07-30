import { useEffect, useState } from 'react'

interface MoneyAnimationProps {
  progress: number
}

export default function MoneyAnimation({ progress }: MoneyAnimationProps) {
  const [moneyCount, setMoneyCount] = useState(0)

  useEffect(() => {
    // 根据进度增加金钱数量
    const count = Math.floor(progress / 20) + 1 // 每20%进度增加一个金钱
    setMoneyCount(Math.min(count, 5))
  }, [progress])

  const moneyEmojis = ['💰', '💵', '💴', '💶', '💷']

  return (
    <div className="w-96 mx-auto">
      {' '}
      {/* 增加容器宽度，给钱包更多显示空间 */}
      <div className="money-animation">
        {/* 动态生成的飞行金钱 */}
        {Array.from({ length: moneyCount }, (_, i) => (
          <div
            key={i}
            className="money"
            style={{
              animationDelay: `${i * 0.3}s`,
              fontSize: i === 0 ? '2rem' : '1.5rem', // 第一个更大
            }}
          >
            {moneyEmojis[i]}
          </div>
        ))}

        {/* 钱包 - 根据进度改变大小 */}
        <div
          className="wallet"
          style={{
            fontSize: `${2 + progress / 50}rem`, // 随进度变大
            filter: progress > 80 ? 'drop-shadow(0 0 10px gold)' : 'none', // 快完成时发光
          }}
        >
          👛
        </div>
      </div>
    </div>
  )
}
