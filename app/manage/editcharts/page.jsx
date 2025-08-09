"use client"

import { createClient } from "@/lib/supabase/client";
import EditTable from "@/app/manage/editcharts/EditTable"
import { columns } from "@/app/manage/editcharts/Columns";
import { getType } from "@/app/utils/getType";
import { useEffect, useState } from "react";
import { Protect } from "@clerk/nextjs";

export default function EditPage() {
  const [data, setData] = useState(null)
  const [fullData, setFullData] = useState(null)

  useEffect(() => {
    // Fetch data initially
    async function fetchData() {
      const supabase = await createClient();
      const { data, error } = await supabase.from('members').select().order('id', {ascending: true});
      if (error) console.error('Error fetching data:', error.message);
      else {
        const completeData = data.map(item => {
          return {
            id: item.id,
            name: item.in_game_name,
            class: item.class,
            power: item.power[item.power.length - 1] ?? '',
            type: getType(item.class)
          };
        })
        setData(data)
        setFullData(completeData)
      }
    }
    fetchData();
  }, []);

  return (
    <Protect>
      <div className="container mx-auto py-10">
        {
          fullData ? <EditTable columns={columns} data={data} rawData={data}/> : ""
        } 
      </div>
    </Protect>
  )
}