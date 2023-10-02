"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useDailyGainers } from "@/services/finance"
import { is } from "date-fns/locale"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PopularResults({}) {
  const { dailyGainers, isLoading, isError } = useDailyGainers(4)
  if (isLoading || isError || !dailyGainers?.quotes?.length) {
    return null
  }
  return (
    <>
      <h4 className="mb-4 text-sm font-medium leading-none">Popular</h4>
      <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-2">
        {dailyGainers.quotes.map((stock: any) => (
          <Link key={stock.symbol} href={`/${stock.symbol}`}>
            <Card className="hover:bg-secondary">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  {stock.shortName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stock.symbol}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
