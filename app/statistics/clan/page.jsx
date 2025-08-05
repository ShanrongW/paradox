import { createClient } from "@/lib/supabase/client";
import { getType } from "@/app/utils/getType";
import { calculatePowerGains } from "@/app/utils/calculatePowerGains";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ClanPage() {

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

  function getAverage(type = "All") {
    const filteredData = completeData.filter(item => item.type === type || type === "All")
    let total = 0
    filteredData.forEach(item => total += item.gains)
    const average = Math.round(total / filteredData.length)
    return average ? average : 0
  }

  function getTotal(type = "All") {
    const filteredData = completeData.filter(item => item.type === type || type === "All")
    let total = 0
    filteredData.forEach(item => total += item.gains)
    return total
  }

  function getTopThree(type = "All") {
    const filteredData = completeData.filter(item => item.type === type || type === "All").sort((a, b) => b.gains - a.gains)
    if (filteredData.length < 3) {
      return filteredData
    } else {
      return [
        filteredData[0],
        filteredData[1],
        filteredData[2]
      ]
    }
  }

  return (
    <main>
      <section className="mt-10 flex gap-10 justify-center flex-wrap">
        <Card className="w-[375px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              Clan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Total Gains: {getTotal()}</li>
              <li>Average Gains: {getAverage()}</li>
              <li>
                <ul className="list-disc">
                  Top Three:
                  {getTopThree().map(item => (
                    <li key={item.id} className="ml-5">{item.name}: {item.gains}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="w-[375px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              Tanks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Total Gains: {getTotal("Tank")}</li>
              <li>Average Gains: {getAverage("Tank")}</li>
              <li>
                <ul className="list-disc">
                  Top Three:
                  {getTopThree("Tank").map(item => (
                    <li key={item.id} className="ml-5">{item.name}: {item.gains}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="w-[375px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              DPS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Total Gains: {getTotal("DPS")}</li>
              <li>Average Gains: {getAverage("DPS")}</li>
              <li>
                <ul className="list-disc">
                  Top Three:
                  {getTopThree("DPS").map(item => (
                    <li key={item.id} className="ml-5">{item.name}: {item.gains}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="w-[375px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              Healers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Total Gains: {getTotal("Healer")}</li>
              <li>Average Gains: {getAverage("Healer")}</li>
              <li>
                <ul className="list-disc">
                  Top Three:
                  {getTopThree("Healer").map(item => (
                    <li key={item.id} className="ml-5">{item.name}: {item.gains}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}