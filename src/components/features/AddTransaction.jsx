import { useMemo, useState } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import styles from './AddTransaction.module.css'

const initialForm = {
  title: '',
  amount: '',
  category: 'food',
  type: 'expense',
  date: '2026-04-21',
  note: '',
}

function AddTransaction({ categories, onAddTransaction, lastAddedTransaction }) {
  const [formData, setFormData] = useState(initialForm)
  const availableCategories = useMemo(
    () => categories.filter((category) => category.type === formData.type),
    [categories, formData.type],
  )

  const handleChange = (field, value) => {
    setFormData((current) => {
      if (field === 'type') {
        const nextCategories = categories.filter((category) => category.type === value)

        return {
          ...current,
          type: value,
          category: nextCategories[0]?.id ?? '',
        }
      }

      return { ...current, [field]: value }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.title.trim() || !formData.amount) {
      return
    }

    onAddTransaction({
      ...formData,
      amount: Number(formData.amount),
    })

    setFormData(initialForm)
  }

  return (
    <Card title="Add Transaction" description="Controlled form component with event handlers">
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>Title</span>
          <input
            type="text"
            value={formData.title}
            onChange={(event) => handleChange('title', event.target.value)}
            placeholder="For example, Grocery store"
          />
        </label>

        <div className={styles.row}>
          <label className={styles.field}>
            <span>Amount</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={(event) => handleChange('amount', event.target.value)}
              placeholder="0.00"
            />
          </label>

          <label className={styles.field}>
            <span>Type</span>
            <select
              value={formData.type}
              onChange={(event) => handleChange('type', event.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
        </div>

        <div className={styles.row}>
          <label className={styles.field}>
            <span>Category</span>
            <select
              value={formData.category}
              onChange={(event) => handleChange('category', event.target.value)}
            >
              {availableCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span>Date</span>
            <input
              type="date"
              min="2025-04-01"
              max="2026-04-21"
              value={formData.date}
              onChange={(event) => handleChange('date', event.target.value)}
            />
          </label>
        </div>

        <label className={styles.field}>
          <span>Note</span>
          <textarea
            rows="3"
            value={formData.note}
            onChange={(event) => handleChange('note', event.target.value)}
            placeholder="Short description"
          />
        </label>

        <Button type="submit" fullWidth>
          Add transaction
        </Button>

        {lastAddedTransaction && (
          <p className={styles.feedback}>
            Last added: <strong>{lastAddedTransaction.title}</strong> on{' '}
            {lastAddedTransaction.date}
          </p>
        )}
      </form>
    </Card>
  )
}

export default AddTransaction
