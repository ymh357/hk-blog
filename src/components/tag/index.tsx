import clsx from 'clsx'
import React from 'react'

import * as styles from './index.module.css'

export default function Tag({
  value,
  onToggleChoose,
  chosen,
}: {
  value: string
  onToggleChoose: (t: string) => void
  chosen: boolean
}) {
  if (!value) {
    return null
  }
  return (
    <div
      onClick={() => {
        onToggleChoose(value)
      }}
      className={clsx('rounded-md p-2 bg-gray-200 text-gray-700 mr-4 mb-8 hover:cursor-pointer', styles.tag, {
        [styles.chosen]: chosen,
      })}
    >
      #{value}
    </div>
  )
}
