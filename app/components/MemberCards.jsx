"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import Image from "next/image";


export default function MemberCards({item}) {

  return (
    <Card className="w-[375px] ">
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <Image src={`/${item.class.toLowerCase()}.webp`} width={20} height={20} alt="class icon"/>
          {item.name}
        </CardTitle>
        <CardDescription>
          {item.type} • {item.class}
        </CardDescription>
        <CardAction>
          <Link href={`/statistics/member/${item.id}`}><Button variant="link">View Statistics</Button></Link>
        </CardAction>
      </CardHeader>
    </Card>
  )
  
}