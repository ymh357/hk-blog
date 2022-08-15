import React from 'react'

export default function Skeleton({ className, count }: { className: string; count: number }) {
  return (
    <div className="flex items-center flex-wrap justify-evenly">
      {new Array(count).fill(undefined).map((_, index) => (
        <div key={index} className={className} />
      ))}
    </div>
  )
}
