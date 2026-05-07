# FinTrack

Application de suivi de finances personnelles développée en React/Vite. 
Permet de visualiser ses transactions du mois, calculer son solde, 
estimer ses intérêts et exporter ses données en CSV.

![CI](https://github.com/TON_USERNAME/fintrack-starter/actions/workflows/playwright.yml/badge.svg)

## Prérequis

- Node.js 20.11.0 (voir `.nvmrc`)
- npm

## Installation

```bash
git clone https://github.com/TON_USERNAME/fintrack-starter.git
cd fintrack-starter
npm install --legacy-peer-deps
```

## Lancement

```bash
# Développement
npm run dev

# Build production
npm run build

# Preview production
npm run preview
```

## Tests

```bash
# Tests unitaires (Jest)
npx jest

# Tests unitaires avec détail
npx jest --verbose

# Tests E2E (Playwright) — l'app doit être lancée
npx playwright test

# Couverture de code
npx jest --coverage
```

## Structure du projet

fintrack-starter/
├── src/
│   ├── App.jsx                      # Composant principal
│   ├── calculator.js                # Moteur de calcul financier
│   ├── export-csv.js                # Export CSV des transactions
│   ├── string-utils.js              # Utilitaires chaînes
│   ├── transactions-legacy.js       # Module legacy audité
│   ├── calculator.test.js           # Tests unitaires calculator
│   ├── export-csv.test.js           # Tests unitaires export CSV
│   ├── string-utils.test.js         # Tests unitaires string-utils
│   └── transactions-legacy.test.js  # Tests de caractérisation legacy
├── tests-e2e/
│   ├── pages/
│   │   └── transaction-form.js      # Page Object formulaire
│   ├── smoke.spec.js                # Test smoke page d'accueil
│   ├── balance.spec.js              # Test ajout transaction
│   ├── export-csv.spec.js           # Test export CSV
│   └── transactions.spec.js        # Test liste transactions
├── docs/
│   ├── audit.md                     # Audit module legacy
│   └── scenarios.md                 # Scénarios BDD
├── .github/workflows/               # CI GitHub Actions
├── playwright.config.js             # Config Playwright
└── babel.config.cjs                 # Config Babel/Jest

## Documentation

- [Audit du module legacy](docs/audit.md)
- [Scénarios BDD](docs/scenarios.md)