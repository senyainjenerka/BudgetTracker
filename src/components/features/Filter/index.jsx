import Button from '../../ui/Button'
import Card from '../../ui/Card'
import styles from '../../../styles/components/features/Filter.module.css'

function Filter({ filters, categories, onChange, onReset, resultCount, selectedMonthLabel }) {
  return (
    <Card title="Filter" description="Filter by date, category and type">
      <div className={styles.summary}>
        <span>{selectedMonthLabel}</span>
        <span>{resultCount} items found</span>
      </div>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Search</span>
          <input
            type="text"
            value={filters.search}
            onChange={(event) => onChange('search', event.target.value)}
            placeholder="Transaction title"
          />
        </label>

        <label className={styles.field}>
          <span>Category</span>
          <select
            value={filters.category}
            onChange={(event) => onChange('category', event.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Type</span>
          <select value={filters.type} onChange={(event) => onChange('type', event.target.value)}>
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Start date</span>
          <input
            type="date"
            value={filters.startDate}
            onChange={(event) => onChange('startDate', event.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span>End date</span>
          <input
            type="date"
            value={filters.endDate}
            onChange={(event) => onChange('endDate', event.target.value)}
          />
        </label>
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </Card>
  )
}

export default Filter
