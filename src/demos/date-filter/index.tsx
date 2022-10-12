import DateFilter from '@/components/date-filter'
import { graphql, useStaticQuery } from 'gatsby'
import moment from 'moment'
import React, { useMemo, useState } from 'react'

const modifyDates = (prev: string[], d: string, checked: boolean) => {
  if (prev.includes(d) && !checked) {
    return prev.filter((e) => e !== d)
  } else if (checked) {
    return [...prev, d]
  }
  return prev
}

export default function Demo() {
  const data = useStaticQuery<Queries.DatesQuery>(graphql`
    query Dates {
      allMdx {
        nodes {
          frontmatter {
            date
          }
        }
      }
    }
  `)

  const dates = useMemo(() => {
    return data?.allMdx?.nodes?.map((n) => moment(n?.frontmatter?.date)) || []
  }, [data])

  const [checkedDates, setCheckedDates] = useState<string[]>([])

  return (
    <div className="bg-gray-200">
      <DateFilter
        dates={dates}
        checkedDates={checkedDates}
        onChange={(d, checked) => {
          setCheckedDates((prev) => {
            if (!Array.isArray(d)) {
              return modifyDates(prev, d, checked)
            } else {
              return d.reduce((acc, cur) => {
                return modifyDates(acc, cur, checked)
              }, prev)
            }
          })
        }}
      />
    </div>
  )
}
