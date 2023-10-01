import useSWR from "swr"

import { fetcher } from "@/lib/utils"

export const useSearch = (value: string | null) => {
  const { data, error, isLoading } = useSWR(
    value ? `/api/ticker-search?search=${value}` : null,
    fetcher
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
    fetcher
  )
  return {
    historical: data,
    isLoading: isLoading,
    isError: error,
  }
}

export const useChart = (ticker: string | null) => {
  const { data, error, isLoading } = useSWR(
    ticker ? `/api/chart?ticker=${ticker}` : null,
    fetcher
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
    fetcher
  )
  return {
    quoteSummary: data,
    isLoading: isLoading,
    isError: error,
  }
}
