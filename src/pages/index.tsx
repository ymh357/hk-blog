import DateFilter from '@/components/date-filter'
import InfiniteScroll from '@/components/infinite-scroll'
import Tag from '@/components/tag'
import Switch from '@/components/ui/switch'
import useGetAvatars from '@/hooks/use-get-avatars'
import useLatency from '@/hooks/use-latency'
import clsx from 'clsx'
import ArticleAbstract from 'Components/article-abstract'
import Masonry from 'Components/masonry'
import { graphql, navigate } from 'gatsby'
import produce from 'immer'
import moment from 'moment'
import React, { useCallback, useMemo, useReducer, useState } from 'react'

import * as styles from './index.module.css'
export default function HomePage({ data }: { data: Queries.BlogInfoQuery }) {
  const tags = useMemo(() => {
    return (
      Array.from(
        new Set(
          data?.allMdx?.nodes?.reduce((acc: string[], cur) => {
            let splitted: string[] = []
            if (typeof cur.frontmatter?.tag === 'string') {
              splitted = cur.frontmatter.tag.split(',')
            }
            return [...acc, ...splitted]
          }, [])
        )
      ) || []
    )
  }, [data])

  const [chosenTags, setChosenTags] = useState<string[]>(tags)
  const onToggleChoose = (tag: string) => {
    chosenTags.includes(tag) ? setChosenTags(chosenTags.filter((t) => t !== tag)) : setChosenTags([...chosenTags, tag])
  }

  const dates = useMemo(() => {
    return data?.allMdx?.nodes?.map((n) => moment(n?.frontmatter?.date)) || []
  }, [data])

  const [checkedDates, setCheckedDates] = useState<string[]>(
    dates.map((date) => date.year() + ' ' + (date.month() + 1))
  )

  const avatars = useGetAvatars()

  const [authorState, dispatch] = useReducer(
    (state: Record<string, boolean> | undefined, action: { name: string; payload: boolean }) => {
      return produce(state, (draft) => {
        if (!draft) {
          return
        }

        draft[action.name] = action.payload
      })
    },
    avatars?.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.name || '']: true,
      }
    }, {})
  )

  const extra = useLatency()
  const [showNum, setShowNum] = useState(5)
  const articles = useMemo(() => {
    let authorFilter: string[] = []
    if (authorState) {
      authorFilter = Object.keys(authorState)?.filter((key) => {
        const on = authorState[key]
        return on
      })
    }

    return data?.allMdx?.nodes?.filter(({ frontmatter }) => {
      const dateArr = frontmatter?.date?.split('-')
      if (!dateArr) {
        return false
      }
      if (dateArr[1][0] === '0') {
        dateArr[1] = dateArr[1][1]
      }
      console.log(`dateArr[0] + ' ' + dateArr[1]: `, dateArr[0] + ' ' + dateArr[1])

      return (
        chosenTags?.some((chosenTag) => frontmatter?.tag?.split(',')?.some((tag) => tag === chosenTag)) &&
        authorFilter?.includes(frontmatter?.author || '') &&
        checkedDates?.includes(dateArr[0] + ' ' + dateArr[1])
      )
    })
  }, [authorState, checkedDates, chosenTags, data?.allMdx?.nodes])

  const loadMore = useCallback(() => {
    setShowNum((prev) => prev + 5)
  }, [])

  const handleDateChange = useCallback((d: string | string[], checked: boolean) => {
    const modifyDates = (prev: string[], d: string, checked: boolean) => {
      if (prev.includes(d) && !checked) {
        return prev.filter((e) => e !== d)
      } else if (checked) {
        return [...prev, d]
      }
      return prev
    }

    setCheckedDates((prev) => {
      if (!Array.isArray(d)) {
        return modifyDates(prev, d, checked)
      } else {
        return d.reduce((acc, cur) => {
          return modifyDates(acc, cur, checked)
        }, prev)
      }
    })
  }, [])

  return (
    <>
      <div className={clsx('col-span-7 relative box-content text-center mt-12 bg-gray-50', extra)}>
        <InfiniteScroll loadMore={loadMore} complete={showNum >= articles.length}>
          <Masonry>
            {articles?.slice(0, showNum)?.map(({ slug, frontmatter, excerpt }) => {
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
        </InfiniteScroll>
      </div>
      <div className="col-span-2 mt-12">
        <div className=" flex flex-wrap items-center p-8">
          {tags.map((tag) => (
            <Tag value={tag} key={tag} onToggleChoose={onToggleChoose} chosen={chosenTags.includes(tag)} />
          ))}
        </div>

        {authorState && (
          <div className="flex p-8 flex-col">
            {Object.keys(authorState)?.map((authorName) => {
              const on = authorState[authorName]

              return (
                <Switch
                  className={clsx('!bg-gray-100 mt-4')}
                  btnBg={avatars?.find((avatar) => avatar.name === authorName)?.imageData}
                  key={authorName}
                  on={on}
                  onToggle={(s) =>
                    dispatch({
                      name: authorName,
                      payload: s,
                    })
                  }
                />
              )
            })}
          </div>
        )}

        <DateFilter dates={dates} checkedDates={checkedDates} onChange={handleDateChange} />
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
