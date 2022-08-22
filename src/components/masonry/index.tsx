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
      return acc + cur.offsetHeight + +window.getComputedStyle(cur).marginBottom.slice(0, 2)
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
  const containerRef = useRef<HTMLDivElement | null>(null)
  const containerWidthRef = useRef(-1)
  const observerRef = useRef<ResizeObserver>()
  const childrenChanged = useRef(false)

  useEffect(() => {
    if (containerRef.current) {
      ;[].forEach.call(containerRef.current.children, (child: HTMLElement, index) => {
        child.setAttribute('data-index', '' + index)
        child.style.position = 'absolute'
        child.style.transition = 'left ease 300ms, top ease 300ms'
        if (child.style.left) {
          return
        }
        child.style.left = '0'
        child.style.top = '0'
      })
    }
    if (children) {
      childrenChanged.current = true
    }
  }, [children])

  const setupBlocks = useCallback((width: number) => {
    const container = containerRef.current
    if (!container || !container.children.length) {
      console.log('container: ', container)
      console.log('container.children.length: ', container?.children?.length)
      return
    }
    const marginRight = +(
      window.getComputedStyle(container.firstElementChild as HTMLElement)?.marginRight?.match(/\d+/)?.[0] || 0
    )
    console.log('marginRight: ', marginRight)

    const offsetWidth = (container.firstElementChild as HTMLElement).offsetWidth
    console.log('offsetWidth xx: ', offsetWidth)

    // 二元一次方程
    const colAmount = Math.floor(
      (width + marginRight) / ((container.firstElementChild as HTMLElement).offsetWidth + marginRight)
    )
    const innerWidth = offsetWidth * colAmount + marginRight * (colAmount - 1)
    console.log('innerWidth: ', innerWidth)
    const space = (width - innerWidth) / 2
    console.log('space: ', space)
    console.log(
      '(container.firstElementChild as HTMLElement).offsetWidth: ',
      (container.firstElementChild as HTMLElement).offsetWidth
    )
    // debugger
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
    result.forEach((col, colIndex) => {
      let heightNow = 0
      col.forEach((item) => {
        item.style.left = `${space + colIndex * (offsetWidth + marginRight)}px`
        item.style.top = `${heightNow}px`
        heightNow += item.offsetHeight + +(window.getComputedStyle(item)?.marginBottom?.match(/\d+/)?.[0] || 0)
        // if (colIndex === result.length - 1) {
        //   item.style.marginRight = '0'
        // }
      })
    })

    if (containerRef.current) {
      containerRef.current.style.height = `${Math.max(...getHeights(result))}px`
    }
  }, [])

  const resizeCallback: ResizeObserverCallback = useCallback(
    (entries, observer) => {
      console.log('entries: ', entries)
      let containerWidth
      for (const entry of entries) {
        containerWidth = entry.contentRect.width
      }
      if (!containerWidth) {
        console.log('containerWidth: ', containerWidth)
        return
      }
      if (!childrenChanged.current && containerWidthRef.current === containerWidth) {
        console.log('containerWidthRef.current === containerWidth: ', containerWidthRef.current === containerWidth)
        // To solve ResizeObserver's strange behaviour.
        // Solution: Only when callback finishes, next callback starts.
        return
      }
      console.log('cb happens')
      if (childrenChanged.current) {
        childrenChanged.current = false
      }
      containerWidthRef.current = containerWidth
      setupBlocks(containerWidth)
    },
    [setupBlocks]
  )

  useEffect(() => {
    if (!containerRef.current) {
      console.log('no real ref to observe')
      return
    }
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver(debounce(resizeCallback, 10))
    }
    observerRef.current.observe(containerRef.current)
    console.log('observe...')

    return () => {
      if (observerRef.current) {
        console.log('disconnect...')
        observerRef.current.disconnect()
      }
    }
  }, [resizeCallback, children])

  return (
    <div className={clsx('relative box-border', className)} ref={containerRef}>
      {children}
    </div>
  )
}

// TODO:
// 1. chain call.
// 2. gap. done
// 3. dom operation. loop count.
// 4. animation. done
