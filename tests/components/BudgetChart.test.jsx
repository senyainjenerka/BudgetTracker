import { fireEvent, render, screen } from '@testing-library/react'
import BudgetChart from '../../src/components/features/BudgetChart'

describe('BudgetChart', () => {
  test('renders empty state when there is no chart data', () => {
    render(
      <BudgetChart
        data={[]}
        period="week"
        onPeriodChange={jest.fn()}
        incomeTotal={0}
        spentTotal={0}
      />,
    )

    expect(screen.getByText(/no chart data for the selected date/i)).toBeInTheDocument()
    expect(screen.getAllByText('$0.00')).toHaveLength(2)
  })

  test('renders chart labels, totals and handles period changes', () => {
    const onPeriodChange = jest.fn()

    render(
      <BudgetChart
        data={[
          { label: 'Apr 2', income: 3200, spent: 950 },
          { label: 'Apr 14', income: 640, spent: 0 },
          { label: 'Apr 18', income: 0, spent: 125 },
        ]}
        period="week"
        onPeriodChange={onPeriodChange}
        incomeTotal={3840}
        spentTotal={1075}
      />,
    )

    expect(screen.getByText('Apr 2')).toBeInTheDocument()
    expect(screen.getByText('Apr 14')).toBeInTheDocument()
    expect(screen.getByText('Apr 18')).toBeInTheDocument()
    expect(screen.getByText('$3,840.00')).toBeInTheDocument()
    expect(screen.getByText('$1,075.00')).toBeInTheDocument()

    fireEvent.change(screen.getByRole('combobox', { name: /chart period/i }), {
      target: { value: 'month' },
    })

    expect(onPeriodChange).toHaveBeenCalledWith('month')
  })
})
