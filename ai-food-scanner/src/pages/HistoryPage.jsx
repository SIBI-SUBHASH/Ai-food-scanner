import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Trash2, ScanLine, ChevronRight, Calendar } from 'lucide-react'

export default function HistoryPage() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('scanHistory') || '[]')
    setHistory(stored)
  }, [])

  const clearAll = () => {
    if (window.confirm('Clear all scan history?')) {
      localStorage.removeItem('scanHistory')
      setHistory([])
    }
  }

  const removeItem = (id) => {
    const updated = history.filter(h => h.id !== id)
    setHistory(updated)
    localStorage.setItem('scanHistory', JSON.stringify(updated))
  }

  const loadScan = (scan) => {
    sessionStorage.setItem('scanResult', JSON.stringify(scan))
  }

  const scoreColor = (s) => {
    if (s >= 75) return 'text-sage-600 bg-sage-100'
    if (s >= 50) return 'text-amber-700 bg-amber-50'
    if (s >= 25) return 'text-rust-500 bg-red-50'
    return 'text-red-700 bg-red-100'
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-sage-900">Scan History</h1>
          <p className="text-sage-500 text-sm mt-1">{history.length} scan{history.length !== 1 ? 's' : ''} saved locally</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-300 px-3 py-2 rounded-xl transition-colors"
          >
            <Trash2 size={13} />
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-sage-200">
          <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock size={28} className="text-sage-400" />
          </div>
          <h3 className="font-display font-bold text-sage-700 mb-2">No scans yet</h3>
          <p className="text-sm text-sage-400 mb-6">Your scan history will appear here</p>
          <Link
            to="/scan"
            className="inline-flex items-center gap-2 bg-sage-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-sage-700 transition-colors"
          >
            <ScanLine size={15} />
            Start Scanning
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((scan) => (
            <div
              key={scan.id}
              className="group bg-white rounded-2xl border border-sage-100 hover:border-sage-300 hover:shadow-md transition-all duration-200 p-5 flex items-center gap-4"
            >
              {/* Score */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-xl shrink-0 ${scoreColor(scan.overallScore)}`}>
                {scan.overallScore}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sage-800 truncate">
                  {scan.productName || 'Unnamed Scan'}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-sage-400 flex items-center gap-1">
                    <Calendar size={11} />
                    {new Date(scan.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-xs text-sage-400">·</span>
                  <span className="text-xs text-sage-400">{scan.ingredients?.length || 0} ingredients</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeItem(scan.id)}
                  className="p-2 rounded-xl hover:bg-red-50 text-sage-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
                <Link
                  to="/results"
                  onClick={() => loadScan(scan)}
                  className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-800 px-3 py-2 rounded-xl hover:bg-sage-50 transition-colors font-medium"
                >
                  View
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
