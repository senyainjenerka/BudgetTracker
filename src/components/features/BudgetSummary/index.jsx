import Card from '../../ui/Card'
import { formatCurrency } from '../../../utils/formatters'
import styles from '../../../styles/components/features/BudgetSummary.module.css'

function BudgetSummary({ items }) {
  return (
    <section className={styles.grid}>
      {items.map((item) => (
        <Card key={item.id} className={styles.summaryCard}>
          <div className={styles.row}>
            <div>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.description}>{item.description}</p>
            </div>
            <div className={styles.ring} style={{ borderColor: item.accent }}>
              <span className={styles.amount}>{formatCurrency(item.amount)}</span>
            </div>
          </div>
        </Card>
      ))}
    </section>
  )
}

export default BudgetSummary
