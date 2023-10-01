"use client"

import { useState } from "react"

import { toast } from "@/components/ui/use-toast"
import { MainSearch } from "@/components/main-search"
import { SearchResults } from "@/components/search-results"

export default function IndexPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const [searched, setSearched] = useState(false)
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/ticker-search`

  const handleSubmit = async (event: React.SyntheticEvent, value: string) => {
    event.preventDefault()
    setSearched(true)
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}?search=${value}`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setResults(data.tickers)
    } catch (error) {
      console.error("Fetch failed: ", error)
      toast({
        title: "Error getting search results",
        description:
          "There was an error getting search results. Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <section className="container mx-auto flex min-w-[400px] flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-center gap-2 md:w-1/2">
          <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Search a stock
          </h1>
        </div>
        <div className=" flex w-full gap-4 md:w-1/2">
          <MainSearch className="w-full" submitCallback={handleSubmit} />
        </div>
        {searched && (
          <div className="flex w-full gap-4 md:w-1/2">
            <SearchResults
              className="w-full"
              loading={loading}
              resultItems={results}
            />
          </div>
        )}
      </section>
    </div>
  )
}
