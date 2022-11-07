import clsx from 'clsx'
import React, { ReactElement, useState } from 'react'

import * as styles from './index.module.css'

export default function Drawer({
  titleDom,
  children,
  direction = 'verticle',
}: {
  titleDom: ReactElement
  children: ReactElement | ReactElement[]
  direction?: 'horizontal' | 'verticle'
}) {
  const [showChildren, setShowChildren] = useState(false)
  return (
    <div>
      <div className="flex items-center">
        <span
          className="mr-2 w-4 h-4 cursor-pointer"
          onClick={() => {
            setShowChildren(!showChildren)
          }}
        >
          {showChildren ? (
            <svg viewBox="0 0 1024 1024" width="auto">
              <path
                d="M853.333333 544H170.666667c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h682.666666c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z"
                p-id="3026"
              ></path>
            </svg>
          ) : (
            <svg viewBox="0 0 1024 1024" width="auto">
              <path
                d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
                p-id="2887"
              ></path>
            </svg>
          )}
        </span>
        {titleDom}
      </div>
      {showChildren && <div className={clsx(styles.content)}>{children}</div>}
    </div>
  )
}
