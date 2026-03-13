import { useState } from 'react'
import StatusPanel from './components/StatusPanel.jsx'
import CrewPanel from './components/CrewPanel.jsx'
import TaskLog from './components/TaskLog.jsx'
import ResourceScheduler from './components/ResourceScheduler.jsx'
import CrewSidebar from './components/CrewSidebar.jsx'
// Crew data is provided by src/data/crew.js and consumed in CrewPanel.jsx

function App() {
  const [selectedCrew, setSelectedCrew] = useState(null)
  return (
    <div className="min-h-screen bg-space-black relative overflow-hidden">
      <div className="scan-line"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink mb-2">
            星际航行：实时任务指挥中心
          </h1>
          <p className="text-gray-400">Interstellar Mission Control - NCC-1701</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <StatusPanel />
            <ResourceScheduler />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <CrewPanel onSelectCrew={setSelectedCrew} />
            <TaskLog />
          </div>
        </div>
      </div>

      <CrewSidebar crew={selectedCrew} onClose={() => setSelectedCrew(null)} />
      {selectedCrew && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedCrew(null)} />
      )}
    </div>
  )
}

export default App
