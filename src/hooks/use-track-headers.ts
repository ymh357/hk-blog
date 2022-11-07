import { useCallback, useEffect, useRef, useState } from 'react'

export default function useTrackHeaders() {
  const ref = useRef<HTMLDivElement>(null)
  const headingDoms = useRef<HTMLHeadingElement[]>([])
  const [current, _setCurrent] = useState(-1)
  const setCurrent = useCallback((cur: number) => {
    _setCurrent(cur)
    const originalY = headingDoms.current[cur]?.getBoundingClientRect().top + window.scrollY + 1
    window.scrollTo(0, originalY)
  }, [])
  useEffect(() => {
    const handler = () => {
      if (!ref.current) {
        return
      }
      headingDoms.current = Array.from(ref.current.querySelectorAll('h1,h2,h3,h4,h5,h6'))
      for (const [index, headingDom] of [...headingDoms.current].reverse().entries()) {
        if ((headingDom as HTMLHeadingElement).getBoundingClientRect().top <= 0) {
          _setCurrent(headingDoms.current.length - index - 1)
          return
        }
      }
      _setCurrent(-1)
    }
    window.addEventListener('scroll', handler)

    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [])

  return {
    current,
    ref,
    setCurrent,
  }
}
