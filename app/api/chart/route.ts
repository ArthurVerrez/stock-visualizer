import yahooFinance from 'yahoo-finance2';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
  try {
    const ticker: string | null = request.nextUrl.searchParams.get('ticker');

    if (!ticker) {
      return NextResponse.json(
        { message: 'Ticker key is missing' },
        { status: 400 }
      );
    }
    const queryOptions = { period1: '2023-01-01', /* ... */ };
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
