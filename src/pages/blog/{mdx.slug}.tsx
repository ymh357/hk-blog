import { graphql } from "gatsby";
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from "react";
import Layout from "../../components/layout";

export default function({data}: {data: Queries.BlogPageQuery}){
  if(!data?.mdx?.frontmatter){
    return null
  }
  return (
    <Layout>
      <h1>{data.mdx.frontmatter.title}</h1>
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>
    </Layout>
    
  )  
}

export const query = graphql`
query BlogPage($id: String) {
  mdx(id: {eq: $id}) {
    frontmatter {
      title
    }
    body
  }
}
`