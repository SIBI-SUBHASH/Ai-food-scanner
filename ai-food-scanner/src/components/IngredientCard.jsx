import { useState } from 'react'
import { ChevronDown, CheckCircle, AlertTriangle, AlertOctagon, XCircle } from 'lucide-react'
import clsx from 'clsx'

const statusConfig = {
  safe:     { icon: CheckCircle,    badge: 'health-badge-safe',     label: 'Safe',     border: 'border-sage-200' },
  caution:  { icon: AlertTriangle,  badge: 'health-badge-caution',  label: 'Caution',  border: 'border-amber-200' },
  warning:  { icon: AlertOctagon,   badge: 'health-badge-warning',  label: 'Warning',  border: 'border-orange-200' },
  critical: { icon: XCircle,        badge: 'health-badge-critical', label: 'Critical', border: 'border-red-200' },
}

export default function IngredientCard({ ingredient, index }) {
  const [open, setOpen] = useState(ingredient.status === 'critical' || ingredient.status === 'warning')
  const cfg = statusConfig[ingredient.status] || statusConfig.safe
  const Icon = cfg.icon

  return (
    <div
      className={clsx(
        'bg-white rounded-2xl border transition-all duration-200 overflow-hidden animate-fade-in-up',
        cfg.border,
        open ? 'shadow-sm' : 'hover:shadow-sm'
      )}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <div className={clsx('p-2 rounded-xl', cfg.badge)}>
          <Icon size={15} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sage-800 text-sm">{ingredient.name}</span>
            {ingredient.e_number && (
              <span className="text-[10px] font-mono bg-sage-100 text-sage-500 px-1.5 py-0.5 rounded">
                {ingredient.e_number}
              </span>
            )}
          </div>
          <p className="text-xs text-sage-500 mt-0.5 truncate">{ingredient.shortDesc}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={clsx('text-xs font-bold px-2 py-1 rounded-lg', cfg.badge)}>
            {cfg.label}
          </span>
          <ChevronDown
            size={15}
            className={clsx('text-sage-400 transition-transform duration-200', open && 'rotate-180')}
          />
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-sage-50 pt-3 space-y-3">
          <p className="text-sm text-sage-700 leading-relaxed">{ingredient.details}</p>

          {ingredient.concerns?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-1.5">Health Concerns</p>
              <ul className="space-y-1">
                {ingredient.concerns.map((c, i) => (
                  <li key={i} className="text-xs text-sage-600 flex items-start gap-2">
                    <span className="text-rust-400 mt-0.5">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {ingredient.alternatives?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-1.5">Healthier Alternatives</p>
              <div className="flex flex-wrap gap-1.5">
                {ingredient.alternatives.map((alt, i) => (
                  <span key={i} className="text-xs bg-sage-100 text-sage-700 px-2.5 py-1 rounded-full border border-sage-200">
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          )}

          {ingredient.sources?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-1.5">Sources</p>
              <ul className="space-y-1">
                {ingredient.sources.map((s, i) => (
                  <li key={i} className="text-xs text-sage-500">{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
