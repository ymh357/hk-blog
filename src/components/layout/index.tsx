import { MDXProvider } from '@mdx-js/react'
import { Helmet } from 'react-helmet'

import useGetAvatars from '@/hooks/use-get-avatars'
import clsx from 'clsx'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { ReactNode, useMemo } from 'react'

import useLatency from '@/hooks/use-latency'
import favIcon from '@/images/favicon.png'
import InputMonitor from '../input-monitor'
import * as styles from './index.module.css'

const shortcodes = { Link }

export default function Layout({ children }: { children: ReactNode }) {
  const data = useStaticQuery<Queries.LayoutQuery>(graphql`
    query Layout {
      site {
        siteMetadata {
          title
          description
          siteUrl
          authors {
            name
          }
        }
      }
      filtered: allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        limit: 1
        filter: { frontmatter: { date: { ne: null } } }
      ) {
        nodes {
          frontmatter {
            date
          }
        }
      }

      count: allMdx(filter: { excerpt: { ne: "" } }) {
        totalCount
      }
    }
  `)
  const { title, description } = data?.site?.siteMetadata || {}
  const date = data?.filtered?.nodes?.[0]?.frontmatter?.date
  const totalCount = data?.count?.totalCount

  // const defaultAuthor = useMemo(() => {
  //   return authors?.find((author) => {
  //     return author?.path && location.pathname.startsWith(author.path)
  //   })
  // }, [authors])

  const extra = useLatency()

  const avatars = useGetAvatars()

  const Header = useMemo(() => {
    return (
      <h1 className="text-t1 flex items-center justify-center">
        {avatars?.map(({ name, imageData, path }, index) => {
          if (!name || !imageData) {
            return null
          }
          return (
            <span key={name} className="flex items-center">
              <Link to={path || '/'} className="text-t1 flex flex-col justify-center items-center ml-8 mr-8">
                <GatsbyImage className={clsx('rounded-half w-24 mb-4')} image={imageData} alt={`${name} 's avatar`} />
                <span className={styles.authorName}>{name}</span>
              </Link>
              {index < avatars.length - 1 && (
                <Link to={'/'} className="justify-end mt-auto w-24 h-24">
                  <span
                    className="bg-center bg-contain bg-no-repeat w-full h-full inline-block"
                    style={{
                      backgroundImage: `url(${favIcon})`,
                    }}
                  />
                </Link>
              )}
            </span>
          )
        })}
      </h1>
    )
  }, [avatars])

  const Description = useMemo(() => {
    return (
      <div className={clsx('mt-24 text-gray-500 text-t3l whitespace-pre-line', extra)}>
        <InputMonitor speed={50}>
          {`欢迎访问我们的博客～\n希望在这里的时间你可以有所收获\n写的不好的地方希望你能反馈给文章的作者促进我们共同进步。有效建议都会标记在文章中～\n如果博客无法正常显示，请移步到现代浏览器访问～ (拒绝处理兼容问题！)`}
        </InputMonitor>
      </div>
    )
  }, [extra])

  const Statistics = useMemo(() => {
    return (
      <div className="absolute left-8 bottom-20">
        <div>
          当前已收录了<span className="font-bold text-t3s inline-block ml-1 mr-1">{totalCount}</span>篇文章
        </div>
        {date && (
          <div className="mt-2">
            最后一次更新文章是在<span className="font-medium text-t5 inline-block ml-1 mr-1">{date}</span>
          </div>
        )}
      </div>
    )
  }, [date, totalCount])

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description || ''}></meta>
      </Helmet>
      <div className="grid grid-cols-12 relative">
        <div className="h-screen col-span-3 sticky top-0 pt-24 pb-12 pl-8 pr-8">
          {Header}
          {Description}
          {Statistics}
          <footer className="absolute left-8 bottom-8 italic">Powered by gatsby.</footer>
        </div>
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </div>
    </>
  )
}
