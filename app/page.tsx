"use client"

import { useState } from "react"

import { MainSearch } from "@/components/main-search"
import { SearchResults } from "@/components/search-results"

export default function IndexPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const exampleResults = Array.from({ length: 5 }, (_, i) => ({
    name: `company${i}`,
    ticker: `ticker${i}`,
    description: `I am a description for company${i}`,
    image: "https://github.com/ArthurVerrez.png",
  }))

  const [searched, setSearched] = useState(false)

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setSearched(true)
    setLoading(true)
    setTimeout(() => {
      setResults(exampleResults)
      setLoading(false)
    }, 1000)
  }

  return (
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
  )
}
