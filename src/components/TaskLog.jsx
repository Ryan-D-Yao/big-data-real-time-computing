import React, { useEffect, useState, useRef } from 'react'

const SYSTEM_MESSAGES = [
  '[SYSTEM] 发现小行星带，建议减速航行',
  '[NAVIGATION] 正在穿越柯伊伯带...',
  '[LIFE SUPPORT] 氧气循环系统运行正常',
  '[SHIELDS] 检测到微量辐射波动',
  '[ENGINE] 燃料消耗率：2.3%/h',
  '[COMMS] 收到来自地球的信号',
]

export default function TaskLog() {
  const [logs, setLogs] = useState([])
  const endRef = useRef(null)

  useEffect(() => {
    const push = () => {
      const msg = SYSTEM_MESSAGES[Math.floor(Math.random() * SYSTEM_MESSAGES.length)]
      const t = new Date().toLocaleTimeString('zh-CN', { hour12: false })
      setLogs(prev => [...prev.slice(-25), { time: t, msg, id: Date.now() }])
    }
    push()
    const id = setInterval(push, 2400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className="glass-panel rounded-xl p-6 neon-border h-80 flex flex-col">
      <h2 className="text-xl font-bold text-neon-cyan mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
        任务日志
      </h2>
      <div className="flex-1 overflow-y-auto font-mono text-sm space-y-1">
        {logs.map(l => (
          <div key={l.id} className="text-gray-300">
            <span className="text-neon-purple">[{l.time}]</span>
            <span className="ml-2">{l.msg}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  )
}
