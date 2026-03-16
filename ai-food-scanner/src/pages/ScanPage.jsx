import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { ScanLine, Upload, Type, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react'
import { analyzeIngredients } from '../utils/api'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export default function ScanPage() {
  const [mode, setMode] = useState('text') // 'text' | 'image'
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onDrop = useCallback((accepted, rejected) => {
    setError('')
    if (rejected.length > 0) {
      setError('File too large or unsupported type. Please use JPG, PNG, or WEBP under 5MB.')
      return
    }
    const f = accepted[0]
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  })

  const clearImage = () => {
    setFile(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setError('')
  }

  const handleScan = async () => {
    setError('')
    if (mode === 'text' && !text.trim()) {
      setError('Please enter some ingredients to analyze.')
      return
    }
    if (mode === 'image' && !file) {
      setError('Please upload an image to analyze.')
      return
    }

    setLoading(true)
    try {
      const result = await analyzeIngredients(mode === 'text' ? text : file, mode)
      // Store result and navigate
      sessionStorage.setItem('scanResult', JSON.stringify(result))
      // Save to history
      const history = JSON.parse(localStorage.getItem('scanHistory') || '[]')
      history.unshift({ ...result, id: Date.now(), date: new Date().toISOString() })
      localStorage.setItem('scanHistory', JSON.stringify(history.slice(0, 20)))
      navigate('/results')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please check your API key and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-bold text-sage-900 mb-3">Scan Ingredients</h1>
        <p className="text-sage-600">Enter ingredients manually or upload a photo of the food label</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 p-1.5 bg-sage-100 rounded-2xl mb-8">
        {[
          { id: 'text',  icon: Type,        label: 'Type Ingredients' },
          { id: 'image', icon: ImageIcon,    label: 'Upload Image' },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => { setMode(id); setError('') }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              mode === id
                ? 'bg-white text-sage-800 shadow-sm'
                : 'text-sage-600 hover:text-sage-800'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-sage-100 shadow-sm p-8">
        {/* Text Mode */}
        {mode === 'text' && (
          <div>
            <label className="block text-sm font-semibold text-sage-700 mb-2">
              Paste or type the ingredients list
            </label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="e.g. Water, Sugar, High Fructose Corn Syrup, Citric Acid, Natural Flavors, Red 40, Sodium Benzoate..."
              rows={8}
              className="w-full bg-cream-50 border border-sage-100 rounded-2xl p-4 text-sm text-sage-800 placeholder-sage-300 focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100 transition-all resize-none font-mono"
            />
            <p className="text-xs text-sage-400 mt-2">
              Tip: Copy directly from the product packaging. Separate ingredients with commas.
            </p>
          </div>
        )}

        {/* Image Mode */}
        {mode === 'image' && (
          <div>
            {!preview ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
                  isDragActive
                    ? 'border-sage-400 bg-sage-50'
                    : 'border-sage-200 hover:border-sage-400 hover:bg-sage-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload size={28} className="text-sage-500" />
                </div>
                <p className="font-semibold text-sage-700 mb-1">
                  {isDragActive ? 'Drop your image here' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-sm text-sage-400">JPG, PNG, WEBP · Max 5MB</p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={preview}
                  alt="Uploaded label"
                  className="w-full max-h-80 object-contain rounded-2xl border border-sage-100 bg-cream-50"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <X size={14} className="text-sage-600" />
                </button>
                <div className="mt-3 flex items-center gap-2 text-sm text-sage-600">
                  <ImageIcon size={14} />
                  {file?.name}
                  <span className="text-sage-400">· {(file?.size / 1024).toFixed(0)} KB</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {/* Scan Button */}
        <button
          onClick={handleScan}
          disabled={loading}
          className={`w-full mt-6 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base transition-all duration-200 ${
            loading
              ? 'bg-sage-300 text-sage-600 cursor-not-allowed'
              : 'bg-sage-600 hover:bg-sage-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Analyzing ingredients...
            </>
          ) : (
            <>
              <ScanLine size={20} />
              Analyze Ingredients
            </>
          )}
        </button>

        {/* API Note */}
        <p className="text-xs text-center text-sage-400 mt-4">
          Requires an Anthropic API key configured in{' '}
          <code className="bg-sage-100 px-1.5 py-0.5 rounded font-mono">.env</code>
        </p>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-cream-50/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-10 shadow-2xl border border-sage-100 text-center max-w-sm w-full mx-4">
            <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-5 relative overflow-hidden">
              <ScanLine size={32} className="text-sage-600" />
              <div className="absolute inset-x-0 top-0 h-1 bg-sage-400/40" style={{ animation: 'scanLine 1.5s linear infinite' }} />
            </div>
            <h3 className="font-display font-bold text-xl text-sage-800 mb-2">Scanning...</h3>
            <p className="text-sm text-sage-500">Claude AI is analyzing each ingredient for health risks and benefits</p>
            <div className="mt-5 flex justify-center gap-1.5">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-sage-400"
                  style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
