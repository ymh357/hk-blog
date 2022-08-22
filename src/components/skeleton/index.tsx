import clsx from 'clsx'
import React from 'react'
import * as styles from './index.module.css'
export default function Skeleton({ className, count }: { className: string; count: number }) {
  return (
    <div className="flex items-center flex-wrap justify-evenly">
      {new Array(count).fill(undefined).map((_, index) => (
        <div key={index} className={clsx(styles.cell, className)} />
      ))}
    </div>
  )
}
