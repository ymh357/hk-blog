import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'

export default function Article({ data }: { data: Queries.BlogPageQuery }) {
  if (!data?.mdx?.frontmatter) {
    return null
  }
  return (
    <div className="col-span-9">
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </div>
  )
}

export const query = graphql`
  query BlogPage($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
      body
    }
  }
`
