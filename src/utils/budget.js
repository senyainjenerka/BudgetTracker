export const isWithinDateRange = (transactionDate, startDate, endDate) => {
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

export const calculateBalance = (transactions = [], openingBalance = 0) =>
  transactions.reduce((balance, transaction) => {
    if (transaction.type === 'income') {
      return balance + transaction.amount
    }

    if (transaction.type === 'expense') {
      return balance - transaction.amount
    }

    return balance
  }, openingBalance)

export const categorizeExpense = (transaction, categories = []) => {
  if (!transaction?.category) {
    return 'Uncategorized'
  }

  return (
    categories.find((category) => category.id === transaction.category)?.title ?? 'Uncategorized'
  )
}

export const groupTransactionsForChart = (transactions = [], period = 'week') => {
  if (transactions.length === 0) {
    return []
  }

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

  const sortedTransactions = [...transactions].sort(
    (left, right) => new Date(left.date) - new Date(right.date),
  )
  const dailyMap = new Map()

  sortedTransactions.forEach((transaction) => {
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
    } else if (transaction.type === 'expense') {
      currentItem.spent += transaction.amount
    }
  })

  return Array.from(dailyMap.values()).slice(-7)
}

export const generateReport = (transactions = [], openingBalance = 0, categories = []) => {
  const incomeTransactions = transactions.filter((transaction) => transaction.type === 'income')
  const expenseTransactions = transactions.filter((transaction) => transaction.type === 'expense')
  const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  const totalSpent = expenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

  const spendingByCategoryMap = expenseTransactions.reduce((accumulator, transaction) => {
    const categoryTitle = categorizeExpense(transaction, categories)
    const currentValue = accumulator.get(categoryTitle) ?? {
      category: categoryTitle,
      total: 0,
      count: 0,
    }

    currentValue.total += transaction.amount
    currentValue.count += 1
    accumulator.set(categoryTitle, currentValue)

    return accumulator
  }, new Map())

  const topExpense =
    [...expenseTransactions].sort((left, right) => right.amount - left.amount)[0] ?? null
  const topIncome =
    [...incomeTransactions].sort((left, right) => right.amount - left.amount)[0] ?? null

  return {
    totalTransactions: transactions.length,
    incomeCount: incomeTransactions.length,
    expenseCount: expenseTransactions.length,
    totalIncome,
    totalSpent,
    netChange: totalIncome - totalSpent,
    balance: calculateBalance(transactions, openingBalance),
    topExpense,
    topIncome,
    spendingByCategory: Array.from(spendingByCategoryMap.values()).sort(
      (left, right) => right.total - left.total,
    ),
  }
}
