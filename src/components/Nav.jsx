import { useSyncExternalStore } from 'react'
import { subscribeHeroProgress, getHeroProgress } from '../state/heroProgress'
import { Button } from './Button'
import styles from './Nav.module.css'

const links = ['Platform', 'Engineering', 'Scale', 'Company']

// Fades out as the hero crane sequence becomes the focus, then returns once
// the container has landed and normal scrolling resumes.
function navOpacity(progress) {
  if (progress < 0.3) return 1 - progress / 0.3
  if (progress < 0.85) return 0
  return (progress - 0.85) / 0.15
}

export function Nav() {
  const progress = useSyncExternalStore(subscribeHeroProgress, getHeroProgress)
  const opacity = navOpacity(progress)
  // Once the crane sequence has fully played out, the nav is sitting over
  // ordinary page content instead of the cinematic video, so it picks up a
  // frosted surface to stay legible against whatever scrolls underneath it.
  const hasSurface = progress >= 0.999

  return (
    <header
      className={styles.nav}
      data-surface={hasSurface}
      style={{ opacity, pointerEvents: opacity < 0.05 ? 'none' : 'auto' }}
    >
      <a href="#top" className={styles.mark}>
        VECTRA
      </a>
      <nav className={styles.links} aria-label="Primary">
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`}>
            {link}
          </a>
        ))}
      </nav>
      <Button variant="secondary">Contact Sales</Button>
    </header>
  )
}
