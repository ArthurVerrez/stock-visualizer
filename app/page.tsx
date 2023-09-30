"use client"

import Link from "next/link"
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons"
import { BsApple, BsGoogle, BsMicrosoft } from "react-icons/bs"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export default function IndexPage() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center gap-2 md:w-1/2">
        <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Search a stock
        </h1>
      </div>
      <div className="flex w-full gap-4 md:w-1/2">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a company name or ticker..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <BsMicrosoft className="mr-2 h-4 w-4" />
                <span>Microsoft (MSFT)</span>
              </CommandItem>
              <CommandItem>
                <BsGoogle className="mr-2 h-4 w-4" />
                <span>Google (GOOG)</span>
              </CommandItem>
              <CommandItem>
                <BsApple className="mr-2 h-4 w-4" />
                <span>Apple (AAPL)</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </section>
  )
}
