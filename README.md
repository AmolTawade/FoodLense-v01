# 🍔 FoodLens v0.1

> Your Personal Food Spending & Nutrition Intelligence Dashboard.

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

FoodLens is a modern, responsive analytics dashboard designed to help you track your food delivery habits. By ingesting your historical orders from platforms like Zomato and Swiggy, FoodLens visualizes your spending trends, order frequencies, and estimated nutritional intake.

---

## 📸 Screenshots

> **Note:** To add your own screenshots, just take a screenshot of your deployed app, drag and drop the image file directly into this README editor on GitHub or VS Code, and it will automatically generate the link!

![Dashboard Overview Placeholder](https://placehold.co/1000x500/18181b/a1a1aa?text=Dashboard+Overview+Screenshot+Here)
*The main dashboard view showing KPI cards, monthly spending area charts, and top restaurants.*

![Analytics Charts Placeholder](https://placehold.co/1000x500/18181b/a1a1aa?text=Analytics+Charts+Screenshot+Here)
*Visualizing category breakdown, order timings, platform splits, and weekday vs. weekend patterns.*

---

## ✨ Features

- **Global Month Filter**: Instantly filter all metrics across the dashboard without reloading the page.
- **Spending Analytics**: Beautiful Area and Bar charts to track your budget over time.
- **Nutritional Estimates**: Aggregates estimated Calories, Protein, Carbs, and Fats based on the items you order.
- **Behavioral Insights**: Deterministic AI-style text insights that summarize spending patterns, favorite restaurants, and time-of-day preferences.
- **Responsive Design**: Designed with Tailwind CSS to look completely native and premium on desktop, tablet, and mobile.

## 🛠️ Technology Stack

- **Frontend Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Date Parsing**: date-fns

## 📂 Folder Structure

```text
FoodLense-v01/
├── src/
│   ├── components/      # Reusable UI (Dashboard layout, KPI Cards)
│   ├── data/            # Static JSON database (Synthetic Demo Data)
│   ├── services/        # Decoupled business logic (analytics, insights)
│   ├── types/           # TypeScript interfaces (Order, Dataset models)
│   ├── App.tsx          # Root container and State Management
│   └── index.css        # Tailwind CSS directives
└── package.json
```

## 🚀 Getting Started (Local Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AmolTawade/FoodLense-v01.git
   cd FoodLense-v01
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 🌐 Deployment

This project is optimized for **Vercel**:
1. Push your code to GitHub.
2. Go to your Vercel Dashboard and click **Add New Project**.
3. Import this repository.
4. Leave the default build settings (`npm run build` and `dist` folder).
5. Click **Deploy**.

## 🔮 Future Roadmap (v1.0+)
- **Live Integrations:** Fetch data directly from Email receipts or authenticated API endpoints.
- **AI-Powered Recommendations:** Real LLM integration to suggest healthier alternatives.
- **Backend Database:** Migrate from local JSON to Supabase/PostgreSQL for persistent user accounts.
