import { createClient } from "@/lib/supabase/client";
import { getType } from "@/app/utils/getType";
import { calculatePowerGains } from "@/app/utils/calculatePowerGains";

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

  /*
    av
  */
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
      <section className="mb-10">
        <h1>Total</h1>
        <div>Clan: {getTotal()}</div>
        <div>Tanks: {getTotal("Tank")}</div>
        <div>DPS: {getTotal("DPS")}</div>
        <div>Healers: {getTotal("Healer")}</div>
      </section>
      <section className="mb-10">
        <h1>Averages</h1>
        <div>Clan: {getAverage()}</div>
        <div>Tanks: {getAverage("Tank")}</div>
        <div>DPS: {getAverage("DPS")}</div>
        <div>Healers: {getAverage("Healer")}</div>
      </section>
      <section className="mb-10">
        <h1>Top Three</h1>
        <div>
          Clan: {getTopThree().map(item => (
            <div key={item.id}>{item.name}: {item.gains}</div>
          ))}
        </div>
        <div>
          Tanks: {getTopThree("Tank").map(item => (
            <div key={item.id}>{item.name}: {item.gains}</div>
          ))}
        </div>
        <div>
          DPS: {getTopThree("DPS").map(item => (
            <div key={item.id}>{item.name}: {item.gains}</div>
          ))}
        </div>
        <div>
          Healers: {getTopThree("Healer").map(item => (
            <div key={item.id}>{item.name}: {item.gains}</div>
          ))}
        </div>
      </section>
    </main>
  )
}