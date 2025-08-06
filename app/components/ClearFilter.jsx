"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function ClearFilter() {
  const router = useRouter()

  function clearFilter() {
    router.replace("/charts")
  }

  return <Button variant="ghost" onClick={clearFilter} className="cursor-pointer">Clear</Button>
}