interface TickerPageProps {
  params: {
    slug: string[]
  }
}

export default async function TickerPage({ params }: TickerPageProps) {
  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      <div className="space-y-4">
        <h1 className="font-heading inline-block text-4xl lg:text-5xl">Hey</h1>
      </div>
      <hr className="my-4" />
    </article>
  )
}
