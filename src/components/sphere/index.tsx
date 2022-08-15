import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

const getCoordinate = (radius: number, total: number, index: number) => {
  return [
    radius * Math.cos(((3 / 2) * Math.PI + (index * 2 * Math.PI) / total) % (2 * Math.PI)),
    radius * -1 * Math.sin(((3 / 2) * Math.PI + (index * 2 * Math.PI) / total) % (2 * Math.PI)),
  ]
}

// 70是实验值
const initRotateX = (70 / 360) * Math.PI * 2
const initRotateY = 0
const initRotateZ = 0

export default function Sphere({
  radius,
  total,
  children,
  className = '',
}: {
  radius: number
  total: number
  children: React.ReactNode[]
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    setRendered(true)
  }, [])

  useEffect(() => {
    let animationStart = false
    let cursorCoordinate = [0, 0]
    let initRotate = [initRotateX, initRotateY, initRotateZ]
    let rotateNow = initRotate
    const mouseDownHandler = (e: MouseEvent) => {
      e.stopPropagation()
      cursorCoordinate = [e.clientX, e.clientY]
      initRotate = rotateNow
      animationStart = true
    }
    const mouseMoveHandler = (e: MouseEvent) => {
      e.stopPropagation()
      if (!containerRef.current) {
        return
      }
      // 横向拖动 绕z轴转
      // 纵向移动 绕x轴转
      if (animationStart) {
        const diff = [e.clientX - cursorCoordinate[0], e.clientY - cursorCoordinate[1]]
        const containerRect = [
          (containerRef.current.parentElement as HTMLDivElement).getBoundingClientRect().width,
          (containerRef.current.parentElement as HTMLDivElement).getBoundingClientRect().height,
        ]
        rotateNow = [
          initRotate[0] - (diff[1] / containerRect[1]) * Math.PI,
          initRotate[1],
          initRotate[2] - (diff[0] / containerRect[0]) * Math.PI,
        ]
        const transform = `rotateX(${rotateNow[0]}rad) rotateY(${rotateNow[1]}rad) rotateZ(${rotateNow[2]}rad)`
        containerRef.current.style.transform = transform
      }
    }
    const mouseUpHandler = (e: MouseEvent) => {
      e.stopPropagation()
      animationStart = false
    }

    window.addEventListener('mousedown', mouseDownHandler)
    window.addEventListener('mousemove', mouseMoveHandler)
    window.addEventListener('mouseup', mouseUpHandler)

    return () => {
      window.removeEventListener('mousedown', mouseDownHandler)
      window.removeEventListener('mousemove', mouseMoveHandler)
      window.removeEventListener('mouseup', mouseUpHandler)
    }
  }, [])

  return (
    <div
      className={clsx(className, '')}
      style={{
        perspective: 600,
      }}
    >
      <div
        style={{
          transform: `rotateX(70deg)`,
          transformStyle: `preserve-3d`,
        }}
        ref={containerRef}
      >
        {children.map((card, index) => {
          const coordinate = getCoordinate(radius, total, index)
          return (
            <div
              key={index}
              className={clsx('inline-block', {
                absolute: index !== children.length - 1,
              })}
              style={
                rendered
                  ? {
                      transition: `transform 0.5s linear ${0.1 * (index + 1)}s`,
                      transform: `translate(${coordinate[0]}px, ${coordinate[1]}px) rotateZ(${
                        (-1 * 2 * index * Math.PI) / total
                      }rad) rotateX(-90deg)`,
                      WebkitBoxReflect: `below 10px -webkit-linear-gradient(top,rgba(0,0,0,0) 40%,rgba(0,0,0,0.5) 100%)`,
                    }
                  : undefined
              }
            >
              {card}
            </div>
          )
        })}
      </div>
    </div>
  )
}
