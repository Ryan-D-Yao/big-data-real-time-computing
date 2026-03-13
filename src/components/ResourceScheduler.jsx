import React, { useState } from 'react'

export default function ResourceScheduler() {
  const [alloc, setAlloc] = useState({ propulsion: 40, lifeSupport: 35, weapons: 25 })
  const total = Object.values(alloc).reduce((a,b)=>a+b,0)
  const isOver = total > 100

  const onChange = (key, val) => {
    const v = Number(val)
    const other = Object.keys(alloc).filter(k => k !== key)
    // simple re-balance: adjust others proportionally
    const diff = v - alloc[key]
    let next = { ...alloc, [key]: v }
    if (diff !== 0 && other.length) {
      const per = diff / other.length
      other.forEach(k => {
        next[k] = Math.max(0, alloc[k] - per)
      })
    }
    // clamp to 0..100 per item
    Object.keys(next).forEach(k => {
      next[k] = Math.max(0, Math.min(100, next[k]))
    })
    setAlloc(next)
  }

  const systems = [
    { key: 'propulsion', label: '动力系统', emoji: '🚀' },
    { key: 'lifeSupport', label: '生命支持', emoji: '🫧' },
    { key: 'weapons', label: '武器系统', emoji: '⚔️' },
  ]

  return (
    <div className="glass-panel rounded-xl p-6 neon-border">
      <h2 className="text-xl font-bold text-neon-cyan mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
        能量分配
      </h2>
      <div className="space-y-6">
        {systems.map(s => (
          <div key={s.key} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 flex items-center gap-2"><span>{s.emoji}</span> {s.label}</span>
              <span className="font-bold text-neon-cyan">{alloc[s.key]}%</span>
            </div>
            <input type="range" min="0" max="100" value={alloc[s.key]} onChange={e=>onChange(s.key, e.target.value)} className="energy-slider w-full" />
          </div>
        ))}
        <div className="pt-4 border-t border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">总能量分配</span>
            <span className={`font-bold ${isOver ? 'text-neon-red' : 'text-neon-green'}`}>{total}%</span>
          </div>
          {isOver && <p className="text-neon-red text-sm">⚠️ 超过100%限制，请调整分配</p>}
          <div className="mt-2 h-4 bg-space-black/50 rounded-full overflow-hidden flex w-full">
            {systems.map(s => (
              <div key={s.key} style={{ width: `${alloc[s.key]}%` }} className="h-full"/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
