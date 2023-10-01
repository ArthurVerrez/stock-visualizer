"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSearch } from "@/services/finance"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchResultsProps extends React.HTMLAttributes<HTMLFormElement> {
  value: string | null
}

export function SearchResults({ value }: SearchResultsProps) {
  const { tickers, isLoading, isError } = useSearch(value)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (tickers && tickers.length > 0) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault() // Prevent default behavior
        }
        if (event.key === "ArrowDown") {
          setSelectedIndex((prevIndex) =>
            Math.min((prevIndex ?? -1) + 1, tickers.length - 1)
          )
        } else if (event.key === "ArrowUp") {
          setSelectedIndex((prevIndex) => Math.max((prevIndex ?? 1) - 1, 0))
        } else if (event.key === "Enter" && selectedIndex !== null) {
          const selectedTicker = tickers[selectedIndex]
          if (selectedTicker) {
            window.location.href = `/${selectedTicker["ticker"]}`
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [tickers, selectedIndex])

  useEffect(() => {
    if (tickers && tickers.length > 0) {
      setSelectedIndex(0)
    } else {
      setSelectedIndex(null)
    }
  }, [tickers])

  if (!value || value.length < 2) {
    return <div></div>
  }

  if (isLoading) {
    return (
      <div className="w-full">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="mb-6 flex items-center space-x-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return <p>Error loading data.</p>
  }

  return (
    <div className="w-full">
      <h4 className="mb-4 text-sm font-medium leading-none">Results</h4>
      {tickers?.length > 0 ? (
        tickers.map((item: any, index: number) => (
          <Link key={item["ticker"]} href={`/${item["ticker"]}`}>
            <div style={{ cursor: "pointer" }}>
              <Card className={index === selectedIndex ? "bg-secondary" : ""}>
                <CardHeader>
                  <div>
                    <CardTitle>{item["ticker"]}</CardTitle>
                    <CardDescription>{item["name"]}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <div className="my-2" />
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center italic">
          No company/ticker matches your query. Try something else.
        </p>
      )}
    </div>
  )
}
