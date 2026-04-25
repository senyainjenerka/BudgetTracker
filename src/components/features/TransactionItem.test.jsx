import { fireEvent, render, screen } from '@testing-library/react'
import TransactionItem from './TransactionItem'

describe('TransactionItem', () => {
  test('renders expense details and toggles selection', () => {
    const onToggle = jest.fn()

    render(
      <TransactionItem
        transaction={{
          id: 18,
          title: 'Supermarket',
          note: 'Weekly groceries',
          type: 'expense',
          amount: 146.35,
          date: '2026-04-06',
        }}
        categoryTitle="Food"
        selected={false}
        onToggle={onToggle}
      />,
    )

    expect(screen.getByText('Supermarket')).toBeInTheDocument()
    expect(screen.getByText('Weekly groceries')).toBeInTheDocument()
    expect(screen.getByText('06/04/2026')).toBeInTheDocument()
    expect(screen.getByText('-$146.35')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('checkbox', { name: /select supermarket/i }))

    expect(onToggle).toHaveBeenCalledWith(18)
  })

  test('renders income transactions with a plus sign and checked state', () => {
    render(
      <TransactionItem
        transaction={{
          id: 23,
          title: 'Freelance landing page',
          note: 'Client payment',
          type: 'income',
          amount: 640,
          date: '2026-04-14',
        }}
        categoryTitle="Freelance"
        selected
        onToggle={jest.fn()}
      />,
    )

    expect(screen.getByText('+$640.00')).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: /select freelance landing page/i }),
    ).toBeChecked()
  })
})
