import useGetAvatars from '@/hooks/use-get-avatars'
import clsx from 'clsx'
import { GatsbyImage } from 'gatsby-plugin-image'
import moment from 'moment'
import React from 'react'
import * as styles from './index.module.css'

export default function ArticleAbstract({
  className = '',
  title,
  author,
  date,
  content,
  onClick,
}: {
  className?: string
  title: string
  author?: string | null
  date?: string | null
  content: string
  onClick?: () => void
}) {
  const avatars = useGetAvatars()

  if (!content) {
    return null
  }

  const avatar = avatars?.find(({ name }) => name === author)

  return (
    <div
      className={clsx(
        'rounded relative',
        {
          'hover:cursor-pointer': !!onClick,
          'rounded-sm	border border-gray-200 border-solid': true,
        },
        styles.container,
        className
      )}
      onClick={onClick}
    >
      {date && (
        <span className={clsx('absolute right-0 top-0 p-1.5 bg-gray-500 text-gray-300 text-t7', styles.date)}>
          {moment(date).format('YYYY.MM.DD')}
        </span>
      )}
      {avatar?.imageData && (
        <GatsbyImage
          className={clsx('absolute left-0 top-0 w-8 h-8 rounded-half', styles.avatar)}
          image={avatar.imageData}
          alt={`${avatar.name}`}
        />
      )}
      <div className="font-medium mb-4 text-t2 text-center">{title}</div>
      <div className="line-clamp-10 text-gray-500 text-t4l">{content}</div>
    </div>
  )
}
