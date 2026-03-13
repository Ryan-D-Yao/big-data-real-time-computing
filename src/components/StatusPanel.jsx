import React, { useEffect, useState } from 'react'

export default function StatusPanel() {
  const [status, setStatus] = useState({ oxygen: 78, fuel: 65, shield: 92 })

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        oxygen: Math.max(0, Math.min(100, prev.oxygen + (Math.random() - 0.5) * 12)),
        fuel: Math.max(0, Math.min(100, prev.fuel + (Math.random() - 0.5) * 8)),
        shield: Math.max(0, Math.min(100, prev.shield + (Math.random() - 0.5) * 10)),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getBarClass = (v) => {
    if (v < 30) return 'progress-bar-danger'
    if (v < 60) return 'progress-bar-warning'
    return 'progress-bar-safe'
  }
  const getLabelClass = (v) => {
    if (v < 30) return 'text-neon-red'
    if (v < 60) return 'text-neon-yellow'
    return 'text-neon-green'
  }

  const items = [
    { key: 'oxygen', label: '氧气', icon: '🫧', value: Math.round(status.oxygen) },
    { key: 'fuel', label: '燃料', icon: '⚡', value: Math.round(status.fuel) },
    { key: 'shield', label: '护盾', icon: '🛡️', value: Math.round(status.shield) },
  ]

  return (
    <div className="glass-panel rounded-xl p-6 space-y-4 neon-border w-full">
      <h2 className="text-xl font-bold text-neon-cyan mb-2 flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
        实时状态面板
      </h2>
      {items.map(it => (
        <div key={it.key} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 flex items-center gap-2"><span>{it.icon}</span> {it.label}</span>
            <span className={`font-bold ${getLabelClass(it.value)}`}>{it.value}%</span>
          </div>
          <div className="h-3 bg-space-black/50 rounded-full overflow-hidden border border-white/10">
            <div className={`h-full rounded-full ${getBarClass(it.value)}`} style={{ width: `${it.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}
