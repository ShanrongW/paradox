"use client"

import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export const columns = [
  {
    accessorKey: "in_game_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "class",
    header: "Class"
  },
  {
    accessorKey: "power",
    header: "Power",
    cell: ({ row }) => {
      const powerArr = row.original.power;
      return Array.isArray(powerArr) && powerArr.length > 0
        ? powerArr[powerArr.length - 1].toLocaleString()
        : '';
    }
  }
]
