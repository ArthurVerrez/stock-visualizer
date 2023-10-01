interface TickerPageProps {
  params: {
    slug: string[]
  }
}

export default function TickerPage({ params }: TickerPageProps) {
  const ticker = params?.slug?.join("/")
  return (
    <div>
      <article className="container max-w-3xl py-6 lg:py-12">
        <div className="space-y-4">
          <h1 className="font-heading inline-block text-4xl lg:text-5xl">
            {ticker}
          </h1>
        </div>
      </article>
    </div>
  )
}
