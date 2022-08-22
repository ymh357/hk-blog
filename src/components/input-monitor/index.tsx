import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'

export default function InputMonitor({ children, speed }: { children: ReactNode; speed?: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [filledInput, setFilledInput] = useState('')

  const getNextCharacter = (cur: string, all: string) => {
    return all[cur.length] || ''
  }

  const editable = useMemo(() => {
    return filledInput !== children
  }, [children, filledInput])

  useEffect(() => {
    if (!editable && containerRef.current) {
      containerRef.current.style.height = 'auto'
    }
  }, [editable])

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    containerRef.current.style.height = containerRef.current.offsetHeight + 'px'
  }, [])

  useEffect(() => {
    if (containerRef.current && filledInput) {
      const range = new Range()
      range.setStart(containerRef.current.childNodes.item(0), filledInput.length)
      range.collapse(true)
      const selection = document.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }, [filledInput])

  useEffect(() => {
    let cur = ''
    // eslint-disable-next-line prefer-const
    let taskId: number
    let nextCharacter: string
    containerRef.current?.focus()

    const startTask = speed
      ? (task: Function) => {
          return setTimeout(task, speed)
        }
      : requestAnimationFrame
    const cancelTask = speed ? clearTimeout : cancelAnimationFrame

    const frameCb = () => {
      nextCharacter = getNextCharacter(cur, children as string)
      if (nextCharacter === '') {
        console.log('wtf')
        cancelTask(taskId)
        return
      }
      cur = `${cur}${nextCharacter}`
      setFilledInput((prev) => `${prev}${nextCharacter}`)
      return startTask(frameCb)
    }
    taskId = startTask(frameCb)

    return () => {
      cancelTask(taskId)
    }
  }, [children, speed])

  return (
    <div suppressContentEditableWarning ref={containerRef} contentEditable={editable} className="outline-none">
      {filledInput}
    </div>
  )
}

// TODO: deal with the content editted after the animation.
