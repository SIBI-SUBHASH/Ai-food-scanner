import { useMemo } from 'react'

export default function HealthScoreGauge({ score }) {
  const clamp = Math.max(0, Math.min(100, score))

  const { color, label, description } = useMemo(() => {
    if (clamp >= 75) return { color: '#4d8246', label: 'Excellent', description: 'Very healthy choice' }
    if (clamp >= 55) return { color: '#6fa068', label: 'Good',      description: 'Mostly healthy' }
    if (clamp >= 40) return { color: '#f0a500', label: 'Fair',      description: 'Some concerns' }
    if (clamp >= 25) return { color: '#e07b54', label: 'Poor',      description: 'Multiple concerns' }
    return              { color: '#d4623a', label: 'Critical',   description: 'Serious health risks' }
  }, [clamp])

  // SVG arc math
  const r = 70
  const cx = 90
  const cy = 90
  const startAngle = -210
  const endAngle = 30
  const totalAngle = endAngle - startAngle
  const sweepAngle = (clamp / 100) * totalAngle
  const currentAngle = startAngle + sweepAngle

  const toRad = d => (d * Math.PI) / 180
  const arcX = (angle) => cx + r * Math.cos(toRad(angle))
  const arcY = (angle) => cy + r * Math.sin(toRad(angle))

  const describeArc = (start, end) => {
    const largeArc = end - start > 180 ? 1 : 0
    return `M ${arcX(start)} ${arcY(start)} A ${r} ${r} 0 ${largeArc} 1 ${arcX(end)} ${arcY(end)}`
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="180" height="160" viewBox="0 0 180 160">
          {/* Background track */}
          <path
            d={describeArc(startAngle, endAngle)}
            fill="none"
            stroke="#e4ede2"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Score arc */}
          <path
            d={describeArc(startAngle, currentAngle)}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            style={{ transition: 'all 1s ease-out' }}
          />
          {/* Needle dot */}
          <circle
            cx={arcX(currentAngle)}
            cy={arcY(currentAngle)}
            r="7"
            fill="white"
            stroke={color}
            strokeWidth="3"
          />
        </svg>

        {/* Score Text (centered in SVG) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
          <span className="font-display font-bold text-4xl" style={{ color }}>
            {clamp}
          </span>
          <span className="text-xs text-sage-400 font-mono">/ 100</span>
        </div>
      </div>

      <div className="text-center mt-1">
        <p className="font-display font-bold text-xl" style={{ color }}>{label}</p>
        <p className="text-xs text-sage-500 mt-0.5">{description}</p>
      </div>
    </div>
  )
}
