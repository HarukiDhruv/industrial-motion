import gsap from 'gsap'

/**
 * Fades the hero copy/indicator/flash as scroll progress advances.
 *
 * Uses gsap.quickSetter instead of gsap.to(): quickSetter pre-parses the unit
 * and returns a plain function that writes the value directly, with no Tween
 * object, no timeline insertion, and no allocation per call. .to() is built
 * for one-off animations — calling it on every scroll tick (dozens of times
 * per second) recreates that machinery for no reason since we already have
 * the exact target value from scroll progress.
 */
export function createHeroUiFader({ copyEl, indicatorEl, flashEl }) {
  const setCopyOpacity = gsap.quickSetter(copyEl, 'opacity')
  const setCopyY = gsap.quickSetter(copyEl, 'y', 'px')
  const setIndicatorOpacity = gsap.quickSetter(indicatorEl, 'opacity')
  const setFlashOpacity = gsap.quickSetter(flashEl, 'opacity')

  return function update(progress) {
    setCopyOpacity(Math.max(0, 1 - progress / 0.3))
    setCopyY(-progress * 60)
    setIndicatorOpacity(Math.max(0, 1 - progress / 0.05))

    const flash = progress > 0.88 && progress < 0.97
      ? 1 - Math.abs(progress - 0.925) / 0.045
      : 0
    setFlashOpacity(flash * 0.5)
  }
}
