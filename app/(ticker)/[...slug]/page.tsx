import { toast } from "@/components/ui/use-toast"

interface TickerPageProps {
  params: {
    slug: string[]
  }
}

const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/quote-summary`

async function getTickerData(ticker: string) {
  try {
    const response = await fetch(`${apiUrl}?ticker=${ticker}`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    console.log(response)
    const data = response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error("Fetch failed: ", error)
    toast({
      title: "Error getting search results",
      description:
        "There was an error getting search results. Please try again later.",
    })
  }
}

export default async function TickerPage({ params }: TickerPageProps) {
  console.log("Hey")
  const ticker = params?.slug?.join("/")
  const tickerData = await getTickerData(ticker)

  return (
    <div>
      <article className="container max-w-3xl py-6 lg:py-12">
        <div className="space-y-4">
          <h1 className="font-heading inline-block text-4xl lg:text-5xl">
            {ticker}
          </h1>

          <code>
            <pre>{JSON.stringify(tickerData, null, 2)}</pre>
          </code>
        </div>
      </article>
    </div>
  )
}
