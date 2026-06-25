import { Pill } from '../components/Pill'
import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import styles from './Capabilities.module.css'

const stats = [
  {
    label: 'Daily Throughput',
    value: '12,400+',
    description: 'Containers routed across the network without a single missed handoff.',
  },
  {
    label: 'Precision',
    value: '99.98%',
    description: 'On-time arrival across every regional corridor, audited in real time.',
  },
  {
    label: 'Footprint',
    value: '140 Countries',
    description: 'Engineered infrastructure operating at sovereign-grade reliability.',
  },
]

export function Capabilities() {
  return (
    <section className={styles.section} id="engineering">
      <Reveal className={styles.intro}>
        <Pill>Engineering</Pill>
        <h2 className={styles.headline}>
          BUILT FOR THE
          <br />
          WEIGHT OF SCALE
        </h2>
        <p className={styles.body}>
          Every system underneath the surface — routing, tracking, physical
          handling — is engineered to carry enterprise volume without ever
          feeling heavy to the people who depend on it.
        </p>
      </Reveal>

      <div className={styles.cards}>
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 120}>
            <GlassCard {...stat} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
