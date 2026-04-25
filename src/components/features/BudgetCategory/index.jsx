import { formatCurrency } from '../../../utils/formatters'
import styles from '../../../styles/components/features/BudgetCategory.module.css'

function BudgetCategory({ category }) {
  return (
    <article className={styles.item}>
      <div className={styles.header}>
        <h3 className={styles.title}>{category.title}</h3>
        <span className={styles.transactions}>{category.transactionsCount} transactions</span>
      </div>

      <div className={styles.progressTrack}>
        <span
          className={styles.progressBar}
          style={{
            width: `${category.progress}%`,
            backgroundColor: category.color,
          }}
        ></span>
      </div>

      <div className={styles.footer}>
        <span>{formatCurrency(category.spent)} spent</span>
        <span>{formatCurrency(category.limit)} budget</span>
      </div>
    </article>
  )
}

export default BudgetCategory
