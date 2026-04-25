import Card from '../ui/Card'
import { formatCurrency } from '../../utils/formatters'
import styles from './ReportGenerator.module.css'

function ReportGenerator({ report, selectedMonthLabel }) {
  return (
    <Card title="Report Generator" description="Auto-generated summary for the current selection">
      <div className={styles.stack}>
        <div className={styles.header}>
          <p className={styles.period}>{selectedMonthLabel}</p>
          <p className={styles.meta}>{report.totalTransactions} transactions analysed</p>
        </div>

        {report.totalTransactions === 0 ? (
          <p className={styles.empty}>No transactions available for report generation.</p>
        ) : (
          <>
            <div className={styles.metrics}>
              <article className={styles.metric}>
                <span className={styles.metricLabel}>Income</span>
                <strong>{formatCurrency(report.totalIncome)}</strong>
              </article>
              <article className={styles.metric}>
                <span className={styles.metricLabel}>Spent</span>
                <strong>{formatCurrency(report.totalSpent)}</strong>
              </article>
              <article className={styles.metric}>
                <span className={styles.metricLabel}>Net change</span>
                <strong>{formatCurrency(report.netChange)}</strong>
              </article>
              <article className={styles.metric}>
                <span className={styles.metricLabel}>Balance</span>
                <strong>{formatCurrency(report.balance)}</strong>
              </article>
            </div>

            <div className={styles.summary}>
              <div>
                <h4 className={styles.title}>Highlights</h4>
                <p>
                  Top income:{' '}
                  <strong>
                    {report.topIncome ? report.topIncome.title : 'No income transactions'}
                  </strong>
                </p>
                <p>
                  Top expense:{' '}
                  <strong>
                    {report.topExpense ? report.topExpense.title : 'No expense transactions'}
                  </strong>
                </p>
              </div>

              <div>
                <h4 className={styles.title}>Expense categories</h4>
                <ul className={styles.list}>
                  {report.spendingByCategory.map((item) => (
                    <li key={item.category} className={styles.listItem}>
                      <span>
                        {item.category} ({item.count})
                      </span>
                      <strong>{formatCurrency(item.total)}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}

export default ReportGenerator
