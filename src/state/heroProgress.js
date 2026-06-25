// 1% steps are visually indistinguishable for an opacity fade but cut the
// number of Nav re-renders by roughly 100x over a full scroll pass.
const NOTIFY_QUANTUM = 0.01

let progress = 0
let notifiedProgress = 0
const listeners = new Set()

export function setHeroProgress(value) {
  progress = value
  const isBoundary = value === 0 || value === 1
  if (!isBoundary && Math.abs(value - notifiedProgress) < NOTIFY_QUANTUM) return
  notifiedProgress = value
  listeners.forEach((listener) => listener(value))
}

export function getHeroProgress() {
  return progress
}

export function subscribeHeroProgress(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
