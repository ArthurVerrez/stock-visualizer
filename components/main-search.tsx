"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

interface MainSearchProps extends React.HTMLAttributes<HTMLFormElement> {}

export function MainSearch({ className, ...props }: MainSearchProps) {
  const [value, setValue] = useState("")

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    return toast({
      title: "Not implemented",
      description: `You submitted: ${value}`,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" {...props}>
      <Input
        type="search"
        placeholder="Type in a company name or a ticker..."
      />
    </form>
  )
}
