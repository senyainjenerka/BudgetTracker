import styles from './Card.module.css'

function Card({ title, description, children, className = '' }) {
  const cardClassName = [styles.card, className].filter(Boolean).join(' ')

  return (
    <article className={cardClassName}>
      {(title || description) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </article>
  )
}

export default Card
