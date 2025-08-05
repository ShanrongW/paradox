"use client"

import { Protect } from "@clerk/nextjs"
import { calculatePowerGains } from "../utils/calculatePowerGains";
import { getType } from "../utils/getType";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



export default function ManagePage() {

  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    // Fetch data initially
    async function fetchData() {
      const supabase = await createClient();
      const { data, error } = await supabase.from('members').select('*');
      if (error) console.error('Error fetching data:', error.message);
      else setFullData(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (recordId) => {
    const supabase = await createClient()
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', recordId);

    if (error) {
      console.error('Error deleting record:', error.message);
    } else {
      // Update the UI after deletion
      setFullData(prevData => prevData.filter(item => item.id !== recordId));
    }
  };

  const completeData = fullData.map(item => {
    return {
      discord: item.discord,
      id: item.id,
      name: item.in_game_name,
      class: item.class,
      gains: calculatePowerGains(item.power),
      power: item.power[item.power.length - 1],
      type: getType(item.class)
    }}
  )

  const cards = completeData.map(item => {
    return (
      <Card className="w-[375px]" key={item.id}>
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <Image src={`/${item.class.toLowerCase()}.webp`} width={30} height={30} alt="class icon"/>
          {item.name}
        </CardTitle>
        <CardDescription>
          <div>{item.type} • {item.class}</div>
          <div>Discord: {item.discord}</div>
        </CardDescription>
        <CardAction className="flex flex-col gap-4">
          <Button variant="secondary" className="cursor-pointer" onClick>Edit</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="cursor-pointer">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this member
                  and remove this data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button onClick={() => handleDelete(item.id)} className="cursor-pointer">Delete</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardAction>
      </CardHeader>
    </Card>
    )
  })

  return (
    <Protect>
      <main className="flex flex-wrap">
        {cards}
      </main>
    </Protect>
  )
}