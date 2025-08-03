import Table from "@/app/components/Table";
import FilterButton from "@/app/components/FilterButton";
import ClearFilter from "@/app/components/ClearFilter";

export default async function Charts({searchParams}) {
  const typeArray = ["Tank", "DPS", "Healer"]
  const params = await searchParams

  return (
    <main className="flex items-center justify-center flex-col">
      <h1 className="text-lg mt-2 font-bold">Charts</h1>
      <section className="mt-2 flex items-center justify-self-start w-3x1 ml-8 gap-2 mb-4">
        <div>Filters: </div>
        {
          typeArray.map(character => <FilterButton key={character} character={character}/>)
        } 
        <ClearFilter />
      </section>
      <section className="max-w-3xl w-screen border-2 rounded-lg">
        <Table searchParams={params}/>
      </section>
      
    </main>
    
  )
} 