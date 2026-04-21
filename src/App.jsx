import { useEffect, useMemo, useState } from 'react'
import styles from './App.module.css'
import {
  budgetCategories,
  budgetTemplates,
  creditCards,
  mockTransactions,
  monthOptions,
  transactionCategories,
} from './data/mockData'
import Chart from './components/features/Chart'
import AddTransaction from './components/features/AddTransaction'
import BudgetCategories from './components/features/BudgetCategories'
import BudgetSummary from './components/features/BudgetSummary'
import CreditCards from './components/features/CreditCards'
import Filter from './components/features/Filter'
import TransactionList from './components/features/TransactionList'
import Header from './components/layout/Header'
import Topbar from './components/layout/Topbar'

const openingBalance = 10500
const defaultFilters = {
  search: '',
  category: 'all',
  type: 'all',
  startDate: '',
  endDate: '',
}

const isWithinDateRange = (transactionDate, startDate, endDate) => {
  if (!startDate && !endDate) {
    return true
  }

  const currentDate = new Date(transactionDate)

  if (startDate && currentDate < new Date(startDate)) {
    return false
  }

  if (endDate && currentDate > new Date(endDate)) {
    return false
  }

  return true
}

const groupTransactionsForChart = (transactions, period) => {
  const expenseTransactions = transactions.filter((item) => item.type === 'expense')
  const incomeTransactions = transactions.filter((item) => item.type === 'income')

  if (period === 'month') {
    const buckets = [
      { label: 'Week 1', income: 0, spent: 0, matcher: (day) => day <= 7 },
      { label: 'Week 2', income: 0, spent: 0, matcher: (day) => day >= 8 && day <= 14 },
      { label: 'Week 3', income: 0, spent: 0, matcher: (day) => day >= 15 && day <= 21 },
      { label: 'Week 4', income: 0, spent: 0, matcher: (day) => day >= 22 },
    ]

    incomeTransactions.forEach((transaction) => {
      const day = new Date(transaction.date).getDate()
      const bucket = buckets.find((item) => item.matcher(day))

      if (bucket) {
        bucket.income += transaction.amount
      }
    })

    expenseTransactions.forEach((transaction) => {
      const day = new Date(transaction.date).getDate()
      const bucket = buckets.find((item) => item.matcher(day))

      if (bucket) {
        bucket.spent += transaction.amount
      }
    })

    return buckets.map(({ label, income, spent }) => ({ label, income, spent }))
  }

  const currentMonthTransactions = [...transactions].sort(
    (left, right) => new Date(left.date) - new Date(right.date),
  )

  const dailyMap = new Map()

  currentMonthTransactions.forEach((transaction) => {
    const label = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(new Date(transaction.date))

    if (!dailyMap.has(label)) {
      dailyMap.set(label, { label, income: 0, spent: 0 })
    }

    const currentItem = dailyMap.get(label)

    if (transaction.type === 'income') {
      currentItem.income += transaction.amount
    } else {
      currentItem.spent += transaction.amount
    }
  })

  return Array.from(dailyMap.values()).slice(-7)
}

function App() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [filters, setFilters] = useState(defaultFilters)
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0].value)
  const [chartPeriod, setChartPeriod] = useState('week')
  const [selectedIds, setSelectedIds] = useState([])
  const [lastAddedTransaction, setLastAddedTransaction] = useState(null)

  const monthTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.date.startsWith(selectedMonth)),
    [transactions, selectedMonth],
  )

  const filteredTransactions = useMemo(
    () =>
      monthTransactions
        .filter((transaction) =>
          transaction.title.toLowerCase().includes(filters.search.toLowerCase()),
        )
        .filter((transaction) =>
          filters.category === 'all' ? true : transaction.category === filters.category,
        )
        .filter((transaction) =>
          filters.type === 'all' ? true : transaction.type === filters.type,
        )
        .filter((transaction) =>
          isWithinDateRange(transaction.date, filters.startDate, filters.endDate),
        )
        .sort((left, right) => new Date(right.date) - new Date(left.date)),
    [monthTransactions, filters],
  )

  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const totalSpent = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const summaryItems = budgetTemplates.map((item) => {
    if (item.id === 'balance') {
      return { ...item, amount: openingBalance + totalIncome - totalSpent }
    }

    if (item.id === 'income') {
      return { ...item, amount: totalIncome }
    }

    return { ...item, amount: totalSpent }
  })

  const categoryMap = transactionCategories.reduce((accumulator, category) => {
    accumulator[category.id] = category.title
    return accumulator
  }, {})

  const categoryItems = budgetCategories.map((category) => {
    const categoryTransactions = monthTransactions.filter(
      (transaction) =>
        transaction.type === 'expense' &&
        transaction.category === category.id &&
        isWithinDateRange(transaction.date, filters.startDate, filters.endDate),
    )
    const spent = categoryTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

    return {
      ...category,
      spent,
      progress: Math.min(Math.round((spent / category.limit) * 100), 100),
      transactionsCount: categoryTransactions.length,
    }
  })

  const chartSource = monthTransactions.filter((transaction) =>
    filters.category === 'all' ? true : transaction.category === filters.category,
  )
  const chartData = groupTransactionsForChart(
    chartSource.filter((transaction) =>
      isWithinDateRange(transaction.date, filters.startDate, filters.endDate),
    ),
    chartPeriod,
  )

  const chartIncomeTotal = chartSource
    .filter(
      (transaction) =>
        transaction.type === 'income' &&
        isWithinDateRange(transaction.date, filters.startDate, filters.endDate),
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const chartSpentTotal = chartSource
    .filter(
      (transaction) =>
        transaction.type === 'expense' &&
        isWithinDateRange(transaction.date, filters.startDate, filters.endDate),
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  useEffect(() => {
    setSelectedIds((current) =>
      current.filter((id) => filteredTransactions.some((transaction) => transaction.id === id)),
    )
  }, [filteredTransactions])

  const handleFilterChange = (field, value) => {
    setFilters((current) => {
      const nextFilters = { ...current, [field]: value }

      if (field === 'startDate' && nextFilters.endDate && value > nextFilters.endDate) {
        nextFilters.endDate = value
      }

      if (field === 'endDate' && nextFilters.startDate && value < nextFilters.startDate) {
        nextFilters.startDate = value
      }

      return nextFilters
    })
  }

  const handleAddTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      title: transaction.title.trim(),
      note: transaction.note.trim(),
    }

    setTransactions((current) => [newTransaction, ...current])
    setSelectedMonth(newTransaction.date.slice(0, 7))
    setLastAddedTransaction(newTransaction)
    console.log('Transaction added:', newTransaction)
  }

  const handleToggleTransaction = (transactionId) => {
    setSelectedIds((current) =>
      current.includes(transactionId)
        ? current.filter((id) => id !== transactionId)
        : [...current, transactionId],
    )
  }

  const handleSelectAll = () => {
    const visibleIds = filteredTransactions.map((transaction) => transaction.id)

    setSelectedIds((current) => {
      const allVisibleSelected = visibleIds.every((id) => current.includes(id))

      if (allVisibleSelected) {
        return current.filter((id) => !visibleIds.includes(id))
      }

      return [...new Set([...current, ...visibleIds])]
    })
  }

  const handleShowDetails = (transaction) => {
    console.log('Transaction details:', transaction)
  }

  return (
    <div className={styles.app}>
      <div className={styles.shell}>
        <main className={styles.main}>
          <Header
            title="BudgetTracker"
            subtitle="React implementation of the fintech dashboard prototype with reusable components, props, mock data, filters and transaction creation."
          />

          <Topbar
            monthOptions={monthOptions}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
            transactionCount={filteredTransactions.length}
          />

          <div className={styles.content}>
            <BudgetSummary items={summaryItems} />

            <section className={styles.topRow}>
              <Chart
                data={chartData}
                period={chartPeriod}
                onPeriodChange={setChartPeriod}
                incomeTotal={chartIncomeTotal}
                spentTotal={chartSpentTotal}
              />
              <CreditCards cards={creditCards} />
            </section>

            <section className={styles.bottomRow}>
              <TransactionList
                transactions={filteredTransactions}
                categoriesMap={categoryMap}
                selectedIds={selectedIds}
                onToggleTransaction={handleToggleTransaction}
                onSelectAll={handleSelectAll}
                onShowDetails={handleShowDetails}
              />

              <div className={styles.controls}>
                <BudgetCategories categories={categoryItems} />
                <Filter
                  filters={filters}
                  categories={transactionCategories}
                  onChange={handleFilterChange}
                  onReset={() => setFilters(defaultFilters)}
                  resultCount={filteredTransactions.length}
                  selectedMonthLabel={
                    monthOptions.find((option) => option.value === selectedMonth)?.label ??
                    selectedMonth
                  }
                />
                <AddTransaction
                  categories={transactionCategories}
                  onAddTransaction={handleAddTransaction}
                  lastAddedTransaction={lastAddedTransaction}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
