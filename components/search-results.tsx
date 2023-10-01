"use client"

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
        tickers.map((item: any) => (
          <Link key={item["ticker"]} href={`/${item["ticker"]}`}>
            <div style={{ cursor: "pointer" }}>
              <Card>
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
