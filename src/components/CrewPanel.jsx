import React from 'react'
import CrewCard from './CrewCard.jsx'
import { CREW_DATA } from '../data/crew.js'

export default function CrewPanel({ onSelectCrew }) {
  return (
    <div className="glass-panel rounded-xl p-6 neon-border">
      <h2 className="text-xl font-bold text-neon-cyan mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
        船员管理
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CREW_DATA.map((crew, i) => (
          <CrewCard key={crew.id} crew={crew} onClick={() => onSelectCrew(crew)} delay={i * 100} />
        ))}
      </div>
    </div>
  )
}
