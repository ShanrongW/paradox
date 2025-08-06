"use client"

import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function FilterButton({character}) {

  const router = useRouter()
  const searchParams = useSearchParams()

  function handleClick() {
    router.replace(`/charts?type=${character.toLowerCase()}`)
  }

  let className = "border-2 cursor-pointer "

  if (character === "Tank") {
    className += searchParams.get("type")===character.toLowerCase() 
      ? `bg-[#d90202] text-white border-black hover:bg-gray-50 hover:text-[#d90202]` 
      : `bg-white text-[#d90202] border-[#d90202] hover:bg-red-50`
  } else if (character === "DPS") {
    className += searchParams.get("type")===character.toLowerCase() 
      ? `bg-[#0325ab] text-white border-black hover:bg-gray-50 hover:text-[#0325ab]` 
      : `bg-white text-[#0325ab] border-[#0325ab] hover:bg-blue-50`
  } else if (character === "Healer") {
    className += searchParams.get("type")===character.toLowerCase() 
      ? `bg-[#05a61a] text-white border-black hover:bg-gray-50 hover:text-[#05a61a]` 
      : `bg-white text-[#05a61a] border-[#05a61a] hover:bg-green-50`
  } else {
    return 
  }

  return (
    <Button
      onClick={handleClick}
      className={
        className
      }
    >
      {character}
    </Button>
  )
}