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

interface StockPriceChartProps {
  data: { date: Date; close: number }[]
}

export function StockPriceChart({ data }: StockPriceChartProps) {
  const maxTicks = 10
  const calculatedInterval = Math.ceil(data.length / maxTicks)
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval={calculatedInterval}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => (value == 0 ? "" : formatCurrency(value))}
        />
        <Tooltip
          contentStyle={{ background: "black" }}
          formatter={(value: number) => formatCurrency(value)}
        />
        <Bar dataKey="close" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
