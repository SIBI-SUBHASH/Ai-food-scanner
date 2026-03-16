import { Leaf, Brain, Shield, Code, Github, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-14">
        <div className="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Leaf size={28} className="text-cream-50" />
        </div>
        <h1 className="font-display text-4xl font-bold text-sage-900 mb-3">About NutriScan AI</h1>
        <p className="text-sage-600 max-w-xl mx-auto leading-relaxed">
          An open-source project to make food transparency accessible to everyone, powered by Claude AI.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-sage-600 rounded-3xl p-8 text-white mb-8">
        <h2 className="font-display font-bold text-2xl mb-3">Our Mission</h2>
        <p className="text-sage-100 leading-relaxed">
          Most people cannot decode the complex chemical names on food labels. NutriScan AI bridges
          that gap — providing clear, research-backed health analysis of every ingredient so you can
          make truly informed choices for you and your family.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[
          {
            icon: Brain,
            title: 'Powered by Claude AI',
            desc: "Anthropic's Claude API provides the intelligence behind every ingredient analysis — with nuanced understanding of nutritional science.",
            color: 'bg-purple-50 border-purple-200 text-purple-600',
          },
          {
            icon: Code,
            title: 'Modern Tech Stack',
            desc: 'Built with React, Vite, Tailwind CSS, and Framer Motion. Fast, accessible, and fully open-source.',
            color: 'bg-blue-50 border-blue-200 text-blue-600',
          },
          {
            icon: Shield,
            title: 'Privacy First',
            desc: 'All processing happens via the Anthropic API. No data is stored on servers. Scan history is kept locally in your browser.',
            color: 'bg-sage-50 border-sage-200 text-sage-600',
          },
          {
            icon: Leaf,
            title: 'Health-Focused',
            desc: 'Analysis covers additives, allergens, preservatives, artificial dyes, sweeteners, and more with evidence-based scoring.',
            color: 'bg-green-50 border-green-200 text-green-600',
          },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="bg-white rounded-2xl border border-sage-100 p-6 shadow-sm">
            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${color}`}>
              <Icon size={20} />
            </div>
            <h3 className="font-display font-bold text-sage-800 mb-2">{title}</h3>
            <p className="text-sm text-sage-600 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
        <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
          <Shield size={16} />
          Important Disclaimer
        </h3>
        <p className="text-sm text-amber-700 leading-relaxed">
          NutriScan AI is intended for educational and informational purposes only. The analysis
          provided should not be considered medical or nutritional advice. Always consult a
          qualified healthcare professional or registered dietitian for personalized dietary guidance.
          Individual health conditions may affect how ingredients impact you.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/scan"
          className="flex items-center justify-center gap-2 bg-sage-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-sage-700 transition-colors shadow-md"
        >
          Try NutriScan
        </Link>
        <a
          href="https://github.com/your-username/ai-food-ingredient-scanner"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-2 border-sage-200 text-sage-700 px-7 py-3.5 rounded-xl font-semibold hover:border-sage-400 transition-colors"
        >
          <Github size={16} />
          View on GitHub
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  )
}
