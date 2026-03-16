# 📤 How to Put This Project on GitHub
## Step-by-Step Guide (No Experience Needed)

---

## STEP 1 — Install Git (if you haven't already)

### Windows
1. Go to https://git-scm.com/download/win
2. Download and run the installer (keep all default options)
3. Open **Git Bash** (search it in Start Menu)

### macOS
Open **Terminal** and run:
```bash
xcode-select --install
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update && sudo apt install git
```

**Verify installation:**
```bash
git --version
# Should print something like: git version 2.43.0
```

---

## STEP 2 — Create a GitHub Account

1. Go to https://github.com
2. Click **Sign up**
3. Choose a username, enter your email, and create a password
4. Verify your email address

---

## STEP 3 — Create a New Repository on GitHub

1. Log into GitHub
2. Click the **+** button (top-right) → **New repository**
3. Fill in:
   - **Repository name:** `ai-food-ingredient-scanner`
   - **Description:** `AI-powered food ingredient health scanner using Claude AI`
   - **Visibility:** Public (or Private if you prefer)
   - ❌ Do NOT check "Add a README file" (we already have one)
   - ❌ Do NOT add .gitignore (we already have one)
4. Click **Create repository**
5. 📋 **Copy the repository URL** shown — it looks like:
   `https://github.com/YOUR-USERNAME/ai-food-ingredient-scanner.git`

---

## STEP 4 — Set Up Git on Your Computer (First Time Only)

Open your terminal/Git Bash and run:
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

---

## STEP 5 — Navigate to the Project Folder

```bash
# If you downloaded/unzipped the project, navigate to it:
cd path/to/ai-food-ingredient-scanner

# Example on Windows:
cd C:\Users\YourName\Downloads\ai-food-ingredient-scanner

# Example on macOS/Linux:
cd ~/Downloads/ai-food-ingredient-scanner
```

---

## STEP 6 — Initialize Git and Push to GitHub

Run these commands one by one:

```bash
# Initialize a git repository
git init

# Add all files to staging
git add .

# Create the first commit
git commit -m "Initial commit: NutriScan AI food ingredient scanner"

# Rename the branch to 'main' (GitHub default)
git branch -M main

# Link to your GitHub repository (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/ai-food-ingredient-scanner.git

# Push the code to GitHub
git push -u origin main
```

✅ Your code is now on GitHub!

---

## STEP 7 — Add Your API Key as a GitHub Secret (For CI/CD)

So GitHub Actions can build your project:

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `VITE_ANTHROPIC_API_KEY`
5. Value: your actual Anthropic API key
6. Click **Add secret**

---

## STEP 8 — Set Up the Project Locally After Cloning

Anyone (including you on a new computer) can run:

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/ai-food-ingredient-scanner.git
cd ai-food-ingredient-scanner

# Install dependencies
npm install

# Create your .env file
cp .env.example .env

# Open .env and add your API key:
# VITE_ANTHROPIC_API_KEY=sk-ant-...

# Start the dev server
npm run dev
```

---

## STEP 9 — Making Future Updates

Every time you make changes and want to update GitHub:

```bash
# See what changed
git status

# Stage all changes
git add .

# Commit with a descriptive message
git commit -m "Add barcode scanning feature"

# Push to GitHub
git push
```

---

## STEP 10 — (Optional) Deploy to Vercel for Free

1. Go to https://vercel.com and sign in with GitHub
2. Click **New Project** → Import your `ai-food-ingredient-scanner` repo
3. In **Environment Variables**, add:
   - `VITE_ANTHROPIC_API_KEY` = your API key
4. Click **Deploy**
5. 🎉 Your app is live at `https://your-project.vercel.app`

Vercel auto-deploys every time you push to `main`!

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| `git: command not found` | Install Git (Step 1) |
| `Permission denied` | Use HTTPS URL, not SSH, or set up SSH keys |
| `remote origin already exists` | Run `git remote set-url origin YOUR_URL` |
| `failed to push — rejected` | Run `git pull origin main --rebase` first |
| API key not working | Check `.env` file exists and key starts with `sk-ant-` |

---

## 📁 What Gets Uploaded vs Ignored

| Uploaded ✅ | NOT Uploaded ❌ |
|------------|----------------|
| All source code | `node_modules/` |
| `README.md` | `.env` (your API key!) |
| `package.json` | `dist/` build folder |
| `.gitignore` | `.DS_Store` |
| `.env.example` | Any `*.log` files |

---

*Made for NutriScan AI — https://github.com/your-username/ai-food-ingredient-scanner*
