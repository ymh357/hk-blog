import clsx from 'clsx'
import React from 'react'
import * as styles from './index.module.css'
export default function SideNav({
  headings,
  current,
  setCurrent,
}: {
  headings: {
    value: string
    depth: number
  }[]
  current: number
  setCurrent: (cur: number) => void
}) {
  if (headings.length < 2) {
    return null
  }

  const leastDepth = headings.sort((a, b) => a.depth - b.depth)[0].depth

  return (
    <div className="fixed top-1/2 left-3/4 h-40">
      <ul className={clsx('h-full m-0 overflow-auto pl-6', styles.list)}>
        {headings.map(({ value, depth }, i) => {
          return (
            <li
              key={value}
              className={clsx('pr-8 list-none cursor-pointer top-0 left-0 bg-white', {
                'font-bold': current === i,
                [styles.item]: current === i,
                relative: depth !== leastDepth,
                sticky: depth === leastDepth,
                'z-[1]': depth === leastDepth,
              })}
              style={{
                paddingLeft: 12 * depth + 'px',
              }}
              onClick={() => {
                setCurrent(i)
                console.log('i: ', i)
              }}
            >
              {value}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
