import { useEffect, useRef, useState } from 'react'

/**
 * One-shot "has this scrolled into view" flag, backed by IntersectionObserver
 * rather than a scroll listener — the browser does the position tracking, we
 * just get a callback when it crosses the threshold once and then disconnect.
 */
export function useRevealOnScroll({ threshold = 0.15 } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}
