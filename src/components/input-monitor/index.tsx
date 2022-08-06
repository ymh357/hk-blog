import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'

export default function InputMonitor({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [filledInput, setFilledInput] = useState('')

  const getNextCharacter = (cur: string, all: string) => {
    return all[cur.length] || ''
  }

  const editable = useMemo(() => {
    return filledInput !== children
  }, [children, filledInput])

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
    let rafId: number
    let nextCharacter: string
    containerRef.current?.focus()
    const frameCb = () => {
      nextCharacter = getNextCharacter(cur, children as string)
      if (nextCharacter === '') {
        window.cancelAnimationFrame(rafId)
        return
      }
      cur = `${cur}${nextCharacter}`
      setFilledInput((prev) => `${prev}${nextCharacter}`)
      return window.requestAnimationFrame(frameCb)
    }
    rafId = window.requestAnimationFrame(frameCb)

    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [children])

  return (
    <div suppressContentEditableWarning ref={containerRef} contentEditable={editable} className="outline-none">
      {filledInput}
    </div>
  )
}

// TODO: deal with the content editted after the animation.
