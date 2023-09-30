import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function GET(request: NextRequest) {

    const exampleResults = Array.from({ length: 5 }, (_, i) => ({
        name: `company${i}`,
        ticker: `ticker${i}`,
        description: `I am a description for company${i}`,
        image: "https://github.com/ArthurVerrez.png",
      }))

  return NextResponse.json(
    {
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
      results: exampleResults,
    },
    {
      status: 200,
    },
  );
}