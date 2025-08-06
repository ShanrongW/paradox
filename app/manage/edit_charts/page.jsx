"use client"

import { createClient } from "@/lib/supabase/client";
import EditTable from "@/app/manage/edit_charts/EditTable"
import { columns } from "@/app/manage/edit_charts/Columns";
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
      const { data, error } = await supabase.from('members').select('*');
      if (error) console.error('Error fetching data:', error.message);
      else setData(data);
    }
    fetchData();
  }, []);

  
  useEffect(() => {
    if (data !== null) {
      const completeData = data.map(item => {
        return {
          id: item.id,
          name: item.in_game_name,
          class: item.class,
          power: item.power[item.power.length - 1]?.toLocaleString?.() ?? '',
          type: getType(item.class)
        };
      })
      setFullData(completeData)
    }
  }, [data])

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