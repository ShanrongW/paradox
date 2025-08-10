import { createClient } from "@/lib/supabase/server";
import { ChartLineMultiple } from "@/app/components/DataChart";
import { getType } from "@/app/utils/getType";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function MemberPage({params}) {
  const slug = await params

  const supabase = await createClient();
  const { data } = await supabase
    .from("members")
    .select()
    .eq('id', slug.memberId)

  const completeData = {
    ...data[0],
    power: data[0].power[data[0].power.length-1],
    type: getType(data[0].class),
    name: data[0].in_game_name
  }

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
    <main className="flex flex-wrap flex-col">
      <div className="max-w-[800px] w-full mx-auto mt-5">
        <Card className="w-[375px] ">
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              <Image src={`/${completeData.class.toLowerCase()}.webp`} width={20} height={20} alt="class icon"/>
              {completeData.name}
            </CardTitle>
            <CardDescription>
              {completeData.type} • {completeData.class}
            </CardDescription>
            <CardAction>
              <Link href={`/statistics/member`} prefetch={false}><Button variant="link">Go Back</Button></Link>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
      <div className="max-w-[800px] w-full mx-auto mt-5">
        <ChartLineMultiple chartData={chartData} />
      </div>
    </main>
  )
}