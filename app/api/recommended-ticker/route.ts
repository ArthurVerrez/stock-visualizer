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
    var results = await yahooFinance.recommendationsBySymbol(ticker);

    return NextResponse.json(
      results,
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(s
      { message: 'Error fetching data from Yahoo Finance', error: err },
      { status: 500 }
    );
  }
}