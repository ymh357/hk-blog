import { MDXProvider } from '@mdx-js/react'
import { Helmet } from 'react-helmet'

import useGetAvatars from '@/hooks/use-get-avatars'
import clsx from 'clsx'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { ReactNode, useMemo } from 'react'
import InputMonitor from '../input-monitor'

import favIcon from '@/images/favIcon.png'
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
    }
  `)
  const { title, description } = data?.site?.siteMetadata || {}

  // const defaultAuthor = useMemo(() => {
  //   return authors?.find((author) => {
  //     return author?.path && location.pathname.startsWith(author.path)
  //   })
  // }, [authors])

  const avatar = useGetAvatars()

  const Header = useMemo(() => {
    return (
      <h1 className="text-t1 flex items-center justify-center">
        {avatar?.map(({ name, imageData, path }, index) => {
          if (!name || !imageData) {
            return null
          }
          return (
            <span key={name} className="flex items-center">
              <Link to={path || '/'} className="text-t1 flex flex-col justify-center items-center ml-8 mr-8">
                <GatsbyImage className={clsx('rounded-half w-24 mb-4')} image={imageData} alt={`${name} 's avatar`} />
                <span className={styles.authorName}>{name}</span>
              </Link>
              {index < avatar.length - 1 && (
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
  }, [avatar])

  const Description = useMemo(() => {
    return (
      <div className={clsx('mt-24 text-gray-500 text-t3l whitespace-pre-line')}>
        <InputMonitor speed={50}>
          {`欢迎访问我们的博客～\n希望在这里的时间你可以有所收获\n写的不好的地方希望你能反馈给文章的作者促进我们共同进步。有效建议都会标记在文章中～\n如果博客无法正常显示，请移步到现代浏览器访问～ (拒绝处理兼容问题！)`}
        </InputMonitor>
      </div>
    )
  }, [])

  const Statistics = useMemo(() => {
    return (
      <div className="mt-32">
        <div>
          至今有<span>x</span>次访问
        </div>
        <div>
          当前已收录了<span>xxx</span>篇文章
        </div>
        <div>
          网站最后一次更新是在<span>x</span>天前
        </div>
      </div>
    )
  }, [])

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
          <footer className="mt-16">Powered by gatsby.</footer>
        </div>
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </div>
    </>
  )
}
