# 🍔 FoodLens v0.1

> Your Personal Food Spending & Nutrition Intelligence Dashboard.

[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel)](https://food-lense-v01.vercel.app/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

FoodLens is a modern, responsive analytics dashboard designed to help you track your food delivery habits. By ingesting your historical orders from platforms like Zomato and Swiggy, FoodLens visualizes your spending trends, order frequencies, and estimated nutritional intake.

**[🚀 View Live Demo on Vercel](https://food-lense-v01.vercel.app/)**

---

## 📸 Screenshots

><img width="1464" height="806" alt="image" src="https://github.com/user-attachments/assets/aa9dbd04-0b2d-401f-8bde-4fb12fe37950" />
<img width="1465" height="802" alt="image" src="https://github.com/user-attachments/assets/c2b6d569-baae-43ac-a525-9c689639dc58" />
<img width="1464" height="821" alt="image" src="https://github.com/user-attachments/assets/b2ec805e-bf62-4cb2-b7df-d9a8262f38be" />
<img width="1470" height="803" alt="image" src="https://github.com/user-attachments/assets/7a92b6da-d4dc-4fb7-b2f7-20b3f8f20776" />


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

## 🚀 Take a look

Open your browser and navigate to the live site at `https://food-lense-v01.vercel.app/`.

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
