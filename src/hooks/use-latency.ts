import { useEffect, useState } from 'react'

const useLatency = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? '' : 'opacity-0'
}

export default useLatency
