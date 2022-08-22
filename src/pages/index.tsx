import Tag from '@/components/tag'
import useLatency from '@/hooks/use-latency'
import clsx from 'clsx'
import ArticleAbstract from 'Components/article-abstract'
import Masonry from 'Components/masonry'
import { graphql, navigate } from 'gatsby'
import React, { useMemo, useState } from 'react'
import * as styles from './index.module.css'
export default function HomePage({ data }: { data: Queries.BlogInfoQuery }) {
  const tags = useMemo(() => {
    return Array.from(new Set(data?.allMdx?.nodes?.map(({ frontmatter: { tag } }) => tag))) || []
  }, [data])
  const [chosenTags, setChosenTags] = useState<string[]>([])
  const onToggleChoose = (tag: string) => {
    chosenTags.includes(tag) ? setChosenTags(chosenTags.filter((t) => t !== tag)) : setChosenTags([...chosenTags, tag])
  }
  const extra = useLatency()
  return (
    <>
      <div className={clsx('col-span-7 relative box-content text-center mt-12 bg-gray-50', extra)}>
        <Masonry>
          {data?.allMdx?.nodes
            ?.filter(({ frontmatter }) => !chosenTags.length || chosenTags.includes(frontmatter?.tag || ''))
            ?.map(({ slug, frontmatter, excerpt }) => {
              console.log('slug: ', slug)
              return (
                <ArticleAbstract
                  key={slug}
                  className={clsx(styles.articleCard, 'inline-block flex-none p-5 mr-6 mb-5')}
                  title={frontmatter?.title || ''}
                  author={frontmatter?.author}
                  date={frontmatter?.date}
                  content={excerpt || ''}
                  onClick={() => {
                    navigate(`/blog/${slug}`)
                  }}
                />
              )
            })}
        </Masonry>
      </div>
      <div className="col-span-2 mt-12">
        <div className=" flex flex-wrap items-center p-8">
          {tags.map((tag) => (
            <Tag value={tag} key={tag} onToggleChoose={onToggleChoose} chosen={chosenTags.includes(tag)} />
          ))}
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query BlogInfo {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        id
        slug
        frontmatter {
          author
          date
          title
          tag
        }
        excerpt(truncate: true, pruneLength: 400)
      }
    }
  }
`
