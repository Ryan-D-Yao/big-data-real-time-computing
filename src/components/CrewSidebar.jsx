import React from 'react'
import RadarChart from './RadarChart.jsx'

export default function CrewSidebar({ crew, onClose }) {
  if (!crew) return null
  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-space-dark/95 glass-panel border-l border-neon-cyan/30 p-6 z-50 overflow-y-auto">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-neon-cyan">船员详情</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-space-dark/50 flex items-center justify-center text-3xl border-2 border-neon-cyan/30">{crew.avatar}</div>
        <div>
          <h3 className="text-xl font-bold text-white">{crew.name}</h3>
          <p className="text-gray-400">{crew.role}</p>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="text-neon-cyan mb-4 font-semibold">技能雷达图</h4>
        <RadarChart skills={crew.skills} />
      </div>
      <div className="space-y-3">
        {Object.entries(crew.skills).map(([k, v]) => (
          <div key={k} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{k}</span>
              <span className="text-neon-cyan">{v}</span>
            </div>
            <div className="h-1.5 bg-space-black/50 rounded-full overflow-hidden">
              <div className="h-full" style={{ width: `${v}%`, background: 'linear-gradient(to right, #00fff5, #bf00ff)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
