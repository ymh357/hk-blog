import clsx from 'clsx'
import React from 'react'
import { container } from './index.module.css'

export default function ArticleAbstract({
  className = '',
  title,
  content,
  onClick,
}: {
  className?: string
  title: string
  content: string
  onClick?: () => void
}) {
  return (
    <div
      className={clsx(
        'rounded p-5 mr-5 mb-5',
        {
          'hover:cursor-pointer': !!onClick,
          'rounded-sm	border border-gray-200 border-solid': true,
        },
        container,
        className
      )}
      onClick={onClick}
    >
      <div className="font-medium mb-4 text-t2 text-center">{title}</div>
      <div className="line-clamp-10 text-gray-500 text-t4l">{content}</div>
    </div>
  )
}
