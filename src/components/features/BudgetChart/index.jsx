import Card from '../../ui/Card'
import { formatCurrency } from '../../../utils/formatters'
import styles from '../../../styles/components/features/BudgetChart.module.css'

function BudgetChart({ data, period, onPeriodChange, incomeTotal, spentTotal }) {
  const maxValue = Math.max(...data.map((item) => item.income + item.spent), 1)

  return (
    <Card title="Activity" description="Income and expenses overview">
      <div className={styles.toolbar}>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.income}`}></span>
            Income
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.spent}`}></span>
            Spent
          </span>
        </div>

        <select
          aria-label="Chart period"
          value={period}
          onChange={(event) => onPeriodChange(event.target.value)}
        >
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
        </select>
      </div>

      {data.length === 0 ? (
        <p className={styles.empty}>No chart data for the selected date and category filters.</p>
      ) : (
        <div className={styles.chart}>
          {data.map((item) => {
            const totalHeight = ((item.income + item.spent) / maxValue) * 100
            const incomeHeight =
              item.income === 0 ? 0 : (item.income / (item.income + item.spent || 1)) * 100
            const spentHeight =
              item.spent === 0 ? 0 : (item.spent / (item.income + item.spent || 1)) * 100

            return (
              <div key={item.label} className={styles.columnWrap}>
                <div className={styles.columnTrack}>
                  <div className={styles.column} style={{ height: `${Math.max(totalHeight, 8)}%` }}>
                    <span className={styles.spentBar} style={{ height: `${spentHeight}%` }}></span>
                    <span className={styles.incomeBar} style={{ height: `${incomeHeight}%` }}></span>
                  </div>
                </div>
                <span className={styles.label}>{item.label}</span>
              </div>
            )
          })}
        </div>
      )}

      <div className={styles.totals}>
        <div>
          <p className={styles.totalLabel}>Income total</p>
          <p className={styles.totalIncome}>{formatCurrency(incomeTotal)}</p>
        </div>
        <div>
          <p className={styles.totalLabel}>Spent total</p>
          <p className={styles.totalSpent}>{formatCurrency(spentTotal)}</p>
        </div>
      </div>
    </Card>
  )
}

export default BudgetChart
