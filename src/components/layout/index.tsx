import { MDXProvider } from '@mdx-js/react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { ReactNode, useEffect } from 'react'

const shortcodes = { Link }

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    console.log('layout render...')
  }, [])

  const data = useStaticQuery<Queries.LayoutQuery>(graphql`
    query Layout {
      site {
        siteMetadata {
          title
          description
          siteUrl
          authors {
            # avatar {
            #   childImageSharp {
            #     gatsbyImageData
            #   }
            # }
            name
          }
        }
      }
      allFile(filter: { relativeDirectory: { eq: "site-meta-data" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  `)
  const { title, description, siteUrl, authors } = data?.site?.siteMetadata || {}
  const { nodes } = data?.allFile
  return (
    <div className="grid grid-cols-12">
      <div className="inline-flex h-screen col-span-3 sticky top-0">
        {nodes?.map((node) => {
          if (!node?.childImageSharp?.gatsbyImageData) {
            return null
          }
          return (
            <GatsbyImage key={node?.name} image={node?.childImageSharp?.gatsbyImageData} alt={`${name} 's avatar`} />
          )
        })}
      </div>
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </div>
  )
}
