"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { useChart, useQuoteSummary } from "@/services/finance"
import { subDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { BsCurrencyDollar, BsWater } from "react-icons/bs"

import { Financials } from "@/lib/Financials"
import {
  formatCurrency,
  formatLargeCurrency,
  formatLargeNumber,
} from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { StockPriceChart } from "@/components/stock-price-chart"

interface TickerPageProps {
  params: {
    slug: string[]
  }
}

export default function TickerPage({ params }: TickerPageProps) {
  const ticker = params?.slug?.join("/")

  const [chartDate, chartSetDate] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const {
    chart,
    isLoading: isLoadingChart,
    isError: isErrorChart,
  } = useChart(ticker, chartDate.from, chartDate.to)
  const {
    quoteSummary,
    isLoading: isLoadingQuote,
    isError: isErrorQuote,
  } = useQuoteSummary(ticker)

  const [financials, setFinancials] = useState<Financials>(Financials.empty())

  useEffect(() => {
    if (quoteSummary) {
      setFinancials(Financials.fromRawData(quoteSummary))
    }
  }, [quoteSummary])

  if (isErrorChart || isErrorQuote) {
    return (
      <div>
        <section className="container mx-auto flex min-w-[400px] flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
          <div className="w-full flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h1 className="tracking-tight">
                Error getting the data for the ticker
              </h1>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      <section className="container mx-auto flex min-w-[400px] flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
        <div className="w-full flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h1 className="tracking-tight">
              <span className="mr-3 text-3xl font-bold">
                {isLoadingQuote ? (
                  <Skeleton className="h-6 w-[250px]" />
                ) : (
                  financials.shortName
                )}
              </span>
              {isLoadingQuote ? null : (
                <span className="text-2xl">({financials.ticker})</span>
              )}
            </h1>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                AI Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Stock Price
                    </CardTitle>

                    <BsCurrencyDollar />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoadingQuote ? (
                        <Skeleton className="h-6 w-10/12" />
                      ) : (
                        formatCurrency(
                          financials.regularMarketPrice,
                          financials.currency
                        )
                      )}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open</CardTitle>
                    <BsCurrencyDollar />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoadingQuote ? (
                        <Skeleton className="h-6 w-10/12" />
                      ) : (
                        formatCurrency(financials.open, financials.currency)
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Market Capitalization
                    </CardTitle>
                    <BsCurrencyDollar />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoadingQuote ? (
                        <Skeleton className="h-6 w-10/12" />
                      ) : (
                        formatLargeCurrency(
                          financials.marketCap,
                          financials.currency
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Volume
                    </CardTitle>
                    <BsWater />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoadingQuote ? (
                        <Skeleton className="h-6 w-10/12" />
                      ) : (
                        formatLargeNumber(financials.volume)
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader className="items-center justify-between space-y-2 pb-2 md:flex md:flex-row">
                    <CardTitle>Price</CardTitle>
                    <DatePickerWithRange
                      date={chartDate}
                      setDate={chartSetDate}
                    />
                  </CardHeader>
                  <CardContent className="pl-2">
                    {isLoadingChart ? (
                      <Skeleton className="ml-3 mr-1 h-20 w-full" />
                    ) : (
                      <div>
                        <StockPriceChart data={chart} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
