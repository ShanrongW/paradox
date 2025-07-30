import { createClient } from "@/lib/supabase/client";
import {TableRow} from "../components/TableRow";

export default async function Charts() {
  const supabase = await createClient();
  const { data } = await supabase.from("members").select();

  const tableElement = data.map(item => {
    return (
      <TableRow 
        key={item.id}
        discord={item.discord} 
        inGameName={item.in_game_name} 
        characterClass={item.class}
        power={item.power}
      />
    )
  })

  return (
    tableElement
  )
}