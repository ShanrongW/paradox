import { createClient } from "@/lib/supabase/client";
import { DataTable } from "@/components/ui/DataTable";
import { columns } from "../charts/columns";

export default async function TableUtils({searchParams}) {
  const supabase = await createClient();
  const { data } = await supabase.from("members").select();

  const completeData = data.map(item => {
    if (searchParams.type === undefined || searchParams.type === getType(item.class).toLowerCase()) {
      return {
        name: item.in_game_name,
        class: item.class,
        gains: calculatePowerGains(item.power).toLocaleString(),
        power: item.power[item.power.length - 1].toLocaleString(),
        type: getType(item.class)
      };
    }
  }).filter(item => item)

  function getType(characterClass) {
    const character = characterClass.toLowerCase()
    if (character === 'gladiator' || character === 'warrior') {
      return 'Tank'
    } else if (character === 'druid' || character === 'shaman') {
      return 'Healer'
    } else if (character === 'assassin' || character === 'hunter' || character === 'mage' || character === 'warlock') {
      return 'DPS'
    } else {
      return 'null'
    }
  }

  function calculatePowerGains(powerArray) {
    if (powerArray.length < 2) {
      return 0
    } else {
      const currentPower = powerArray[powerArray.length - 1]
      const pastPower = powerArray[powerArray.length - 2]
      return currentPower - pastPower
    }
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={completeData} />
    </div>
  )
}