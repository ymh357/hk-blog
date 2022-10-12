import InfiniteScroll from '@/components/infinite-scroll'
import Masonry from '@/components/masonry'
import React, { useCallback, useState } from 'react'

export default function Demo() {
  const [data, setData] = useState<any[]>([5])
  const [data2, setData2] = useState<any[]>([5])
  const loadMore = useCallback(() => {
    setData((prev) => [...prev, ...new Array(5).fill(undefined)])
  }, [])
  const loadMore2 = useCallback(() => {
    setData2((prev) => [...prev, ...new Array(5).fill(undefined)])
  }, [])

  return (
    <div>
      <div className="inline-block w-1/2 align-top">
        <h2 className="text-center">normal</h2>
        <InfiniteScroll loadMore={loadMore} complete={data.length >= 20}>
          {data.map((_, i) => (
            <div className="mb-8 bg-red-200 h-96" key={i}>
              {i}
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <div className="inline-block w-1/2">
        <h2 className="text-center">with masonry</h2>
        <InfiniteScroll loadMore={loadMore2} complete={data2.length >= 20}>
          <Masonry>
            {data2.map((_, i) => (
              <div className="mb-8 bg-red-200 h-96 w-96" key={i}>
                {i}
              </div>
            ))}
          </Masonry>
        </InfiniteScroll>
      </div>
    </div>
  )
}
