import yahooFinance from 'yahoo-finance2';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const TEMP_DATA={
  "summaryDetail": {
    "maxAge": 1,
    "priceHint": 2,
    "previousClose": 133.13,
    "open": 134.08,
    "dayLow": 131.32,
    "dayHigh": 134.88,
    "regularMarketPreviousClose": 133.13,
    "regularMarketOpen": 134.08,
    "regularMarketDayLow": 131.32,
    "regularMarketDayHigh": 134.88,
    "payoutRatio": 0,
    "beta": 1.05982,
    "trailingPE": 28.173079,
    "forwardPE": 19.85693,
    "volume": 22066481,
    "regularMarketVolume": 22066481,
    "averageVolume": 21881473,
    "averageVolume10days": 18779620,
    "averageDailyVolume10Day": 18779620,
    "bid": 131.78,
    "ask": 132,
    "bidSize": 900,
    "askSize": 800,
    "marketCap": 1655416422400,
    "fiftyTwoWeekLow": 83.45,
    "fiftyTwoWeekHigh": 139.93,
    "priceToSalesTrailing12Months": 5.7175794,
    "fiftyDayAverage": 132.2198,
    "twoHundredDayAverage": 112.63587,
    "trailingAnnualDividendRate": 0,
    "trailingAnnualDividendYield": 0,
    "currency": "USD",
    "fromCurrency": null,
    "toCurrency": null,
    "lastMarket": null,
    "coinMarketCapLink": null,
    "algorithm": null,
    "tradeable": false
  },
  "price": {
    "maxAge": 1,
    "preMarketSource": "FREE_REALTIME",
    "postMarketChangePercent": -0.00023064701,
    "postMarketChange": -0.0304108,
    "postMarketTime": "2023-09-29T23:59:47.000Z",
    "postMarketPrice": 131.82,
    "postMarketSource": "FREE_REALTIME",
    "regularMarketChangePercent": -0.009614653,
    "regularMarketChange": -1.2799988,
    "regularMarketTime": "2023-09-29T20:00:02.000Z",
    "priceHint": 2,
    "regularMarketPrice": 131.85,
    "regularMarketDayHigh": 134.88,
    "regularMarketDayLow": 131.32,
    "regularMarketVolume": 22066481,
    "averageDailyVolume10Day": 18779620,
    "averageDailyVolume3Month": 21881473,
    "regularMarketPreviousClose": 133.13,
    "regularMarketSource": "FREE_REALTIME",
    "regularMarketOpen": 134.08,
    "exchange": "NMS",
    "exchangeName": "NasdaqGS",
    "exchangeDataDelayedBy": 0,
    "marketState": "CLOSED",
    "quoteType": "EQUITY",
    "symbol": "GOOG",
    "underlyingSymbol": null,
    "shortName": "Alphabet Inc.",
    "longName": "Alphabet Inc.",
    "currency": "USD",
    "quoteSourceName": "Nasdaq Real Time Price",
    "currencySymbol": "$",
    "fromCurrency": null,
    "toCurrency": null,
    "lastMarket": null,
    "marketCap": 1655416422400
  }
}

export async function GET(request: NextRequest) {
  try {
    const ticker: string | null = request.nextUrl.searchParams.get('ticker');

    if (!ticker) {
      return NextResponse.json(
        { message: 'Ticker key is missing' },
        { status: 400 }
      );
    }

    //const results = await yahooFinance.quoteSummary(ticker);
    const results=TEMP_DATA;

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
