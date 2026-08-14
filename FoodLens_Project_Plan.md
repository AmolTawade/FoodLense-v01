# FoodLens v0.1 — Master Project Plan

## 1. Executive Summary
**FoodLens** is a personal food spending and nutrition intelligence dashboard designed to help users track and analyze their food delivery behavior. It seamlessly blends the utility of a personal finance app with the insights of a health and nutrition tracker, all wrapped in a premium, dark-themed user interface.

## 2. Product Goals
FoodLens answers four critical questions for the user:
- **💰 Spending:** How much money am I spending on food delivery?
- **🍔 Food:** What exactly am I ordering?
- **🔥 Nutrition:** What is the estimated nutritional impact of my diet?
- **🕐 Behavior:** When and how often am I ordering?

## 3. Scope & Features (v0.1 Prototype)
The initial prototype is built around a robust 12-month synthetic dataset (Sep 2025 – Aug 2026) consisting of 206 orders across platforms like Zomato and Swiggy. 
**Key Features Include:**
- **Dynamic Month Filtering:** A global selector allowing the user to filter metrics by specific months.
- **KPI Tracking:** High-level metrics tracking Total Spend, Orders, Estimated Calories, and Average Order Value against the previous month.
- **Visual Analytics:** Interactive charts for Monthly Spending, Order Frequency, Calorie Trends, Platform Splits, and Category Analysis.
- **Behavioral Insights:** Detailed breakdowns of Weekday vs. Weekend habits and Order Timing preferences.
- **Automated Insights:** A deterministic insight engine generating human-readable observations based on data trends.

## 4. Target Audience
- Heavy users of food delivery platforms (Zomato, Swiggy, UberEats, etc.)
- Individuals looking to optimize their food budgeting.
- Health-conscious users wanting a rough estimate of their macro and calorie intake from takeout.

## 5. Success Criteria
- **Performance:** Instantaneous dashboard updates upon changing the global date filter.
- **Aesthetics:** A "Wow" factor upon first load, utilizing modern web design patterns, subtle animations, and curated colors.
- **Accuracy:** Precise calculations of AOV, aggregations, and nutritional totals without data duplication or hardcoded UI figures.

## 6. Future Roadmap (v1.0+)
- **Live Data Ingestion:** OAuth integration with Gmail to automatically parse digital receipts from Zomato and Swiggy.
- **AI-Powered Insights:** Integration with LLMs (e.g., Gemini, Claude) for deep, personalized food coaching and budgeting advice.
- **Authentication:** User accounts via Supabase/Auth0 to save historical data across devices.
- **Mobile Application:** Porting the responsive web UI into a dedicated React Native / Expo application.
