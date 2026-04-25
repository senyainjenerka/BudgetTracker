# BudgetTracker

BudgetTracker is a React finance dashboard for tracking personal income and expenses.

The project is designed to present financial data in a simple and visual way. It allows users to review transactions, monitor budget categories, and see how their activity affects totals and charts.

## What You Can Do

- view transaction history
- switch between available months
- filter transactions by category
- filter transactions by date range
- filter transactions by transaction type
- search transactions by title
- add new income and expense transactions
- see updated totals, category progress, and chart data

## Implemented Features

- React component-based interface
- reusable UI components
- mock financial data
- controlled form for adding transactions
- dynamic filtering
- automatic UI updates after data changes

## Technologies

- React
- Vite
- JavaScript
- CSS Modules

## Project Structure

The project is now organized so components, styles, data, utilities, and tests are separated more clearly:

```text
src/
├── components/
│   ├── common/
│   │   ├── Header/
│   │   └── Topbar/
│   ├── ui/
│   │   ├── Button/
│   │   └── Card/
│   └── features/
│       ├── AddTransaction/
│       ├── BudgetCategories/
│       ├── BudgetCategory/
│       ├── BudgetChart/
│       ├── BudgetSummary/
│       ├── Chart/
│       ├── CreditCards/
│       ├── Filter/
│       ├── ReportGenerator/
│       ├── TransactionItem/
│       └── TransactionList/
├── styles/
│   ├── components/
│   │   ├── common/
│   │   ├── ui/
│   │   └── features/
│   ├── pages/
│   └── globals.css
├── data/
├── utils/
├── App.jsx
└── main.jsx

tests/
├── components/
└── utils/
```
