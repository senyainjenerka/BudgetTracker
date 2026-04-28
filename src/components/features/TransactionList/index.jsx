import Card from '../../ui/Card'
import Button from '../../ui/Button'
import TransactionItem from '../TransactionItem'
import styles from '../../../styles/components/features/TransactionList.module.css'

function TransactionList({
  transactions,
  categoriesMap,
  selectedIds,
  onToggleTransaction,
  onSelectAll,
  onDeleteSelected,
}) {
  const allSelected =
    transactions.length > 0 &&
    transactions.every((transaction) => selectedIds.includes(transaction.id))

  return (
    <Card title="Transaction History" description="Filtered list rendered from mock data">
      <div className={styles.toolbar}>
        <label className={styles.masterCheckbox}>
          <input type="checkbox" checked={allSelected} onChange={onSelectAll} />
          <span>Select all</span>
        </label>
        <div className={styles.toolbarRight}>
          <p className={styles.counter}>
            Selected: {transactions.filter((transaction) => selectedIds.includes(transaction.id)).length}
          </p>
          {selectedIds.length > 0 && (
            <Button variant="small" onClick={onDeleteSelected}>
              Delete Selected
            </Button>
          )}
        </div>
      </div>

      <div>
        {transactions.length === 0 ? (
          <p className={styles.empty}>No transactions match current filters.</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              categoryTitle={categoriesMap[transaction.category] ?? transaction.category}
              selected={selectedIds.includes(transaction.id)}
              onToggle={onToggleTransaction}
            />
          ))
        )}
      </div>
    </Card>
  )
}

export default TransactionList
