import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ScanLine, ArrowLeft, Download, Share2, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'
import HealthScoreGauge from '../components/HealthScoreGauge'
import IngredientCard from '../components/IngredientCard'

export default function ResultsPage() {
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = sessionStorage.getItem('scanResult')
    if (!stored) { navigate('/scan'); return }
    setResult(JSON.parse(stored))
  }, [navigate])

  if (!result) return null

  const { overallScore, summary, ingredients, recommendation, productName } = result

  const counts = ingredients.reduce((acc, ing) => {
    acc[ing.status] = (acc[ing.status] || 0) + 1
    return acc
  }, {})

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'nutriscan-report.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'NutriScan Report', text: summary })
    } else {
      navigator.clipboard.writeText(summary)
      alert('Report summary copied to clipboard!')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Back + Actions */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/scan"
          className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-800 transition-colors"
        >
          <ArrowLeft size={15} />
          Scan Again
        </Link>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm border border-sage-200 text-sage-700 px-4 py-2 rounded-xl hover:bg-sage-50 transition-colors"
          >
            <Share2 size={14} />
            Share
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 text-sm bg-sage-600 text-white px-4 py-2 rounded-xl hover:bg-sage-700 transition-colors"
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="mb-8">
        <p className="text-xs font-mono text-sage-400 uppercase tracking-widest mb-1">Scan Report</p>
        <h1 className="font-display text-3xl font-bold text-sage-900">
          {productName || 'Ingredient Analysis'}
        </h1>
      </div>

      {/* Score + Summary Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-3xl border border-sage-100 p-7 shadow-sm flex flex-col items-center justify-center">
          <HealthScoreGauge score={overallScore} />
        </div>

        <div className="bg-white rounded-3xl border border-sage-100 p-7 shadow-sm">
          <h2 className="font-display font-bold text-sage-800 mb-4">Overview</h2>
          <p className="text-sm text-sage-600 leading-relaxed mb-5">{summary}</p>
          {/* Stat Badges */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Safe', count: counts.safe || 0, cls: 'health-badge-safe', icon: CheckCircle },
              { label: 'Caution', count: counts.caution || 0, cls: 'health-badge-caution', icon: AlertTriangle },
              { label: 'Warning', count: counts.warning || 0, cls: 'health-badge-warning', icon: AlertTriangle },
              { label: 'Critical', count: counts.critical || 0, cls: 'health-badge-critical', icon: XCircle },
            ].map(({ label, count, cls, icon: Icon }) => (
              <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold ${cls}`}>
                <Icon size={14} />
                {count} {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation */}
      {recommendation && (
        <div className="bg-sage-600 rounded-2xl p-6 mb-8 text-white flex gap-4">
          <Info size={20} className="text-sage-200 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display font-bold mb-1">AI Recommendation</h3>
            <p className="text-sage-100 text-sm leading-relaxed">{recommendation}</p>
          </div>
        </div>
      )}

      {/* Ingredient Cards */}
      <div>
        <h2 className="font-display font-bold text-xl text-sage-800 mb-5">
          Ingredient Breakdown
          <span className="ml-2 text-sm font-normal text-sage-500 font-body">({ingredients.length} total)</span>
        </h2>
        <div className="space-y-3">
          {ingredients.map((ing, i) => (
            <IngredientCard key={i} ingredient={ing} index={i} />
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 text-center">
        <Link
          to="/scan"
          className="inline-flex items-center gap-2 bg-rust-500 hover:bg-rust-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          <ScanLine size={18} />
          Scan Another Product
        </Link>
        <p className="text-xs text-sage-400 mt-3">Results are for informational purposes only</p>
      </div>
    </div>
  )
}
