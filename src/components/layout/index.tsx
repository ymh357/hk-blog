import { MDXProvider } from '@mdx-js/react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React, { ReactNode } from 'react'

const shortcodes = {Link}

export default function({
  children
}: {
  children: ReactNode
}){
  // const {data}: {data: Queries.LayoutQuery} = useStaticQuery(graphql`
  //   query Layout{
  //     allSitePage(filter: {path: {nin: [ "/dev-404-page/", "/404/", "/404.html", "/typegen/" ]}}) {
  //       edges {
  //         node {
  //           path
  //         }
  //       }
  //     }
  //   }
  // `)
  return (
    <>
      <div className='flex items-center'>
        <Link to='/' className=" mr-5">Home</Link>
        <Link to='/blog/'>Blog</Link>
      </div>
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </>
  )
}