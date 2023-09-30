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
import { MainSearch } from "@/components/main-search"
import { SearchResults } from "@/components/search-results"

export default function IndexPage() {
  return (
    <section className="container mx-auto flex min-w-[400px] flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center gap-2 md:w-1/2">
        <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Search a stock
        </h1>
      </div>
      <div className=" flex w-full gap-4 md:w-1/2">
        <MainSearch className="w-full" />
      </div>
      <div className="flex w-full gap-4 md:w-1/2">
        <SearchResults className="w-full" />
      </div>
    </section>
  )
}
