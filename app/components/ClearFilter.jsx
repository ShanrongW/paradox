"use client"

import { useRouter } from "next/navigation"

export default function ClearFilter() {
  const router = useRouter()

  function clearFilter() {
    router.replace("/charts")
  }

  return <button onClick={clearFilter}>Clear</button>
}