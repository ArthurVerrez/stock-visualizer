"use client"

import React, { useEffect, useState } from "react"
import { useHistorical, useQuoteSummary, useSearch } from "@/services/finance"
import { BsCurrencyDollar, BsWater } from "react-icons/bs"

import { Financials } from "@/lib/Financials"
import {
  formatCurrency,
  formatLargeCurrency,
  formatLargeNumber,
} from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StockPriceChart } from "@/components/stock-price-chart"

interface TickerPageProps {
  params: {
    slug: string[]
  }
}

export default function TickerPage({ params }: TickerPageProps) {
  const ticker = params?.slug?.join("/")
  const { historical } = useHistorical(ticker)
  const { quoteSummary } = useQuoteSummary(ticker)

  const [financials, setFinancials] = useState<Financials>()

  useEffect(() => {
    if (quoteSummary) {
      setFinancials(Financials.fromRawData(quoteSummary))
    }
  }, [quoteSummary])

  useEffect(() => {
    // Modify historical data here if needed
  }, [historical])

  if (!financials || !historical) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <section className="container mx-auto flex min-w-[400px] flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
        <div className="w-full flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h1 className="tracking-tight">
              <span className="mr-3 text-3xl font-bold">
                {financials.shortName}
              </span>

              <span className="text-2xl">({financials.ticker})</span>
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
                      {formatCurrency(financials.bid, financials.currency)}
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
                      {formatCurrency(financials.open, financials.currency)}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p> */}
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
                      {formatLargeCurrency(
                        financials.marketCap,
                        financials.currency
                      )}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p> */}
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
                      {formatLargeNumber(financials.volume)}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p> */}
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Price</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <StockPriceChart data={historical} />
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
