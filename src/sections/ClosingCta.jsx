import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import styles from './ClosingCta.module.css'

export function ClosingCta() {
  return (
    <section className={styles.section} id="company">
      <Reveal className={styles.inner}>
        <h2 className={styles.headline}>
          ENGINEERED
          <br />
          FOR SCALE
        </h2>
        <p className={styles.body}>
          Talk to our team about moving your industry at enterprise scale.
        </p>
        <Button variant="primary">Request Access</Button>
      </Reveal>
    </section>
  )
}
