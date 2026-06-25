import { useCallback, useEffect, useRef } from 'react'
import { useScrollScrubVideo } from '../hooks/useScrollScrubVideo'
import { createHeroUiFader } from '../lib/scrollVideo/createHeroUiFader'
import { setHeroProgress } from '../state/heroProgress'
import { Button } from '../components/Button'
import styles from './Hero.module.css'

export function Hero() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const copyRef = useRef(null)
  const indicatorRef = useRef(null)
  const flashRef = useRef(null)
  const faderRef = useRef(null)

  useEffect(() => {
    faderRef.current = createHeroUiFader({
      copyEl: copyRef.current,
      indicatorEl: indicatorRef.current,
      flashEl: flashRef.current,
    })
  }, [])

  const handleProgress = useCallback((progress) => {
    setHeroProgress(progress)
    faderRef.current?.(progress)
  }, [])

  useScrollScrubVideo({
    containerRef,
    videoRef,
    pinDistance: '260%',
    onProgress: handleProgress,
  })

  return (
    <section ref={containerRef} className={styles.hero} id="top">
      <video
        ref={videoRef}
        className={styles.video}
        src="/video/v-1.mp4"
        muted
        playsInline
        preload="metadata"
      />
      <div className={styles.scrim} />
      <div ref={flashRef} className={styles.flash} aria-hidden="true" />

      <div ref={copyRef} className={styles.copy}>
        <h1 className={styles.headline}>
          <span className={styles.lineDeliver}>Deliver</span>
          <span className={styles.lineWithout}>Without</span>
          <span className={styles.lineLimits}>Limits</span>
        </h1>
        <div className={styles.actions}>
          <Button variant="primary">Request Access</Button>
          <Button variant="secondary">Watch the Film</Button>
        </div>
        <p className={styles.sub}>
          Engineered logistics infrastructure built for the weight of global
          industry — <span className={styles.subEmphasis}>precision at every link,
          confidence at every scale.</span>
        </p>
      </div>

      <div ref={indicatorRef} className={styles.indicator}>
        <span className={styles.mouse}>
          <span className={styles.wheel} />
        </span>
        <span className={styles.indicatorLabel}>Scroll to control</span>
      </div>
    </section>
  )
}
