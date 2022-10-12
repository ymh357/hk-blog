import clsx from 'clsx'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'
import * as styles from './index.module.css'
export default function Switch({
  on,
  onToggle,
  className = '',
  btnBg,
}: {
  on: boolean
  onToggle: (s: boolean) => void
  className?: string
  btnBg?: IGatsbyImageData
}) {
  return (
    <div
      className={clsx(
        'w-16 h-16 relative text-[0] bg-white ml-8 cursor-pointer',
        styles.switchUi,
        {
          [styles.on]: on,
          [styles.off]: !on,
        },
        className
      )}
      onClick={() => {
        onToggle(!on)
      }}
    >
      <span className="rounded-half w-full h-full inline-block absolute overflow-hidden">
        {btnBg && <GatsbyImage image={btnBg} alt={'avatar'} />}
      </span>
    </div>
  )
}
