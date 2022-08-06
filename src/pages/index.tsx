import ArticleAbstract from 'Components/article-abstract'
import Masonry from 'Components/masonry'
import { graphql, navigate } from 'gatsby'
import React from 'react'
export default function HomePage({ data }: { data: Queries.BlogInfoQuery }) {
  console.log('data2: ', data)
  return (
    <>
      <div className="col-span-7 relative flex justify-center">
        <Masonry>
          {data.allMdx.nodes.map(({ slug, frontmatter, excerpt }) => {
            console.log('slug: ', slug)
            return (
              <ArticleAbstract
                key={slug}
                className="w-5/12 inline-block flex-none"
                title={frontmatter?.title || ''}
                content={excerpt || ''}
                onClick={() => {
                  navigate(`/blog/${slug}`)
                }}
              />
            )
          })}
        </Masonry>
      </div>
      <div className="col-span-2">tags</div>
    </>
  )
}

export const query = graphql`
  query BlogInfo {
    allMdx {
      nodes {
        id
        slug
        frontmatter {
          author
          date
          title
        }
        excerpt(truncate: true, pruneLength: 400)
      }
    }
  }
`
