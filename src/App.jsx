import { useEffect, useMemo, useState } from 'react'
import styles from './styles/pages/App.module.css'
import {
  budgetCategories,
  budgetTemplates,
  creditCards,
  mockTransactions,
  monthOptions,
  transactionCategories,
} from './data/mockData'
import AddTransaction from './components/features/AddTransaction'
import BudgetChart from './components/features/BudgetChart'
import BudgetCategories from './components/features/BudgetCategories'
import BudgetSummary from './components/features/BudgetSummary'
import CreditCards from './components/features/CreditCards'
import Filter from './components/features/Filter'
import ReportGenerator from './components/features/ReportGenerator'
import TransactionList from './components/features/TransactionList'
import Header from './components/common/Header'
import Topbar from './components/common/Topbar'
import {
  calculateBalance,
  generateReport,
  groupTransactionsForChart,
  isWithinDateRange,
} from './utils/budget'

const openingBalance = 10500
const defaultFilters = {
  search: '',
  category: 'all',
  type: 'all',
  startDate: '',
  endDate: '',
}

function App() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [filters, setFilters] = useState(defaultFilters)
  const [selectedMonth, setSelectedMonth] = useState(
    monthOptions[1]?.value ?? monthOptions[0].value,
  )
  const [chartPeriod, setChartPeriod] = useState('week')
  const [selectedIds, setSelectedIds] = useState([])
  const [lastAddedTransaction, setLastAddedTransaction] = useState(null)

  const monthTransactions = useMemo(
    () =>
      selectedMonth === 'all'
        ? transactions
        : transactions.filter((transaction) => transaction.date.startsWith(selectedMonth)),
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
  const selectedMonthLabel =
    monthOptions.find((option) => option.value === selectedMonth)?.label ?? selectedMonth

  const summaryItems = budgetTemplates.map((item) => {
    if (item.id === 'balance') {
      return { ...item, amount: calculateBalance(transactions, openingBalance) }
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
  const report = useMemo(
    () => generateReport(filteredTransactions, openingBalance, transactionCategories),
    [filteredTransactions],
  )

useEffect(() => {
  console.group('Budget report')
  console.table(report.spendingByCategory)
  console.log('Balance:', report.balance)
  console.log('Income:', report.totalIncome)
  console.log('Spent:', report.totalSpent)
  console.groupEnd()
}, [report])


  const visibleSelectedIds = useMemo(
    () =>
      selectedIds.filter((id) => filteredTransactions.some((transaction) => transaction.id === id)),
    [selectedIds, filteredTransactions],
  )

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

  const handleDeleteSelected = () => {
    setTransactions((current) => current.filter((transaction) => !selectedIds.includes(transaction.id)))
    setSelectedIds([])
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
              <BudgetChart
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
                selectedIds={visibleSelectedIds}
                onToggleTransaction={handleToggleTransaction}
                onSelectAll={handleSelectAll}
                onDeleteSelected={handleDeleteSelected}
              />

              <div className={styles.controls}>
                <BudgetCategories categories={categoryItems} />
                <Filter
                  filters={filters}
                  categories={transactionCategories}
                  onChange={handleFilterChange}
                  onReset={() => setFilters(defaultFilters)}
                  resultCount={filteredTransactions.length}
                  selectedMonthLabel={selectedMonthLabel}
                />
                <ReportGenerator report={report} selectedMonthLabel={selectedMonthLabel} />
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
