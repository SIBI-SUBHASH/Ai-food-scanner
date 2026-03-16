# 🌿 NutriScan AI — Food Ingredient Health Scanner

<div align="center">

![NutriScan AI Banner](https://img.shields.io/badge/NutriScan-AI%20Powered-3a6735?style=for-the-badge&logo=leaf&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)
![Claude AI](https://img.shields.io/badge/Claude-AI-D97706?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Instantly analyze food ingredients for health risks and benefits using Claude AI.**

[Live Demo](#) · [Report Bug](issues) · [Request Feature](issues)

</div>

---

## 📸 Screenshots

> Upload a food label or paste ingredients → get a full health breakdown in seconds.

| Home Page | Scan Page | Results Page |
|-----------|-----------|--------------|
| Hero with demo card | Drag & drop or text input | Score gauge + ingredient cards |

---

## ✨ Features

- 🔍 **Ingredient Analysis** — Analyze any ingredient list for health impacts
- 📷 **Image Upload** — Take a photo of a food label and let AI read it
- 🏆 **Health Scoring** — Each product gets a 0–100 health score
- ⚠️ **Risk Detection** — Flags additives, artificial dyes, harmful preservatives
- 💡 **Smart Alternatives** — Suggests healthier ingredient substitutes
- 📚 **Source Citations** — Links analysis to WHO, FDA, EFSA research
- 🕒 **Scan History** — Locally stored history of all your scans
- 📤 **Export Reports** — Download results as JSON
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🔒 **Privacy First** — No server-side data storage

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion |
| Routing | React Router v6 |
| AI Engine | Anthropic Claude API |
| File Uploads | React Dropzone |
| Icons | Lucide React |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9+ or **yarn**
- An **Anthropic API key** → [Get one here](https://console.anthropic.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ai-food-ingredient-scanner.git

# 2. Navigate into the project
cd ai-food-ingredient-scanner

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env
```

### Configure Your API Key

Open `.env` and add your Anthropic API key:

```env
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

> ⚠️ **Never commit your `.env` file!** It's already in `.gitignore`.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 📁 Project Structure

```
ai-food-ingredient-scanner/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Layout.jsx           # Navbar + Footer wrapper
│   │   ├── HealthScoreGauge.jsx # SVG arc gauge component
│   │   └── IngredientCard.jsx   # Expandable ingredient card
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page with demo
│   │   ├── ScanPage.jsx         # Upload / text input page
│   │   ├── ResultsPage.jsx      # Analysis results display
│   │   ├── HistoryPage.jsx      # Local scan history
│   │   └── AboutPage.jsx        # About + tech info
│   ├── utils/
│   │   └── api.js               # Anthropic API integration
│   ├── App.jsx                  # Route configuration
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles + Tailwind
├── .env.example                 # Environment variable template
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🔑 How the AI Analysis Works

1. **Input** — User types ingredients or uploads a food label image
2. **Prompt Engineering** — A structured system prompt instructs Claude to act as a food safety expert
3. **Claude Analysis** — Claude analyzes each ingredient using its knowledge of nutrition science
4. **Structured Output** — Claude returns a strict JSON schema with scores, risks, and alternatives
5. **UI Rendering** — Results are displayed in an interactive dashboard

### Sample AI Response Schema

```json
{
  "productName": "Strawberry Soda",
  "overallScore": 42,
  "summary": "This product contains several concerning additives...",
  "recommendation": "Consider choosing products without artificial dyes...",
  "ingredients": [
    {
      "name": "Red 40",
      "e_number": "E129",
      "status": "warning",
      "shortDesc": "Artificial dye — linked to hyperactivity in children",
      "details": "Red 40 (Allura Red AC) is a synthetic petroleum-derived food dye...",
      "concerns": ["Linked to hyperactivity in children", "May cause allergic reactions"],
      "alternatives": ["Beet juice extract", "Hibiscus extract"],
      "sources": ["EFSA 2012 review", "Southampton study"]
    }
  ]
}
```

---

## 🌍 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard:
# VITE_ANTHROPIC_API_KEY = your_key
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Drag the dist/ folder to Netlify Drop
# Or connect your GitHub repo in Netlify dashboard
# Add VITE_ANTHROPIC_API_KEY in Site Settings > Environment Variables
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy
```

---

## 🔒 Security & Privacy

- API calls go directly from your browser to Anthropic's API
- No ingredient data is stored on any third-party server
- Scan history is stored **only** in your browser's `localStorage`
- The `.env` file containing your API key is gitignored by default

> **Important:** In production deployments, consider using a backend proxy to protect your API key from being exposed in the browser bundle.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# 1. Fork the repo
# 2. Create a feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m 'Add amazing feature'

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on code style and PR process.

---

## 📋 Roadmap

- [ ] Barcode scanning support
- [ ] Nutritional value analysis (calories, macros)
- [ ] Allergen alerts with user profile
- [ ] Comparison of multiple products
- [ ] Export as PDF report
- [ ] Browser extension
- [ ] Mobile app (React Native)

---

## ⚖️ License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

- [Anthropic](https://anthropic.com) for Claude AI
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [Lucide Icons](https://lucide.dev) for the icon set
- [React Dropzone](https://react-dropzone.js.org) for file uploads
- [Framer Motion](https://framer.com/motion) for animations

---

<div align="center">

Made with ❤️ and 🌿 | Powered by Claude AI

</div>
