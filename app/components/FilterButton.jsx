"use client"

import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

export default function FilterButton({character}) {

  const router = useRouter()
  const searchParams = useSearchParams()

  function handleClick() {
    router.replace(`/charts?type=${character.toLowerCase()}`)
  }

  let className = "border-2 rounded-2xl px-2.5 py-0.5 "

  if (character === "Tank") {
    className += searchParams.get("type")===character.toLowerCase() 
      ? `bg-[#d90202] text-white border-black` 
      : `bg-white text-[#d90202] border-[#d90202]`
  } else if (character === "DPS") {
    className += searchParams.get("type")===character.toLowerCase() 
      ? `bg-[#0325ab] text-white border-black` 
      : `bg-white text-[#0325ab] border-[#0325ab]`
  } else if (character === "Healer") {
    className += searchParams.get("type")===character.toLowerCase() 
      ? `bg-[#05a61a] text-white border-black` 
      : `bg-white text-[#05a61a] border-[#05a61a]`
  } else {
    return 
  }

  return (
    <button
      onClick={handleClick}
      className={
        className
      }
    >
      {character}
    </button>
  )
}