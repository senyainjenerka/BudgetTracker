import { formatCurrency, formatDate } from '../../utils/formatters'
import styles from './TransactionItem.module.css'

function TransactionItem({ transaction, categoryTitle, selected, onToggle }) {
  return (
    <article className={styles.item}>
      <label className={styles.checkbox}>
        <input
          aria-label={`Select ${transaction.title}`}
          checked={selected}
          onChange={() => onToggle(transaction.id)}
          type="checkbox"
        />
      </label>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <div>
            <h4 className={styles.title}>{transaction.title}</h4>
            <p className={styles.note}>{transaction.note}</p>
          </div>
          <span className={`${styles.badge} ${styles[transaction.type]}`}>{transaction.type}</span>
        </div>

        <div className={styles.meta}>
          <span>{formatDate(transaction.date)}</span>
          <span>{categoryTitle}</span>
          <span
            className={`${styles.amount} ${
              transaction.type === 'income' ? styles.incomeAmount : styles.spentAmount
            }`}
          >
            {transaction.type === 'income' ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </span>
        </div>
      </div>
    </article>
  )
}

export default TransactionItem
