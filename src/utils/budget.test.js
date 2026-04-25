import {
  calculateBalance,
  categorizeExpense,
  generateReport,
  groupTransactionsForChart,
  isWithinDateRange,
} from './budget'

const categories = [
  { id: 'food', title: 'Food' },
  { id: 'transport', title: 'Transport' },
  { id: 'salary', title: 'Salary' },
]

const sampleTransactions = [
  {
    id: 1,
    title: 'Salary',
    amount: 3200,
    type: 'income',
    category: 'salary',
    date: '2026-04-02',
  },
  {
    id: 2,
    title: 'Groceries',
    amount: 150,
    type: 'expense',
    category: 'food',
    date: '2026-04-06',
  },
  {
    id: 3,
    title: 'Taxi',
    amount: 25,
    type: 'expense',
    category: 'transport',
    date: '2026-04-08',
  },
  {
    id: 4,
    title: 'Freelance',
    amount: 640,
    type: 'income',
    category: 'salary',
    date: '2026-04-14',
  },
]

describe('budget utils', () => {
  test('calculateBalance adds income and subtracts expenses from opening balance', () => {
    expect(calculateBalance(sampleTransactions, 1000)).toBe(4665)
  })

  test('calculateBalance ignores unknown transaction types', () => {
    expect(
      calculateBalance([{ id: 1, amount: 500, type: 'transfer' }], 1000),
    ).toBe(1000)
  })

  test('categorizeExpense returns a readable category title', () => {
    expect(categorizeExpense(sampleTransactions[1], categories)).toBe('Food')
  })

  test('categorizeExpense falls back to Uncategorized when category is missing', () => {
    expect(categorizeExpense({ id: 10, title: 'Unknown' }, categories)).toBe('Uncategorized')
    expect(
      categorizeExpense({ id: 11, title: 'Mystery', category: 'other' }, categories),
    ).toBe('Uncategorized')
  })

  test('isWithinDateRange validates start and end boundaries', () => {
    expect(isWithinDateRange('2026-04-10', '', '')).toBe(true)
    expect(isWithinDateRange('2026-04-10', '2026-04-01', '2026-04-30')).toBe(true)
    expect(isWithinDateRange('2026-03-31', '2026-04-01', '2026-04-30')).toBe(false)
    expect(isWithinDateRange('2026-05-01', '2026-04-01', '2026-04-30')).toBe(false)
  })

  test('groupTransactionsForChart groups weekly data by day labels', () => {
    expect(groupTransactionsForChart(sampleTransactions, 'week')).toEqual([
      { label: 'Apr 2', income: 3200, spent: 0 },
      { label: 'Apr 6', income: 0, spent: 150 },
      { label: 'Apr 8', income: 0, spent: 25 },
      { label: 'Apr 14', income: 640, spent: 0 },
    ])
  })

  test('groupTransactionsForChart groups monthly data into week buckets', () => {
    expect(groupTransactionsForChart(sampleTransactions, 'month')).toEqual([
      { label: 'Week 1', income: 3200, spent: 150 },
      { label: 'Week 2', income: 640, spent: 25 },
      { label: 'Week 3', income: 0, spent: 0 },
      { label: 'Week 4', income: 0, spent: 0 },
    ])
  })

  test('groupTransactionsForChart returns an empty array for empty input', () => {
    expect(groupTransactionsForChart([], 'week')).toEqual([])
  })

  test('generateReport returns totals, highlights and spending breakdown', () => {
    expect(generateReport(sampleTransactions, 1000, categories)).toEqual({
      totalTransactions: 4,
      incomeCount: 2,
      expenseCount: 2,
      totalIncome: 3840,
      totalSpent: 175,
      netChange: 3665,
      balance: 4665,
      topExpense: sampleTransactions[1],
      topIncome: sampleTransactions[0],
      spendingByCategory: [
        { category: 'Food', total: 150, count: 1 },
        { category: 'Transport', total: 25, count: 1 },
      ],
    })
  })

  test('generateReport handles an empty transaction list', () => {
    expect(generateReport([], 500, categories)).toEqual({
      totalTransactions: 0,
      incomeCount: 0,
      expenseCount: 0,
      totalIncome: 0,
      totalSpent: 0,
      netChange: 0,
      balance: 500,
      topExpense: null,
      topIncome: null,
      spendingByCategory: [],
    })
  })
})
