import styles from './GlassCard.module.css'

export function GlassCard({ label, value, description }) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
