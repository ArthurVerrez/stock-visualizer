import { NextResponse, type NextRequest } from "next/server"

import { yahooFinance } from "@/lib/yahooFinance"

export async function GET(request: NextRequest) {
  try {
    const count: number =
      parseInt(request.nextUrl.searchParams.get("count") || "", 10) || 4

    const results = await yahooFinance.screener({
      scrIds: "day_gainers",
      count,
    })

    return NextResponse.json(results, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching data from Yahoo Finance", error: err },
      { status: 500 }
    )
  }
}
