"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { ScrollArea } from "./ui/scroll-area"

interface StockPriceChartProps {
  data: any
}

function CardTooltip({ payload, label, active, currency }: any) {
  if (active) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            {new Date(label).toLocaleDateString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {payload ? formatCurrency(payload[0].value, currency) : ""}
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}

export function StockPriceChart({ data }: StockPriceChartProps) {
  // If the screen is md or larger, we want to show a max of 5 ticks
  // If the screen is sm or smaller, we want to show a max of 3 ticks
  const maxTicks = window.innerWidth >= 768 ? 5 : 3
  const calculatedInterval = Math.ceil(data?.quotes?.length / maxTicks)
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data?.quotes}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval={calculatedInterval}
          tickFormatter={(date) => new Date(date).toLocaleDateString()}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            value == 0 ? "" : formatCurrency(value, data?.meta?.currency, 0)
          }
        />
        <Tooltip
          formatter={(value: number) =>
            formatCurrency(value, data?.meta?.currency)
          }
          labelFormatter={(date) => new Date(date).toLocaleDateString()}
          content={<CardTooltip currency={data?.meta?.currency} />}
        />
        <Bar dataKey="close" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
