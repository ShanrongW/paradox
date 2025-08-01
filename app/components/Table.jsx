import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createClient } from "@/lib/supabase/client";

export default async function TableUtils({searchParams}) {
  const supabase = await createClient();
  const { data } = await supabase.from("members").select();

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Power</TableHead>
          <TableHead>Power Gains</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => {
          if (searchParams.type === undefined || searchParams.type === getType(item.class).toLowerCase()) {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.in_game_name}</TableCell>
                <TableCell>{item.class}</TableCell>
                <TableCell>{getType(item.class)}</TableCell>
                <TableCell>{item.power[item.power.length - 1]}</TableCell>
                <TableCell>{calculatePowerGains(item.power)}</TableCell>
              </TableRow>
        )}
          
          })}
      </TableBody>
    </Table>
  )
}