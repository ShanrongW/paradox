
import { createClient } from "@/lib/supabase/server";
import { calculatePowerGains } from "@/app/utils/calculatePowerGains";
import MemberCards from "@/app/components/MemberCards";
import { getType } from "@/app/utils/getType";

export default async function MemberPage() {

  const supabase = await createClient();
  const { data } = await supabase
    .from("members")
    .select()

  const completeData = data.map(item => {
    return {
      id: item.id,
      name: item.in_game_name,
      class: item.class,
      gains: calculatePowerGains(item.power),
      power: item.power[item.power.length - 1],
      type: getType(item.class)
    }}
  ).filter(item => item)

  const cards = completeData.map(item => {
    return (
      <MemberCards item={item} key={item.id}/>
    )
  }).sort((a, b) => b.name - a.name)

  return (
    <main className="">
      <div className="flex gap-2 w-full flex-wrap mt-6 justify-center">
        {cards}
      </div>
    </main>
  )
}