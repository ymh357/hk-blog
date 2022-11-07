import { Moment } from 'moment'
import React, { useMemo } from 'react'
import CheckBox from '../ui/checkbox'
import Drawer from '../ui/drawer'

const getAllMonthsFromYear = (year: number, data: Record<number, Record<number, number>>) => {
  return Object.keys(data[year]).map((m) => year + ' ' + m)
}

export default function DateFilter({
  dates,
  checkedDates,
  onChange,
}: {
  dates: Moment[]
  checkedDates: string[]
  onChange: (d: string | string[], checked: boolean) => void
}) {
  const data = useMemo(
    () =>
      dates.reduce((acc: Record<number, Record<number, number>>, cur) => {
        if (!acc[cur.year()]) {
          acc[cur.year()] = {}
        }
        if (!acc[cur.year()][cur.month() + 1]) {
          acc[cur.year()][cur.month() + 1] = 0
        }
        acc[cur.year()][cur.month() + 1]++
        return acc
      }, {}),
    [dates]
  )

  return (
    <div className="p-4">
      {Object.keys(data).map((yearKey) => {
        const monthData = data[+yearKey]
        return (
          <Drawer
            key={yearKey}
            titleDom={
              <div className="flex items-center">
                <CheckBox
                  name={yearKey}
                  checked={getAllMonthsFromYear(+yearKey, data).some((m) => checkedDates.includes(m))}
                  onToggle={(checked) => onChange(getAllMonthsFromYear(+yearKey, data), checked)}
                />
                <span className="ml-2 text-t4s">{yearKey}年</span>
              </div>
            }
          >
            <div className="ml-4 mt-4 mb-4">
              {Object.keys(monthData).map((monthKey) => (
                <div key={monthKey} className="mt-2">
                  <CheckBox
                    name={yearKey + ' ' + monthKey}
                    checked={checkedDates.includes(yearKey + ' ' + monthKey)}
                    onToggle={(checked) => onChange(yearKey + ' ' + monthKey, checked)}
                  />
                  <span className="ml-4 text-t5">{monthKey}月</span>
                  <span className="ml-4 text-t6 text-gray-700">({monthData[+monthKey]}篇)</span>
                </div>
              ))}
            </div>
          </Drawer>
        )
      })}
    </div>
  )
}
