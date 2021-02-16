import { useMemo } from 'react'
// Import utils
import { randomColor } from 'Utils'

const useStyle = () => {
  const style = useMemo(() => {
    return { background: `#${randomColor()}` }
  }, [])

  return { style }
}

export default useStyle
