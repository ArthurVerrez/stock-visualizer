"use client"

import { useEffect, useRef, useState } from "react"

import { Input } from "@/components/ui/input"

interface MainSearchProps extends React.HTMLAttributes<HTMLFormElement> {
  submitCallback: (event: React.SyntheticEvent, value: string) => void
  changeCallback: (event: React.SyntheticEvent, value: string) => void
}

export function MainSearch({
  submitCallback,
  changeCallback,
  ...props
}: MainSearchProps) {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    changeCallback(event, event.target.value)
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    submitCallback(event, value)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" {...props}>
      <Input
        ref={inputRef}
        type="search"
        placeholder="Type in a company name or a ticker..."
        value={value}
        onChange={handleChange}
      />
    </form>
  )
}
