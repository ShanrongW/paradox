import { Protect } from "@clerk/nextjs"
import { createClient } from "@/lib/supabase/server"
import { calculatePowerGains } from "../utils/calculatePowerGains";
import { getType } from "../utils/getType";
import ManageCards from "../components/ManageCards";


export default async function ManagePage() {

  const supabase = await createClient();
    const { data } = await supabase
      .from("members")
      .select()

  const completeData = data.map(item => {
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



  

  return (
    <Protect>
      <main className="flex flex-wrap">
        <ManageCards completeData={completeData}/>
      </main>
    </Protect>
  )
}