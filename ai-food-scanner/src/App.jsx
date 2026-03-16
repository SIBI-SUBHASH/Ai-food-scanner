import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ScanPage from './pages/ScanPage'
import ResultsPage from './pages/ResultsPage'
import HistoryPage from './pages/HistoryPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="scan" element={<ScanPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}
