import styles from './Topbar.module.css'

function Topbar({ monthOptions, selectedMonth, onMonthChange, transactionCount }) {
  return (
    <section className={styles.topbar}>
      <div>
        <p className={styles.label}>Dashboard</p>
        <p className={styles.value}>{transactionCount} transactions in view</p>
      </div>

      <label className={styles.filter}>
        <span className={styles.label}>Period</span>
        <select value={selectedMonth} onChange={(event) => onMonthChange(event.target.value)}>
          {monthOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </section>
  )
}

export default Topbar
