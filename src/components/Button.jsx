import styles from './Button.module.css'

export function Button({ variant = 'primary', children, ...props }) {
  const className = variant === 'secondary' ? styles.secondary : styles.primary
  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}
