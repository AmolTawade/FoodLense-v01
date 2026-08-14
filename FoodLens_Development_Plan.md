# FoodLens v0.1 — Detailed Development Plan

## 1. Technology Stack
The prototype leverages the simplest and most effective modern stack for a fast, client-side dashboard:
- **Core Framework:** React 18
- **Language:** TypeScript (Strict Mode)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v3 (Utility-first CSS framework)
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Utilities:** `date-fns` (Date parsing/formatting), `clsx` & `tailwind-merge` (Class merging)

## 2. Detailed Folder Structure
The repository follows a clean, feature-driven architectural pattern:

```text
FoodLense-v01/
├── src/
│   ├── assets/              # Static assets (images, raw icons)
│   ├── components/          # Reusable UI components
│   │   ├── Dashboard.tsx    # Main layout, combines all charts, tables, and KPIs
│   │   └── KPICard.tsx      # Reusable stat card component (e.g., Total Spend)
│   ├── data/                # Static local database for the prototype
│   │   ├── raw_orders.csv   # The original parsed CSV from requirements
│   │   └── foodlens_sample_orders_12_months.json # Normalized JSON single-source of truth
│   ├── services/            # Pure functions for business logic and data processing
│   │   ├── analyticsService.ts # Aggregates, reduces, and maps Order[] to chart data
│   │   └── insightService.ts   # Deterministic engine generating text-based observations
│   ├── types/               # Global TypeScript definitions
│   │   └── index.ts         # Contains `Order` and `OrderItem` interfaces
│   ├── App.tsx              # Root component; loads JSON data and manages the global month state
│   ├── main.tsx             # React DOM rendering entry point
│   └── index.css            # Global CSS variables and Tailwind directives
├── public/                  # Public assets (favicon)
├── tailwind.config.js       # Tailwind configuration and content paths
├── vite.config.ts           # Vite build configuration
└── package.json             # NPM dependencies and scripts
```

## 3. Data Architecture & Flow
1. **Source:** `foodlens_sample_orders_12_months.json` acts as the persistent datastore.
2. **State Management:** `App.tsx` imports the JSON and maintains the `selectedMonth` global state.
3. **Processing:** `Dashboard.tsx` uses `useMemo` hooks to pass the raw data array to `analyticsService.ts`.
4. **Presentation:** The service layer returns purely structured chart data, which is immediately consumed and rendered by Recharts components.

## 4. Deployment Details (Vercel)
The project is optimized for zero-config deployment on Vercel.
- **Build Command:** `npm run build` (Runs `tsc -b && vite build`)
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **CI/CD:** Every push to the `main` branch triggers an automated Vercel build. The static output from Vite is distributed globally across the Vercel Edge Network.

## 5. Future Real-Data Integration Strategy
The UI is entirely decoupled from the origin of the data. To upgrade from the v0.1 Prototype to live data:
- Introduce an **Ingestion Pipeline** (e.g., a Next.js API route or serverless function) that takes email receipts or API payloads.
- **Normalizer:** Convert varying payloads into the existing `Order[]` schema defined in `src/types/index.ts`.
- Replace the static `datasetRaw` import in `App.tsx` with a `useEffect` fetch call (`await fetch('/api/orders')`).
- **Result:** The dashboard requires zero modifications; `analyticsService.ts` will digest the real data perfectly.
