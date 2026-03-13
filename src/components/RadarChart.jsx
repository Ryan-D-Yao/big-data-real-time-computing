import React from 'react'

// Radar chart drawn with CSS/DOM only (no external chart libs)
export default function RadarChart({ skills = {} }) {
  const size = 180
  const center = size / 2
  const maxR = 75
  const keys = Object.keys(skills)
  const values = Object.values(skills)
  const step = (2 * Math.PI) / keys.length

  const points = values.map((v, i) => {
    const angle = i * step - Math.PI / 2
    const r = (v / 100) * maxR
    const x = center + r * Math.cos(angle)
    const y = center + r * Math.sin(angle)
    return `${x}px ${y}px`
  }).join(', ')

  // Rings for grid (20/40/60/80/100)
  const rings = [20, 40, 60, 80, 100]

  return (
    <div style={{ width: size, height: size, position: 'relative' }} className="mx-auto">
      {/* grid rings */}
      {rings.map((r, idx) => (
        <div
          key={idx}
          style={{
            width: (size * r) / 100,
            height: (size * r) / 100,
            borderRadius: '50%',
            border: '1px solid rgba(0,255,245,0.25)',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%)`,
            pointerEvents: 'none',
          }}
          aria-label={`radar-ring-${r}`}
        />
      ))}
      {/* axis spokes (visual only) */}
      {keys.map((k, i) => {
        const angle = i * step - Math.PI / 2
        const x = center + maxR * Math.cos(angle)
        const y = center + maxR * Math.sin(angle)
        return (
          <div key={i} style={{ position:'absolute', left: center, top:center, width: maxR, height: 1, background:'rgba(0,255,245,0.25)', transformOrigin:'0 0', transform:`rotate(${(angle * 180) / Math.PI}deg) translateX(-${maxR}px)` }} />
        )
      })}
      {/* filled radar polygon (via clip-path) */}
      <div
        style={{
          position: 'absolute', left: 0, top: 0, width: size, height: size,
          background: 'rgba(0,255,245,0.25)',
          clipPath: `polygon(${points})`,
          WebkitClipPath: `polygon(${points})`,
          borderRadius: 4,
        }}
      />
      {/* center dot */}
      <div style={{ position:'absolute', left: center-2, top: center-2, width:4, height:4, borderRadius:2, background:'#00fff5' }} />
      <div style={{ position:'absolute', left:0, top:0, width: size, height: size, pointerEvents:'none' }}>
        {keys.map((k, i) => (
          <div key={i} style={{ position:'absolute', left: center, top: center, width: 0, height:0 }} />
        ))}
      </div>
      {/* labels */}
      <div style={{ position:'absolute', left:0, top:0, width:size, height:size, pointerEvents:'none' }}>
        {keys.map((k, i) => {
          const angle = i * step - Math.PI / 2
          const dist = maxR + 18
          const x = center + dist * Math.cos(angle)
          const y = center + dist * Math.sin(angle)
          const label = k
          return (
            <span key={i} style={{ position:'absolute', left:x, top:y, transform:'translate(-50%, -50%)', fontSize:10, color:'#aaa' }}>
              {label[0].toUpperCase()}
            </span>
          )
        })}
      </div>
    </div>
  )
}
