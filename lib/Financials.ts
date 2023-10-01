type RawSummaryDetail = {
    previousClose: number;
    open: number;
    dayLow: number;
    dayHigh: number;
    marketCap: number;
  };
  
  type RawPrice = {
    regularMarketPrice: number;
    symbol: string;
    exchange: string;
    exchangeName: string;
    quoteSourceName: string;
    shortName: string;
    longName: string;
    currency: string;
    marketCap: number;
    averageVolume: number;
  };
  
  type RawData = {
    summaryDetail: RawSummaryDetail;
    price: RawPrice;
  };
  
  export class Financials {
    ticker: string;
    exchange: string;
    exchangeName: string;
    quoteSourceName: string;
    shortName: string;
    longName: string;
    currency: string;
    marketCap: number;
    averageVolume: number;
    dayLow: number;
    dayHigh: number;
    open: number;
  
    constructor({
      ticker,
      exchange,
      exchangeName,
      quoteSourceName,
      shortName,
      longName,
      currency,
      marketCap,
      averageVolume,
      dayLow,
      dayHigh,
      open,
    }: {
      ticker: string;
      exchange: string;
      exchangeName: string;
      quoteSourceName: string;
      shortName: string;
      longName: string;
      currency: string;
      marketCap: number;
      averageVolume: number;
      dayLow: number;
      dayHigh: number;
      open: number;
    }) {
      this.ticker = ticker;
      this.exchange = exchange;
      this.exchangeName = exchangeName;
      this.quoteSourceName = quoteSourceName;
      this.shortName = shortName;
      this.longName = longName;
      this.currency = currency;
      this.marketCap = marketCap;
      this.averageVolume = averageVolume;
      this.dayLow = dayLow;
      this.dayHigh = dayHigh;
      this.open = open;
    }
  
    static fromRawData(rawData: RawData): Financials {
      return new Financials({
        ticker: rawData.price.symbol,
        exchange: rawData.price.exchange,
        exchangeName: rawData.price.exchangeName,
        quoteSourceName: rawData.price.quoteSourceName,
        shortName: rawData.price.shortName,
        longName: rawData.price.longName,
        currency: rawData.price.currency,
        marketCap: rawData.price.marketCap,
        averageVolume: rawData.price.averageVolume,
        dayLow: rawData.summaryDetail.dayLow,
        dayHigh: rawData.summaryDetail.dayHigh,
        open: rawData.summaryDetail.open,
      });
    }
  }
