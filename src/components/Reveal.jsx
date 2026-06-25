import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import styles from './Reveal.module.css'

export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${className}`}
      data-visible={isVisible}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
