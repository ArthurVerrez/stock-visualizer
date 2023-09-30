"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

interface MainSearchProps extends React.HTMLAttributes<HTMLFormElement> {
  submitCallback: (event: React.SyntheticEvent, value: string) => void
}

export function MainSearch({
  className,
  submitCallback,
  ...props
}: MainSearchProps) {
  const [value, setValue] = useState("")
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    console.log(event)
    toast({
      title: "Not implemented",
      description: `You submitted: ${value}`,
    })

    submitCallback(event, value)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" {...props}>
      <Input
        type="search"
        placeholder="Type in a company name or a ticker..."
        value={value}
        onChange={handleChange}
      />
    </form>
  )
}
