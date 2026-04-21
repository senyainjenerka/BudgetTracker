import Card from '../ui/Card'
import { formatCurrency } from '../../utils/formatters'
import styles from './CreditCards.module.css'

function CreditCards({ cards }) {
  return (
    <Card title="My Credit Cards" description="Prototype-inspired card carousel in React">
      <div className={styles.list}>
        {cards.map((card) => (
          <article
            key={card.id}
            className={styles.creditCard}
            style={{ background: card.gradient }}
          >
            <p className={styles.bank}>{card.bank}</p>
            <p className={styles.amount}>{formatCurrency(card.amount)}</p>
            <div className={styles.meta}>
              <span>{card.owner}</span>
              <span>{card.number}</span>
            </div>
            <div className={styles.footer}>
              <span>Valid thru</span>
              <span>{card.expires}</span>
            </div>
          </article>
        ))}
      </div>
    </Card>
  )
}

export default CreditCards
