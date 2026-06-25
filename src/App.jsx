import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { Capabilities } from './sections/Capabilities'
import { ClosingCta } from './sections/ClosingCta'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Capabilities />
        <ClosingCta />
      </main>
    </>
  )
}
