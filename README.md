# CVC Infinity Pro ♾️

Outil thermodynamique expert pour le calcul de cycles frigorifiques en temps réel.

## Stack Technique

- **Next.js 14** (App Router)
- **Tailwind CSS** — Interface dark pro
- **Zustand** — Gestion d'état réactive
- **SVG dynamique** — Diagramme de Mollier log(P)/h

## Lancement local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Déploiement Vercel

1. Push sur GitHub
2. Importer le repo sur [vercel.com](https://vercel.com)
3. Déploiement automatique ✅

## Fonctionnalités

- 🎛️ Contrôle en temps réel des pressions BP/HP, surchauffe, sous-refroidissement
- 📊 Diagramme enthalpique dynamique (log P / h)
- 🔢 Calcul du COP, puissance frigorifique, rapport de compression
- 📍 Affichage des 4 points du cycle (ASP, REF, LIQ, INJ)
- ⚡ Moteur thermodynamique R32 embarqué

## Architecture

```
src/
├── app/
│   ├── layout.js       # Layout racine
│   ├── page.js         # Interface principale
│   └── globals.css     # Styles globaux
├── components/
│   └── MollierChart.js # Diagramme SVG dynamique
├── hooks/
│   └── useThermodynamics.js  # Moteur de calcul
└── store/
    └── useCvcStore.js  # État global Zustand
```
