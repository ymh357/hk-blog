import React, { ReactNode, useEffect, useRef } from 'react'

export default function InfiniteScroll({
  children,
  loadMore,
  complete,
}: {
  children: ReactNode | ReactNode[]
  loadMore: () => void
  complete: boolean
}) {
  const boundary = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!boundary.current) {
      return
    }

    if (complete) {
      return
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        // boundary's bottom is heigher than window's bottom
        if (entry.boundingClientRect.bottom <= (document.documentElement || document.body).clientHeight) {
          return loadMore()
        }
      }
    }
    const observer = new IntersectionObserver(callback, {
      root: null,
      threshold: [0.01],
    })
    observer.observe(boundary.current)

    return () => {
      observer.disconnect()
    }
  }, [complete, loadMore])

  return (
    <>
      {children}
      <div ref={boundary} className="h-0" />
    </>
  )
}

// TODO:
// 1. lock
// 2. loading status
