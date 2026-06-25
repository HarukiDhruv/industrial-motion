/**
 * Drives `video.currentTime` from a 0-1 scroll-progress value.
 *
 * This is called from GSAP ScrollTrigger's onUpdate, which already fires at
 * most once per animation frame via GSAP's own shared ticker — wrapping the
 * write in a second requestAnimationFrame would just defer it to the *next*
 * frame for no benefit, adding a constant frame of latency between scroll
 * input and the video moving (that's what reads as "the video is lagging
 * behind the scroll" on fast flicks). So this writes synchronously.
 *
 * The only optimization that's worth it: skip seeks that wouldn't move the
 * rendered frame. Most video is encoded at 24-30fps, so seeking to a time
 * less than ~1/30s away from the last seek re-decodes a frame the user can't
 * distinguish from the current one — wasted decoder work, which is where
 * stutter comes from on long-GOP video.
 */
export function createVideoScrubController(video, { frameEpsilon = 1 / 30 } = {}) {
  const duration = video.duration
  let lastSeekTime = -Infinity

  return {
    setProgress(progress) {
      if (!Number.isFinite(duration) || duration <= 0) return
      const targetTime = progress * duration
      if (Math.abs(targetTime - lastSeekTime) < frameEpsilon) return
      video.currentTime = targetTime
      lastSeekTime = targetTime
    },
    destroy() {},
  }
}
