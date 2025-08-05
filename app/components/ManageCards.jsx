"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from 'react';
import { createClient } from "@/lib/supabase/client";


export default function ManageCards({completeData, deleteMember}) {

  const cards = completeData.map(item => {
    return (
      <Card className="w-[375px]" key={item.id}>
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <Image src={`/${item.class.toLowerCase()}.webp`} width={20} height={20} alt="class icon"/>
          {item.name}
        </CardTitle>
        <CardDescription>
          <div>{item.type} • {item.class}</div>
          <div>Discord: {item.discord}</div>
        </CardDescription>
        <CardAction>
          <Button variant="destructive" onClick={() => deleteMember(item.id)}>Delete</Button>
        </CardAction>
      </CardHeader>
    </Card>
    )
  })

  return cards
}

