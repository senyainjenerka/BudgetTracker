const buildMonthOptions = () => {
  const options = []
  const currentDate = new Date('2026-04-21')
  const startDate = new Date('2025-04-01')
  const cursor = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

  while (cursor >= startDate) {
    options.push({
      value: `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}`,
      label: new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(cursor),
    })

    cursor.setMonth(cursor.getMonth() - 1)
  }

  return options
}

export const monthOptions = buildMonthOptions()

export const budgetTemplates = [
  {
    id: 'balance',
    title: 'Total Balance',
    description: 'Main budget account',
    accent: '#55cd97',
  },
  {
    id: 'income',
    title: 'Income',
    description: 'Incoming transactions',
    accent: '#1ca1c1',
  },
  {
    id: 'spent',
    title: 'Spent',
    description: 'Expense transactions',
    accent: '#ff5c4c',
  },
]

export const budgetCategories = [
  { id: 'housing', title: 'Housing', limit: 1500, color: '#1c72c1' },
  { id: 'food', title: 'Food', limit: 700, color: '#55cd97' },
  { id: 'transport', title: 'Transport', limit: 320, color: '#fdbf4c' },
  { id: 'shopping', title: 'Shopping', limit: 600, color: '#8664c6' },
  { id: 'health', title: 'Health', limit: 300, color: '#48ad83' },
  { id: 'education', title: 'Education', limit: 450, color: '#ff5c4c' },
  { id: 'entertainment', title: 'Entertainment', limit: 350, color: '#1ca1c1' },
]

export const transactionCategories = [
  ...budgetCategories.map((category) => ({
    id: category.id,
    title: category.title,
    type: 'expense',
  })),
  { id: 'salary', title: 'Salary', type: 'income' },
  { id: 'freelance', title: 'Freelance', type: 'income' },
]

export const creditCards = [
  {
    id: 1,
    owner: 'Maryia Piatsiuk',
    bank: 'Visa Platinum',
    number: '**** 4172',
    expires: '09/28',
    amount: 8620.5,
    gradient: 'linear-gradient(135deg, #1c1f2b 0%, #31374d 100%)',
  },
  {
    id: 2,
    owner: 'Maryia Piatsiuk',
    bank: 'Travel Rewards',
    number: '**** 9034',
    expires: '04/29',
    amount: 3910.75,
    gradient: 'linear-gradient(135deg, #0e7490 0%, #155e75 100%)',
  },
]

export const mockTransactions = [
  {
    id: 1,
    title: 'Part-time salary',
    amount: 1800,
    type: 'income',
    category: 'salary',
    date: '2025-04-03',
    note: 'Spring semester income',
  },
  {
    id: 2,
    title: 'Supermarket',
    amount: 92.4,
    type: 'expense',
    category: 'food',
    date: '2025-04-15',
    note: 'Weekly groceries',
  },
  {
    id: 3,
    title: 'Bus pass',
    amount: 28,
    type: 'expense',
    category: 'transport',
    date: '2025-05-09',
    note: 'Monthly transport card',
  },
  {
    id: 4,
    title: 'Freelance banner design',
    amount: 260,
    type: 'income',
    category: 'freelance',
    date: '2025-05-26',
    note: 'Small client project',
  },
  {
    id: 5,
    title: 'Medical checkup',
    amount: 74.9,
    type: 'expense',
    category: 'health',
    date: '2025-06-12',
    note: 'Annual appointment',
  },
  {
    id: 6,
    title: 'Online course',
    amount: 149,
    type: 'expense',
    category: 'education',
    date: '2025-07-08',
    note: 'JavaScript intensive',
  },
  {
    id: 7,
    title: 'Cinema and snacks',
    amount: 31.5,
    type: 'expense',
    category: 'entertainment',
    date: '2025-08-14',
    note: 'Weekend break',
  },
  {
    id: 8,
    title: 'Laptop accessories',
    amount: 118,
    type: 'expense',
    category: 'shopping',
    date: '2025-09-19',
    note: 'Mouse and stand',
  },
  {
    id: 9,
    title: 'Autumn salary',
    amount: 2100,
    type: 'income',
    category: 'salary',
    date: '2025-10-02',
    note: 'Monthly payment',
  },
  {
    id: 10,
    title: 'Apartment rent',
    amount: 870,
    type: 'expense',
    category: 'housing',
    date: '2025-10-05',
    note: 'Monthly rent',
  },
  {
    id: 11,
    title: 'Groceries before exams',
    amount: 133.25,
    type: 'expense',
    category: 'food',
    date: '2025-11-21',
    note: 'Large supermarket purchase',
  },
  {
    id: 12,
    title: 'Winter freelance layout',
    amount: 480,
    type: 'income',
    category: 'freelance',
    date: '2025-12-10',
    note: 'Landing page for client',
  },
  {
    id: 13,
    title: 'New semester books',
    amount: 96,
    type: 'expense',
    category: 'education',
    date: '2026-01-17',
    note: 'Study materials',
  },
  {
    id: 14,
    title: 'Doctor visit',
    amount: 58.2,
    type: 'expense',
    category: 'health',
    date: '2026-02-08',
    note: 'Consultation and tests',
  },
  {
    id: 15,
    title: 'Spring salary',
    amount: 3200,
    type: 'income',
    category: 'salary',
    date: '2026-03-03',
    note: 'Main monthly income',
  },
  {
    id: 16,
    title: 'Shopping mall',
    amount: 164.7,
    type: 'expense',
    category: 'shopping',
    date: '2026-03-16',
    note: 'Clothes and essentials',
  },
  {
    id: 17,
    title: 'April salary',
    amount: 3200,
    type: 'income',
    category: 'salary',
    date: '2026-04-02',
    note: 'Monthly salary transfer',
  },
  {
    id: 18,
    title: 'Apartment rent',
    amount: 950,
    type: 'expense',
    category: 'housing',
    date: '2026-04-03',
    note: 'Rent payment',
  },
  {
    id: 19,
    title: 'Supermarket',
    amount: 146.35,
    type: 'expense',
    category: 'food',
    date: '2026-04-06',
    note: 'Weekly groceries',
  },
  {
    id: 20,
    title: 'Taxi to campus',
    amount: 24.5,
    type: 'expense',
    category: 'transport',
    date: '2026-04-08',
    note: 'Morning commute',
  },
  {
    id: 21,
    title: 'Course payment',
    amount: 180,
    type: 'expense',
    category: 'education',
    date: '2026-04-10',
    note: 'Frontend workshop',
  },
  {
    id: 22,
    title: 'Cinema evening',
    amount: 38,
    type: 'expense',
    category: 'entertainment',
    date: '2026-04-11',
    note: 'Movie tickets',
  },
  {
    id: 23,
    title: 'Freelance landing page',
    amount: 640,
    type: 'income',
    category: 'freelance',
    date: '2026-04-14',
    note: 'Client payment',
  },
  {
    id: 24,
    title: 'Pharmacy',
    amount: 41.8,
    type: 'expense',
    category: 'health',
    date: '2026-04-16',
    note: 'Medicine',
  },
  {
    id: 25,
    title: 'New headphones',
    amount: 125,
    type: 'expense',
    category: 'shopping',
    date: '2026-04-18',
    note: 'Electronics store',
  },
  {
    id: 26,
    title: 'Coffee and lunch',
    amount: 19.9,
    type: 'expense',
    category: 'food',
    date: '2026-04-20',
    note: 'Study day',
  },
  {
    id: 27,
    title: 'Project bonus',
    amount: 220,
    type: 'income',
    category: 'freelance',
    date: '2026-04-21',
    note: 'Final payment for urgent edits',
  },
]
