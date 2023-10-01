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

export default async function TickerPage({ params }: TickerPageProps) {
  return (
    <div>
      <section className="container mx-auto flex min-w-[400px] flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
        <div className="w-full flex-1 space-y-4 pt-6">Loading...</div>
      </section>
    </div>
  )
}
