import { BsCurrencyDollar, BsWater } from "react-icons/bs"

import { Financials } from "@/lib/Financials"
import {
  formatCurrency,
  formatLargeCurrency,
  formatLargeNumber,
} from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { StockPriceChart } from "@/components/stock-price-chart"

interface TickerPageProps {
  params: {
    slug: string[]
  }
}

const summaryApiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/quote-summary`
const historicalApiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/historical`

async function getTickerData(ticker: string) {
  try {
    const response = await fetch(`${summaryApiUrl}?ticker=${ticker}`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    console.log(response)
    const data = response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error("Fetch failed: ", error)
    toast({
      title: "Error getting search results",
      description:
        "There was an error getting search results. Please try again later.",
    })
  }
}

async function getHistoricalData(ticker: string) {
  console.log("getHistoricalData")
  try {
    const response = await fetch(`${historicalApiUrl}?ticker=${ticker}`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error("Fetch failed: ", error)
    toast({
      title: "Error getting search results",
      description:
        "There was an error getting search results. Please try again later.",
    })
  }
}

// Create fake data with 20 items, a list of objects with date and a number close

const fakeData = Array.from({ length: 20 }, (_, i) => ({
  date: new Date(2021, 0, i + 1),
  close: Math.random() * 100,
}))

export default async function TickerPage({ params }: TickerPageProps) {
  const ticker = params?.slug?.join("/")

  const tickerData = await getTickerData(ticker)
  const financials = Financials.fromRawData(tickerData)
  var historicalData = await getHistoricalData(ticker)

  historicalData = historicalData.map((item: any) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString(),
  }))

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
                    <StockPriceChart data={historicalData} />
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
