import React from 'react'

export default function CrewCard({ crew, onClick, delay = 0 }) {
  const statusClasses = {
    online: 'status-online',
    mission: 'status-mission',
    sleep: 'status-sleep',
    offline: 'status-offline',
  }
  const statusLabels = {
    online: '在线',
    mission: '任务中',
    sleep: '休眠',
    offline: '离线',
  }
  return (
    <div className="crew-card glass-panel rounded-xl p-4 cursor-pointer neon-border hover:border-neon-pink/50" style={{ animationDelay: `${delay}ms` }} onClick={onClick}>
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full bg-space-dark/50 flex items-center justify-center text-2xl border-2 border-neon-cyan/30">
          {crew.avatar}
        </div>
        <div>
          <h3 className="text-white font-semibold">{crew.name}</h3>
          <p className="text-sm text-gray-400">{crew.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${statusClasses[crew.status]}`}></span>
        <span className="text-sm text-gray-300">{statusLabels[crew.status]}</span>
      </div>
    </div>
  )
}
