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
      exchange:quote.exchange, 
      shortname:quote.shortname, 
      quoteType:quote.quoteType, 
      symbol:quote.symbol, 
      index:quote.index,
      score:quote.score,
      typeDisp:quote.typeDisp,
      longname:quote.longname,
      description:quote.longname,
      ticker:quote.symbol,
      name:quote.shortname, 
      image: "https://github.com/ArthurVerrez.png",
    }));

    // exclude results without a ticker or name
    filteredTickers=filteredTickers.filter((ticker) => ticker.ticker && ticker.name);

    return NextResponse.json(
      {
        body: request.body,
        path: request.nextUrl.pathname,
        query: request.nextUrl.search,
        cookies: request.cookies.getAll(),
        results: filteredTickers,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: 'Error fetching data from Yahoo Finance', error: err },
      { status: 500 }
    );
  }
}
