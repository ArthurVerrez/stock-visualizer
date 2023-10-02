"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSearch } from "@/services/finance"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PopularResults({}) {
  return (
    <>
      <h4 className="mb-4 text-sm font-medium leading-none">Popular</h4>
      <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Link key={i} href={`https://github.com`}>
            <Card className="hover:bg-secondary">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Apple, Inc.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">APPL</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
