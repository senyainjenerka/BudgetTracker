import { render, screen } from '@testing-library/react'
import ReportGenerator from '../../src/components/features/ReportGenerator'
import { generateReport } from '../../src/utils/budget'

const categories = [
  { id: 'food', title: 'Food' },
  { id: 'salary', title: 'Salary' },
  { id: 'transport', title: 'Transport' },
]

describe('ReportGenerator', () => {
  test('renders an empty state when there are no transactions', () => {
    render(
      <ReportGenerator
        selectedMonthLabel="April 2026"
        report={generateReport([], 1000, categories)}
      />,
    )

    expect(screen.getByText('April 2026')).toBeInTheDocument()
    expect(screen.getByText(/0 transactions analysed/i)).toBeInTheDocument()
    expect(screen.getByText(/no transactions available for report generation/i)).toBeInTheDocument()
  })

  test('renders report totals, highlights and category breakdown', () => {
    const report = generateReport(
      [
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
      ],
      1000,
      categories,
    )

    render(<ReportGenerator selectedMonthLabel="April 2026" report={report} />)

    expect(screen.getByText('$3,200.00')).toBeInTheDocument()
    expect(screen.getByText('$175.00')).toBeInTheDocument()
    expect(screen.getByText('$3,025.00')).toBeInTheDocument()
    expect(screen.getByText('$4,025.00')).toBeInTheDocument()
    expect(screen.getByText('Salary')).toBeInTheDocument()
    expect(screen.getByText('Groceries')).toBeInTheDocument()
    expect(screen.getByText('Food (1)')).toBeInTheDocument()
    expect(screen.getByText('Transport (1)')).toBeInTheDocument()
  })
})
