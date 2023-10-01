import useSWR from 'swr';
import { fetcher } from '@/lib/utils';

export const useSearch = (value: string | null) => {
    const { data, error } = useSWR(value ? `/api/search?query=${value}` : null, fetcher);
    return {
      tickers: data?.tickers,
      isLoading: !error && !data,
      isError: error,
    };
  };
  
export const useHistorical = (ticker: string | null) => {
        const { data, error } = useSWR(ticker ? `/api/historical?ticker=${ticker}` : null, fetcher);
        return {
        historical: data,
        isLoading: !error && !data,
        isError: error,
        };
    }

export const useQuoteSummary = (ticker: string | null) => {
    const { data, error } = useSWR(ticker ? `/api/quote-summary?ticker=${ticker}` : null, fetcher);
    return {
    quoteSummary: data,
    isLoading: !error && !data,
    isError: error,
    };
}