import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  precision: number = 2
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(amount)
}

export const formatLargeCurrency = (
  amount: number,
  currency: string = "USD"
) => {
  let abbreviation = ""
  let divisor = 1

  if (amount >= 1_000_000_000_000) {
    abbreviation = "T"
    divisor = 1_000_000_000_000
  } else if (amount >= 1_000_000_000) {
    abbreviation = "B"
    divisor = 1_000_000_000
  } else if (amount >= 1_000_000) {
    abbreviation = "M"
    divisor = 1_000_000
  }

  const formattedAmount = (amount / divisor).toFixed(2)
  return `${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(1)}${formattedAmount.slice(1)} ${abbreviation}`
}

export const formatLargeNumber = (num: number): string => {
  let suffix = ""
  let divisor = 1

  if (Math.abs(num) >= 1_000_000_000_000) {
    suffix = "T"
    divisor = 1_000_000_000_000
  } else if (Math.abs(num) >= 1_000_000_000) {
    suffix = "B"
    divisor = 1_000_000_000
  } else if (Math.abs(num) >= 1_000_000) {
    suffix = "M"
    divisor = 1_000_000
  } else if (Math.abs(num) >= 1_000) {
    suffix = "K"
    divisor = 1_000
  }

  const formattedNumber = (num / divisor).toFixed(2)
  return `${formattedNumber} ${suffix}`
}

export const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url)

  if (res.status != 200) {
    throw new Error(`A ${res.status} error occurred while fetching the data.`) // Throw the error
  }

  return res.json()
}
