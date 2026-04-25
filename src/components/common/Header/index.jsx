import styles from '../../../styles/components/common/Header.module.css'

function Header({ title, subtitle }) {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Fintech dashboard</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </header>
  )
}

export default Header
