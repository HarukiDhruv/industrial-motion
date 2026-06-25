import styles from './Pill.module.css'

export function Pill({ children, tone = 'neutral' }) {
  return (
    <span className={styles.pill} data-tone={tone}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </span>
  )
}
