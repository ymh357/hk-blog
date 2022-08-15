import React, { useRef } from 'react'
import { btn, container3d, d1, d2, space3d } from './index.module.css'
export default function Demo() {
  const d1Ref = useRef<HTMLDivElement>(null)
  const d2Ref = useRef<HTMLDivElement>(null)
  return (
    <div className={space3d}>
      <div className={container3d}>
        <div className={d1} ref={d1Ref}>
          aaa
        </div>
        <div className={d2} ref={d2Ref}>
          bbb
        </div>
      </div>
      <div className="mt-2">
        <button
          className={btn}
          onClick={() => {
            if (!d1Ref.current) {
              return
            }
            d1Ref.current.style.transform = `rotateX(-45deg) translateY(100px)`
          }}
        >
          css animation
        </button>
        <button
          className={btn}
          onClick={() => {
            if (!d1Ref.current) {
              return
            }
            d1Ref.current.style.transform = `none`
          }}
        >
          restore
        </button>
      </div>

      <div className="mt-2">
        <button
          className={btn}
          onClick={() => {
            if (!d2Ref.current) {
              return
            }
            // 60/s
            const now = [0, 0]
            const id = window.requestAnimationFrame(step)
            function step() {
              if (!d2Ref.current) {
                return
              }
              now[0] += -45 / 60
              now[1] += 100 / 60
              if (now[0] >= 145 || now[1] >= 100) {
                d2Ref.current.style.transform = `rotateX(-45deg) translateY(100px)`
                return window.cancelAnimationFrame(id)
              }
              d2Ref.current.style.transform = `rotateX(${now[0]}deg) translateY(${now[1]}px)`
              return window.requestAnimationFrame(step)
            }
          }}
        >
          js animation
        </button>
        <button
          className={btn}
          onClick={() => {
            if (!d2Ref.current) {
              return
            }
            d2Ref.current.style.transform = `none`
          }}
        >
          restore
        </button>
      </div>
    </div>
  )
}
