import { graphql, Link, PageProps } from "gatsby"
import React from "react";
import Layout from "../../components/layout";


export default function BlogTemplate({data}: {data: Queries.BlogTemplateQuery}){
  console.log('data: ', data);
  if(!data?.allMdx?.nodes){
    return null
  }
  return (
    <Layout>
      <h1>Would you like to check our blogs?</h1>
      {data.allMdx.nodes.map(mdx => (
        <Link key={mdx.slug} to={`/blog/${mdx.slug}`}>{mdx.slug}</Link>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query BlogTemplate{
    allMdx {
      nodes {
        slug
      }
    }
  }
`