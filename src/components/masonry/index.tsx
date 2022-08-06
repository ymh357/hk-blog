import clsx from 'clsx'
import { debounce } from 'lodash'
import React, { ReactNode, useCallback, useEffect, useRef } from 'react'
export interface IMasonry {
  children: ReactNode
  className?: string
}

const getHeights = (arr: HTMLElement[][]) => {
  return arr.map((subArr) =>
    subArr.reduce((acc, cur) => {
      return acc + cur.offsetHeight
    }, 0)
  )
}

const getMinimumIndex = (arr: number[]) => {
  let min = Infinity
  let minIndex = 0 // Default result for empty array.
  for (const [index, value] of arr.entries()) {
    if (value < min) {
      min = value
      minIndex = index
    }
  }
  return minIndex
}

export default function Masonry({ className, children }: IMasonry) {
  const fakeContainerRef = useRef<HTMLDivElement | null>(null)
  const realContainerRef = useRef<HTMLDivElement | null>(null)
  const containerWidthRef = useRef(-1)
  const observerRef = useRef<ResizeObserver>()

  const setupBlocks = useCallback((width: number) => {
    const container = fakeContainerRef.current?.children?.length ? fakeContainerRef.current : realContainerRef.current
    if (!container || !container.children.length) {
      console.log('container: ', container)
      console.log('container.children.length: ', container?.children?.length)
      return
    }

    const colAmount = Math.floor(width / (container.firstElementChild as HTMLElement).offsetWidth)
    console.log('width: ', width)
    console.log(
      '(container.firstElementChild as HTMLElement).offsetWidth: ',
      (container.firstElementChild as HTMLElement).offsetWidth
    )
    const result: HTMLElement[][] = []
    for (let i = 0; i < colAmount; i++) {
      result.push([])
    }
    if (!result.length) {
      console.log('result.length: ', result.length)
      return
    }
    ;[].forEach.call(container.children, (child: HTMLElement) => {
      console.log('min index: ', getMinimumIndex(getHeights(result)))
      result[getMinimumIndex(getHeights(result))].push(child)
    })
    console.log('result: ', result)
    const ordered: HTMLElement[] = []
    result.forEach((col, colIndex) => {
      let heightNow = 0
      col.forEach((item, rowIndex) => {
        item.style.transition = 'left ease 300ms, top ease 300ms'
        item.style.position = 'absolute'
        item.style.display = 'inline-block'
        item.style.left = `${
          colIndex * (item.offsetWidth + +(window.getComputedStyle(item)?.marginRight?.match(/\d+/)?.[0] || 0))
        }px`
        item.style.top = `${heightNow}px`
        heightNow += item.offsetHeight + +(window.getComputedStyle(item)?.marginBottom?.match(/\d+/)?.[0] || 0)

        if (!realContainerRef.current) {
          console.log('no real ref')
          return
        }
        ordered[rowIndex * result.length + colIndex] = item
        console.log('rowIndex * result.length + colIndex: ', rowIndex * result.length + colIndex)
      })
    })
    console.log('ordered: ', ordered)

    ordered.forEach((item) => {
      // TODO: why realContainerRef.current.contains(item) necessary?
      if (realContainerRef.current && !realContainerRef.current.contains(item)) {
        realContainerRef.current.append(item)
      }
    })
    if (realContainerRef.current) {
      realContainerRef.current.style.height = `${Math.max(...getHeights(result))}px`
    }
  }, [])

  const resizeCallback: ResizeObserverCallback = (entries, observer) => {
    console.log('entries: ', entries)
    let containerWidth
    for (const entry of entries) {
      containerWidth = entry.contentRect.width
    }
    if (!containerWidth) {
      console.log('containerWidth: ', containerWidth)
      return
    }
    console.log('setup')
    if (containerWidthRef.current === containerWidth) {
      console.log('containerWidthRef.current === containerWidth: ', containerWidthRef.current === containerWidth)
      // ResizeObserver's strange behaviour. Only when callback finishes, next callback starts.
      return
    }
    containerWidthRef.current = containerWidth
    setupBlocks(containerWidth)
  }

  useEffect(() => {
    if (!realContainerRef.current) {
      console.log('no real ref to observe')
      return
    }
    console.log('observe...')
    observerRef.current = new ResizeObserver(debounce(resizeCallback, 10))
    observerRef.current.observe(realContainerRef.current)

    return () => {
      if (observerRef.current) {
        console.log('disconnect...')
        observerRef.current.disconnect()
      }
    }
  }, [setupBlocks])

  return (
    <>
      <div className={clsx('relative w-full', className)} ref={realContainerRef} />

      <div className={clsx('absolute opacity-0 w-full', className)} ref={fakeContainerRef}>
        {children}
      </div>
    </>
  )
}

// TODO:
// 1. chain call.
// 2. gap. done
// 3. dom operation. loop count.
// 4. animation. done
