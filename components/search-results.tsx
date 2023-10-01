"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchResultsProps extends React.HTMLAttributes<HTMLFormElement> {
  loading?: boolean
  resultItems?: any[]
}

export function SearchResults({
  className,
  loading = false,
  resultItems = [],
  ...props
}: SearchResultsProps) {
  if (loading) {
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

  return (
    <div className="w-full">
      <h4 className="mb-4 text-sm font-medium leading-none">Results</h4>
      {resultItems.length > 0 ? (
        resultItems.map((item) => (
          <div key={item["ticker"]}>
            <Card className="cursor-pointer">
              <CardHeader>
                <div>
                  <CardTitle>{item["ticker"]}</CardTitle>
                  <CardDescription>{item["name"]}</CardDescription>
                </div>
              </CardHeader>
            </Card>
            <div className="my-2" />
          </div>
        ))
      ) : (
        <p className="text-center italic">
          No company/ticker matches your query. Try something else.
        </p>
      )}
    </div>
  )
}
