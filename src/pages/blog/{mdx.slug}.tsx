import SideNav from '@/components/side-nav'
import useTrackHeaders from '@/hooks/use-track-headers'
import clsx from 'clsx'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'

import * as styles from './index.module.css'

export default function Article({ data }: { data: Queries.BlogPageQuery }) {
  const { current, ref, setCurrent } = useTrackHeaders()

  if (!data?.mdx?.frontmatter) {
    return null
  }
  const multipleHeadings = data?.mdx?.headings?.length > 1
  return (
    <div
      className={clsx('pt-12 pl-16 pr-16', styles.articleContainer, {
        'col-span-9': !multipleHeadings,
        'col-span-6': multipleHeadings,
      })}
    >
      <h1>{data?.mdx?.frontmatter?.title}</h1>
      {data.mdx.frontmatter.tag && (
        <div className="flex items-center mb-2">
          {data.mdx.frontmatter.tag.split(',').map((tag) => (
            <span className="mr-3 border-solid border-blue-50 border pl-1 pr-1 text-t8" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="text-gray-600 mb-2">
        Written by {data?.mdx?.frontmatter?.author}, at {data.mdx.frontmatter.date}.
      </div>
      <article ref={ref}>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </article>
      <SideNav headings={data?.mdx?.headings || []} current={current} setCurrent={setCurrent} />
    </div>
  )
}

export const query = graphql`
  query BlogPage($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
        tag
        author
      }
      headings {
        value
        depth
      }
      body
    }
  }
`
