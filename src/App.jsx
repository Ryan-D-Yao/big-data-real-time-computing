import { useState, useEffect, useRef } from 'react'

const CREW_DATA = [
  { id: 1, name: 'Commander Zhang', role: 'Captain', status: 'online', avatar: '👨‍🚀', skills: { leadership: 95, combat: 70, engineering: 60, navigation: 85, diplomacy: 80 } },
  { id: 2, name: 'Dr. Sarah Chen', role: 'Science Officer', status: 'mission', avatar: '👩‍🔬', skills: { leadership: 65, combat: 40, engineering: 75, navigation: 90, diplomacy: 85 } },
  { id: 3, name: 'Lt. Marcus Webb', role: 'Security Chief', status: 'online', avatar: '👨‍✈️', skills: { leadership: 80, combat: 95, engineering: 55, navigation: 70, diplomacy: 50 } },
  { id: 4, name: 'Eng. Yuki Tanaka', role: 'Chief Engineer', status: 'mission', avatar: '👩‍🏭', skills: { leadership: 60, combat: 45, engineering: 98, navigation: 55, diplomacy: 70 } },
  { id: 5, name: 'Lt. James Rivera', role: 'Pilot', status: 'sleep', avatar: '👨‍✈️', skills: { leadership: 55, combat: 75, engineering: 65, navigation: 95, diplomacy: 45 } },
  { id: 6, name: 'Dr. Anna Kowalski', role: 'Medical Officer', status: 'online', avatar: '👩‍⚕️', skills: { leadership: 70, combat: 30, engineering: 50, navigation: 60, diplomacy: 95 } },
]

const SYSTEM_MESSAGES = [
  '[SYSTEM] 发现小行星带，建议减速航行',
  '[NAVIGATION] 正在穿越柯伊伯带...',
  '[LIFE SUPPORT] 氧气循环系统运行正常',
  '[SHIELDS] 检测到微弱辐射波动',
  '[ENGINE] 燃料消耗率：2.3%/h',
  '[COMMS] 收到来自地球的信号',
  '[SENSORS] 检测到邻近天体引力异常',
  '[THERMAL] 飞船外部温度：-180°C',
  '[HULL] 结构完整性：100%',
  '[WEAPONS] 武器系统待命中',
  '[NAVIGATION] 下一跃迁点：半人马座α',
  '[LIFE SUPPORT] 二氧化碳水平正常',
]

function StatusPanel() {
  const [status, setStatus] = useState({ oxygen: 78, fuel: 65, shield: 92 })

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus({
        oxygen: Math.max(10, Math.min(100, status.oxygen + (Math.random() - 0.5) * 10)),
        fuel: Math.max(10, Math.min(100, status.fuel + (Math.random() - 0.5) * 6)),
        shield: Math.max(10, Math.min(100, status.shield + (Math.random() - 0.5) * 8)),
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [status.oxygen, status.fuel, status.shield])

  const getProgressClass = (value) => {
    if (value < 30) return 'progress-bar-danger'
    if (value < 60) return 'progress-bar-warning'
    return 'progress-bar-safe'
  }

  const getLabelClass = (value) => {
    if (value < 30) return 'text-neon-red'
    if (value < 60) return 'text-neon-yellow'
    return 'text-neon-green'
  }

  return (
    <div className="glass-panel rounded-xl p-6 space-y-4 neon-border">
      <h2 className="text-xl font-bold text-neon-cyan mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
        实时状态监控
      </h2>
      {[
        { key: 'oxygen', label: '氧气', icon: '🫧', value: Math.round(status.oxygen) },
        { key: 'fuel', label: '燃料', icon: '⚡', value: Math.round(status.fuel) },
        { key: 'shield', label: '护盾', icon: '🛡️', value: Math.round(status.shield) },
      ].map(({ key, label, icon, value }) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 flex items-center gap-2">
              <span>{icon}</span> {label}
            </span>
            <span className={`font-bold ${getLabelClass(value)}`}>{value}%</span>
          </div>
          <div className="h-3 bg-space-black/50 rounded-full overflow-hidden border border-white/10">
            <div
              className={`h-full transition-all duration-500 rounded-full ${getProgressClass(value)}`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function CrewCard({ crew, onClick, delay }) {
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
    <div 
      className="crew-card glass-panel rounded-xl p-4 cursor-pointer neon-border hover:border-neon-pink/50"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
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

function RadarChart({ skills }) {
  const size = 160
  const center = size / 2
  const maxRadius = 70
  const labels = Object.keys(skills)
  const values = Object.values(skills)
  const angleStep = (2 * Math.PI) / labels.length

  const points = values.map((v, i) => {
    const angle = i * angleStep - Math.PI / 2
    const r = (v / 100) * maxRadius
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
  }).join(' ')

  const gridPoints = [20, 40, 60, 80, 100].map(pct => {
    const r = (pct / 100) * maxRadius
    return labels.map((_, i) => {
      const angle = i * angleStep - Math.PI / 2
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
    }).join(' ')
  })

  return (
    <svg width={size} height={size} className="mx-auto">
      {gridPoints.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="rgba(0,255,245,0.15)" strokeWidth="1" />
      ))}
      {labels.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + maxRadius * Math.cos(angle)}
            y2={center + maxRadius * Math.sin(angle)}
            stroke="rgba(0,255,245,0.2)"
            strokeWidth="1"
          />
        )
      })}
      <polygon points={points} fill="rgba(0,255,245,0.3)" stroke="#00fff5" strokeWidth="2" />
      {labels.map((label, i) => {
        const angle = i * angleStep - Math.PI / 2
        const r = maxRadius + 18
        const x = center + r * Math.cos(angle)
        const y = center + r * Math.sin(angle)
        return (
          <text key={label} x={x} y={y} fill="#aaa" fontSize="10" textAnchor="middle" dominantBaseline="middle">
            {label === 'leadership' ? '领导' : label === 'combat' ? '战斗' : label === 'engineering' ? '工程' : label === 'navigation' ? '导航' : '外交'}
          </text>
        )
      })}
    </svg>
  )
}

function CrewPanel({ selectedCrew, onSelectCrew }) {
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

function CrewSidebar({ crew, onClose }) {
  if (!crew) return null

  return (
    <div className="fixed inset-y-0 right-0 w-96 glass-panel border-l border-neon-cyan/30 p-6 overflow-y-auto animate-slide-in z-50">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-neon-cyan">船员详情</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-space-dark/50 flex items-center justify-center text-3xl border-2 border-neon-cyan/30">
          {crew.avatar}
        </div>
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
        {Object.entries(crew.skills).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{key}</span>
              <span className="text-neon-cyan">{value}</span>
            </div>
            <div className="h-1.5 bg-space-black/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TaskLog() {
  const [logs, setLogs] = useState([])
  const logsEndRef = useRef(null)

  useEffect(() => {
    const addLog = () => {
      const msg = SYSTEM_MESSAGES[Math.floor(Math.random() * SYSTEM_MESSAGES.length)]
      const time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
      setLogs(prev => [...prev.slice(-20), { time, msg, id: Date.now() }])
    }
    addLog()
    const interval = setInterval(addLog, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className="glass-panel rounded-xl p-6 neon-border h-80 flex flex-col">
      <h2 className="text-xl font-bold text-neon-cyan mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
        任务日志
      </h2>
      <div className="flex-1 overflow-y-auto space-y-2 font-mono text-sm">
        {logs.map(log => (
          <div key={log.id} className="console-text text-gray-300 animate-fade-in">
            <span className="text-neon-purple">[{log.time}]</span>
            <span className="ml-2">{log.msg}</span>
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  )
}

function ResourceScheduler() {
  const [allocations, setAllocations] = useState({ propulsion: 40, lifeSupport: 35, weapons: 25 })
  const total = Object.values(allocations).reduce((a, b) => a + b, 0)
  const isOverLimit = total > 100

  const handleChange = (system, value) => {
    const newValue = parseInt(value)
    const diff = newValue - allocations[system]
    const remaining = 100 - allocations[system]
    
    if (diff > remaining) {
      const otherSystems = Object.keys(allocations).filter(k => k !== system)
      const newAllocations = { ...allocations, [system]: allocations[system] + remaining }
      otherSystems.forEach(k => {
        newAllocations[k] = Math.max(0, allocations[k] - remaining)
      })
      setAllocations(newAllocations)
    } else {
      const ratio = diff / (otherSystems.length || 1)
      const newAllocations = { ...allocations }
      Object.keys(newAllocations).forEach(k => {
        if (k !== system) {
          newAllocations[k] = Math.max(0, newAllocations[k] - ratio)
        }
      })
      newAllocations[system] = newValue
      setAllocations(newAllocations)
    }
  }

  const systems = [
    { key: 'propulsion', label: '动力系统', icon: '🚀', color: 'from-neon-cyan to-blue-500' },
    { key: 'lifeSupport', label: '生命支持', icon: '🫧', color: 'from-neon-green to-green-600' },
    { key: 'weapons', label: '武器系统', icon: '⚔️', color: 'from-neon-red to-red-600' },
  ]

  return (
    <div className="glass-panel rounded-xl p-6 neon-border">
      <h2 className="text-xl font-bold text-neon-cyan mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
        能量分配
      </h2>
      <div className="space-y-6">
        {systems.map(({ key, label, icon, color }) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 flex items-center gap-2">
                <span>{icon}</span> {label}
              </span>
              <span className="font-bold text-neon-cyan">{Math.round(allocations[key])}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={allocations[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="energy-slider w-full"
            />
          </div>
        ))}
        <div className="pt-4 border-t border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">总能量分配</span>
            <span className={`font-bold text-lg ${isOverLimit ? 'text-neon-red' : 'text-neon-green'}`}>
              {total}%
            </span>
          </div>
          {isOverLimit && (
            <p className="text-neon-red text-sm mt-2 animate-pulse">⚠️ 超过100%限制！请调整分配</p>
          )}
          <div className="mt-3 h-4 bg-space-black/50 rounded-full overflow-hidden flex">
            {systems.map(({ key, color }) => (
              <div
                key={key}
                className={`h-full bg-gradient-to-r ${color} transition-all duration-300`}
                style={{ width: `${allocations[key]}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

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
            <CrewPanel selectedCrew={selectedCrew} onSelectCrew={setSelectedCrew} />
            <TaskLog />
          </div>
        </div>
      </div>

      <CrewSidebar crew={selectedCrew} onClose={() => setSelectedCrew(null)} />
      
      {selectedCrew && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSelectedCrew(null)}
        ></div>
      )}
    </div>
  )
}

export default App
