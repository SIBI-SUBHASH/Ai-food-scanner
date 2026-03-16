# Contributing to NutriScan AI

Thank you for your interest in contributing! Here are the guidelines.

## Development Setup

```bash
git clone https://github.com/your-username/ai-food-ingredient-scanner.git
cd ai-food-ingredient-scanner
npm install
cp .env.example .env   # add your API key
npm run dev
```

## Code Style

- Use functional React components with hooks
- Keep components small and focused (single responsibility)
- Use Tailwind utility classes; avoid inline styles
- Prefer named exports for components
- Use descriptive variable names

## Branch Naming

- `feature/` — new features
- `fix/` — bug fixes
- `docs/` — documentation updates
- `refactor/` — code refactoring

## Pull Request Process

1. Fork the repository and create your branch from `main`
2. Write clear commit messages (use conventional commits if possible)
3. Update README.md if you've changed setup steps or added features
4. Ensure your code lints without errors (`npm run lint`)
5. Open a PR with a clear description of what you changed and why

## Reporting Bugs

Use the GitHub Issues tab. Include:
- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser and OS version

## Feature Requests

Open a GitHub Issue with the `enhancement` label and describe the feature clearly.
