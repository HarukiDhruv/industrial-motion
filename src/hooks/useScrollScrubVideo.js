import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createVideoScrubController } from '../lib/scrollVideo/videoScrubController'

gsap.registerPlugin(ScrollTrigger)

// Address-bar show/hide on mobile fires a resize event that would otherwise
// trigger a full ScrollTrigger.refresh() mid-scroll, causing a visible jump.
ScrollTrigger.config({ ignoreMobileResize: true })

const isCoarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

/**
 * Pins `containerRef` for `pinDistance` of extra scroll and maps scroll
 * progress (0-1) onto the video's currentTime via the native decoder - no
 * canvas, no frame extraction. Playback only ever advances through scroll;
 * the video element itself never autoplays.
 *
 * `onProgress` fires from GSAP's own rAF-batched ticker (already throttled
 * to one call per frame) so callers can drive UI updates without setting up
 * their own scroll listeners.
 */
export function useScrollScrubVideo({ containerRef, videoRef, pinDistance = '250%', onProgress }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoaded = () => setIsReady(true)
    if (video.readyState >= 1) {
      setIsReady(true)
    } else {
      video.addEventListener('loadedmetadata', handleLoaded)
    }
    return () => video.removeEventListener('loadedmetadata', handleLoaded)
  }, [videoRef])

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!isReady || !container || !video || !video.duration) return

    // `scrub` is GSAP's own smoothing time constant (seconds for the proxy
    // value to catch up to real scroll position) - it intentionally trades
    // directness for smoothing out jitter. 0.6s on touch was enough lag to be
    // felt as "the video is behind the scroll"; keep it short enough to stay
    // invisible while still smoothing momentum-scroll jitter on touch.
    const scrub = isCoarsePointer() ? 0.3 : 0.15
    const scrubController = createVideoScrubController(video)

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${pinDistance}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        scrubController.setProgress(self.progress)
        onProgress?.(self.progress)
      },
    })

    return () => {
      trigger.kill()
      scrubController.destroy()
    }
  }, [isReady, containerRef, videoRef, pinDistance, onProgress])

  return { isReady }
}
