import clsx from 'clsx'
import React from 'react'

import * as styles from './index.module.css'

export default function CheckBox({
  name,
  checked,
  onToggle,
  className,
}: {
  name: any
  checked: boolean
  onToggle: (c: boolean) => void
  className?: string
}) {
  return (
    <span
      onClick={() => onToggle(!checked)}
      className={clsx(
        'relative w-4 h-4 inline-block bg-gray-100 rounded cursor-pointer',
        {
          [styles.checked]: checked,
        },
        className
      )}
    ></span>
  )
}
