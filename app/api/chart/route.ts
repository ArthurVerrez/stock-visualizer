import yahooFinance from 'yahoo-finance2';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
  try {
    const ticker: string | null = request.nextUrl.searchParams.get('ticker');
    const periodStart: string | null = request.nextUrl.searchParams.get('periodStart') || '2023-01-01';
    const periodEnd: string | null = request.nextUrl.searchParams.get('periodEnd') || new Date().toISOString().split('T')[0];

    if (!ticker) {
      return NextResponse.json(
        { message: 'Ticker key is missing' },
        { status: 400 }
      );
    }
    const queryOptions = { period1: periodStart, period2: periodEnd };
    var results = await yahooFinance.chart(ticker, queryOptions);

    return NextResponse.json(
      results,
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: 'Error fetching data from Yahoo Finance', error: err },
      { status: 500 }
    );
  }
}
