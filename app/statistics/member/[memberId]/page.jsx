import { createClient } from "@/lib/supabase/client";
import { ChartLineMultiple } from "@/app/components/DataChart";
import { getType } from "@/app/utils/getType";
import { calculatePowerGains } from "@/app/utils/calculatePowerGains";

export default async function MemberPage({params}) {
  const slug = await params

  const supabase = await createClient();
  const { data } = await supabase
    .from("members")
    .select()
    .eq('id', slug.memberId)

  const gainsArray = [0]
  const powerArray = data[0].power

  if (!(data[0].power.length < 2)) {
    for (let i = 0; i < data[0].power.length - 1; i++) {
      gainsArray.push(data[0].power[i+1] - data[0].power[i])
    }
  }

  const chartData = powerArray.map((item, index) => {
    return {
      week: "Week " + index,
      power: item,
      gains: gainsArray[index]
    }
  })

  return (
    <main className="">
      <div className="w-1/2 mx-auto mt-5">
        <ChartLineMultiple chartData={chartData} />
      </div>
    </main>
  )
}