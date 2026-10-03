# Atlas — Country Explorer

Atlas is a small, responsive country directory built as a React practice project. Browse country flags and quick facts, search by country or capital, filter by region, and save the places you have visited.

## Features

- Search countries by name, capital, or region
- Filter the directory by region
- View a country’s flag, capital, population, and area
- Mark countries as visited; your list is saved in browser local storage
- Responsive layout for desktop, tablet, and mobile
- Loading, error, and no-results states

Country data is loaded from the [Programming Hero Countries API](https://openapi.programming-hero.com/api/all). An internet connection is needed to load the directory.

## Run locally

You will need [Node.js](https://nodejs.org/) and npm installed.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the project with Oxlint |

## Project structure

```text
src/
├── components/
│   ├── Country/       # Country card and its styles
│   └── countries/     # Data loading, search, filters, and directory layout
├── App.jsx            # Page layout and hero section
├── App.css            # Page and hero styles
├── index.css          # Global styles and design tokens
└── main.jsx           # React entry point
```

## Built with

- React 19
- Vite
- Plain CSS
- Programming Hero Countries API

Visited country IDs are stored in your browser under `atlas-visited-countries`. Clearing that browser storage resets the visited list.
