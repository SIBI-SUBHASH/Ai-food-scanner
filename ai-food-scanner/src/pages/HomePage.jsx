import { Link } from 'react-router-dom'
import { ScanLine, Zap, Shield, BarChart2, ChevronRight, Leaf, AlertTriangle, CheckCircle } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Instant Analysis',
    desc: 'Upload a photo or paste ingredients and get comprehensive health insights in seconds.',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  {
    icon: Shield,
    title: 'Risk Detection',
    desc: 'Identifies harmful additives, allergens, and high-risk chemical compounds automatically.',
    color: 'bg-red-50 text-rust-500 border-red-200',
  },
  {
    icon: BarChart2,
    title: 'Health Scoring',
    desc: 'Each ingredient gets a health score with detailed reasoning and safer alternatives.',
    color: 'bg-sage-50 text-sage-600 border-sage-200',
  },
]

const sampleIngredients = [
  { name: 'Ascorbic Acid', status: 'safe', desc: 'Vitamin C — antioxidant' },
  { name: 'Red 40', status: 'warning', desc: 'Artificial dye — linked to hyperactivity' },
  { name: 'High Fructose Corn Syrup', status: 'critical', desc: 'Linked to obesity & metabolic issues' },
  { name: 'Sunflower Oil', status: 'safe', desc: 'Natural plant-based oil' },
  { name: 'Sodium Benzoate', status: 'caution', desc: 'Preservative — avoid with ascorbic acid' },
]

const badgeClass = {
  safe: 'health-badge-safe',
  caution: 'health-badge-caution',
  warning: 'health-badge-warning',
  critical: 'health-badge-critical',
}

const badgeLabel = {
  safe: '✓ Safe',
  caution: '⚠ Caution',
  warning: '⚡ Warning',
  critical: '✕ Critical',
}

export default function HomePage() {
  return (
    <div className="dot-pattern min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-sage-200 mb-6">
              <Leaf size={12} />
              Powered by Claude AI
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-800 leading-tight text-sage-900 mb-6">
              Know What's{' '}
              <span className="text-sage-600 relative">
                Really
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6 Q50 2 100 5 Q150 8 198 4" stroke="#9fc09a" strokeWidth="3" strokeLinecap="round" fill="none"/>
                </svg>
              </span>
              {' '}In Your Food
            </h1>
            <p className="text-lg text-sage-600 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Upload a food label or paste ingredients. Our AI instantly analyzes every component,
              flags health risks, and explains what each ingredient does to your body.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/scan"
                className="flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <ScanLine size={18} />
                Start Scanning Free
              </Link>
              <Link
                to="/about"
                className="flex items-center justify-center gap-2 border-2 border-sage-200 text-sage-700 hover:border-sage-400 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200"
              >
                How It Works
                <ChevronRight size={16} />
              </Link>
            </div>
            <p className="text-xs text-sage-400 mt-4">No account needed · 100% private · Free to use</p>
          </div>

          {/* Right: Demo Card */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl border border-sage-100 overflow-hidden">
              {/* Card Header */}
              <div className="bg-sage-600 px-6 py-4 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-cream-100 text-sm font-mono">ingredient_scan.json</span>
              </div>
              {/* Ingredients List */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-sage-800">Scan Results</h3>
                  <span className="text-xs text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-200">
                    5 ingredients
                  </span>
                </div>
                {sampleIngredients.map((ing, i) => (
                  <div
                    key={ing.name}
                    className="flex items-start justify-between gap-3 p-3 rounded-xl bg-cream-50 border border-cream-200 animate-fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-sage-800 truncate">{ing.name}</p>
                      <p className="text-xs text-sage-500 mt-0.5">{ing.desc}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap shrink-0 ${badgeClass[ing.status]}`}>
                      {badgeLabel[ing.status]}
                    </span>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-sage-600 rounded-xl text-center">
                  <p className="text-cream-50 text-sm font-semibold">Overall Health Score</p>
                  <p className="text-3xl font-display font-800 text-cream-100">62 / 100</p>
                  <p className="text-sage-200 text-xs mt-1">Moderate — some concerns detected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-sage-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-sage-900 mb-3">Why NutriScan?</h2>
            <p className="text-sage-600">Transparent food analysis powered by cutting-edge AI</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="group p-7 rounded-2xl border border-sage-100 hover:border-sage-300 hover:shadow-lg transition-all duration-300 bg-cream-50">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-bold text-sage-800 text-lg mb-2">{title}</h3>
                <p className="text-sm text-sage-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-sage-900 mb-3">How It Works</h2>
          <p className="text-sage-600">Three simple steps to healthier choices</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Upload or Type', desc: 'Take a photo of the ingredient label, upload an image, or manually type the ingredients list.', icon: '📸' },
            { step: '02', title: 'AI Analysis', desc: 'Claude AI analyzes each ingredient against a database of health research and identifies risks.', icon: '🧠' },
            { step: '03', title: 'Get Insights', desc: 'Receive a detailed health report with scores, explanations, and recommended alternatives.', icon: '📊' },
          ].map(({ step, title, desc, icon }) => (
            <div key={step} className="relative p-7 rounded-2xl bg-sage-600 text-white">
              <div className="text-5xl mb-4">{icon}</div>
              <span className="font-mono text-sage-300 text-sm">{step}</span>
              <h3 className="font-display font-bold text-xl mt-1 mb-2">{title}</h3>
              <p className="text-sage-200 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/scan"
            className="inline-flex items-center gap-2 bg-rust-500 hover:bg-rust-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <ScanLine size={20} />
            Try It Now — It's Free
          </Link>
        </div>
      </section>
    </div>
  )
}
