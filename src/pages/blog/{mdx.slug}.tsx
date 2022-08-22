import clsx from 'clsx'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'

import * as styles from './index.module.css'

export default function Article({ data }: { data: Queries.BlogPageQuery }) {
  if (!data?.mdx?.frontmatter) {
    return null
  }
  return (
    <div className={clsx('col-span-9 pt-12 pl-16 pr-16', styles.articleContainer)}>
      {/* <div>writed by {} at {data.mdx.frontmatter.date}</div>
      {data.mdx.frontmatter.tags && (
        <div>标签 {data.mdx.frontmatter.tags}</div>

      )} */}
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
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
      body
    }
  }
`
