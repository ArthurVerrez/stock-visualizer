import useSWR from "swr"

import { fetcher } from "@/lib/utils"

export const useSearch = (value: string | null) => {
  const { data, error, isLoading } = useSWR(
    value ? `/api/ticker-search?search=${value}` : null,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return {
    tickers: data,
    isLoading: isLoading,
    isError: error,
  }
}

export const useHistorical = (ticker: string | null) => {
  const { data, error, isLoading } = useSWR(
    ticker ? `/api/historical?ticker=${ticker}` : null,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return {
    historical: data,
    isLoading: isLoading,
    isError: error,
  }
}

export const useChart = (
  ticker: string | null,
  dateStart: Date = new Date(2023, 1, 1),
  dateEnd: Date = new Date()
) => {
  const { data, error, isLoading } = useSWR(
    ticker
      ? `/api/chart?ticker=${ticker}&periodStart=${
          dateStart.toISOString().split("T")[0]
        }&periodEnd=${dateEnd.toISOString().split("T")[0]}`
      : null,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return {
    chart: data,
    isLoading: isLoading,
    isError: error,
  }
}

export const useQuoteSummary = (ticker: string | null) => {
  const { data, error, isLoading } = useSWR(
    ticker ? `/api/quote-summary?ticker=${ticker}` : null,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return {
    quoteSummary: data,
    isLoading: isLoading,
    isError: error,
  }
}

export const useDailyGainers = (count: number = 4) => {
  const { data, error, isLoading } = useSWR(
    `/api/daily-gainers?count=${count}`,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return {
    dailyGainers: data,
    isLoading: isLoading,
    isError: error,
  }
}
