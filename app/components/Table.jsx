import { createClient } from "@/lib/supabase/server";
import { DataTable } from "@/components/ui/DataTable";
import { columns } from "../charts/columns";
import { calculatePowerGains } from "@/app/utils/calculatePowerGains";
import { getType } from "@/app/utils/getType";

export default async function TableUtils({searchParams}) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("members")
    .select()
    .order("power", {ascending: true});

  const completeData = data.map(item => {
    if (searchParams.type === undefined || searchParams.type === getType(item.class).toLowerCase()) {
      return {
        id: item.id,
        name: item.in_game_name,
        class: item.class,
        gains: calculatePowerGains(item.power).toLocaleString(),
        power: item.power[item.power.length - 1].toLocaleString(),
        type: getType(item.class)
      };
    }
  }).filter(item => item)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={completeData} />
    </div>
  )
}