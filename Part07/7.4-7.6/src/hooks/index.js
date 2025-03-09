import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  // Reset function to clear the input field
  const reset = () => {
    setValue('')
  }

  // Return an object for input attributes and a separate reset function
  return {
    inputProps: { type, value, onChange },
    reset
  }
}
