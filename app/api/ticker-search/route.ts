import yahooFinance from 'yahoo-finance2';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  
  try {
    const searchKey: string | null = request.nextUrl.searchParams.get('search');

    if (!searchKey) {
      return NextResponse.json(
        { message: 'Search key is missing' },
        { status: 400 }
      );
    }

    const results = await yahooFinance.search(searchKey);
    var filteredTickers = results.quotes.map((quote: any) => ({
      ticker:quote.symbol,
      name:quote.shortname
    }));

    // exclude results without a ticker or name
    filteredTickers=filteredTickers.filter((ticker) => ticker.ticker && ticker.name);
    console.log(filteredTickers)
    return NextResponse.json(
      filteredTickers,
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: 'Error fetching data from Yahoo Finance', error: err },
      { status: 500 }
    );
  }
}
