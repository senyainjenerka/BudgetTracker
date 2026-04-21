# BudgetTracker

BudgetTracker is a React-based finance dashboard for tracking personal income and expenses in a clear visual format.  
The application is designed as a small single-page interface where a user can review transactions, filter financial activity, inspect category spending, and add new records.

## What This Project Is For

This project represents a budgeting dashboard interface focused on everyday money management.

With this application, a user can:

- review a list of transactions
- switch between months
- filter transactions by category
- filter transactions by date range
- filter transactions by transaction type
- search transactions by title
- add new income or expense transactions
- see how financial data affects totals, categories, and charts

## What Is Implemented

The application already includes a complete UI with reusable React components and mock financial data.

### Core features

- transaction history view
- budget summary cards
- budget categories with progress indicators
- income and expense chart
- transaction filters
- add transaction form
- month-based navigation

### Implemented interactions

- filtering by month
- filtering by category
- filtering by transaction type
- filtering by start and end date
- searching by transaction title
- adding new transactions through a controlled form
- automatic update of totals after adding a transaction
- automatic update of category statistics
- automatic update of chart data

## Main Components

The project is built from reusable React components.

### Feature components

- `TransactionItem` — displays a single transaction
- `BudgetCategory` — displays a spending category with budget progress
- `Chart` — shows income and expense activity
- `AddTransaction` — provides a form for creating a new transaction
- `Filter` — controls filtering of visible data

### Additional components

- `Header` — top section of the dashboard
- `Topbar` — month selector and current result count
- `BudgetSummary` — summary cards for balance, income, and expenses
- `BudgetCategories` — grouped list of budget categories
- `TransactionList` — rendered list of filtered transactions
- `CreditCards` — visual finance card block
- `Button` and `Card` — reusable UI building blocks

## Data

The project uses mock data instead of a backend API.

The mock data includes:

- transactions
- budget categories
- budget summary templates
- credit card display data
- available month options

Transaction dates cover the period from:

- `2025-04-01`
- to `2026-04-21`

## How the Interface Works

The main application logic is located in `src/App.jsx`.

The app:

- stores transactions in React state
- filters visible records based on user input
- recalculates totals dynamically
- recalculates category spending dynamically
- rebuilds chart data from the currently visible month and filters
- inserts newly added transactions directly into the current dataset

When a user adds a new transaction:

- the transaction is added to the list
- the selected month changes to the month of that transaction
- totals are updated
- category data is updated
- the chart is updated

## Project Structure

```text
src/
  components/
    features/
    layout/
    ui/
  data/
    mockData.js
  utils/
    formatters.js
  App.jsx
  App.module.css
  main.jsx
```

## Technologies

- React
- Vite
- JavaScript (ES6+)
- CSS Modules

## How To Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## Example Usage

Here is a simple way to demonstrate the project:

1. Open the app in the browser.
2. Change the selected month in the top bar.
3. Apply a category filter in the filter panel.
4. Set a custom date range.
5. Add a new transaction with the form.
6. Observe how the transaction list, totals, category blocks, and chart update immediately.

## Current Status

This project is a finished frontend prototype built with React.  
It is suitable for demonstrating component-based UI development, state-driven rendering, controlled forms, filtering logic, and reusable interface design.
