"use client"

import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

interface SearchResults extends React.HTMLAttributes<HTMLFormElement> {}

// Fill a results array of objects like {name:"company1", ticker:"ticker1"} for 20 results

const results = Array.from({ length: 20 }, (_, i) => ({
  name: `company${i}`,
  ticker: `ticker${i}`,
  description: `I am a description for company${i}`,
  image: "https://github.com/ArthurVerrez.png",
}))

export function SearchResults({ className, ...props }: SearchResults) {
  return (
    <div className="w-full">
      <h4 className="mb-4 text-sm font-medium leading-none">Results</h4>
      {results.map((result) => (
        <>
          <Card>
            <CardHeader key={result["name"]}>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={result["image"]} />
                  <AvatarFallback>{result["ticker"]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{result["name"]}</CardTitle>
                  <CardDescription>{result["ticker"]}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{result["description"]}</CardDescription>
            </CardContent>
          </Card>
          <div className="my-2" />
        </>
      ))}
    </div>
  )
}
