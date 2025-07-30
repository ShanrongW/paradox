export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <section className="w-[90%] flex flex-col items-center mx-auto">
          <h2 className="font-bold mt-10">Information</h2>
          <p className="mb-2 max-w-[375px] text-center">
            Paradox is an Ulala Clan on NA2 server. We are a welcoming community to everyone. 
            We have a chart to track each of our members growth and organize Clan War lineups for everyone to have a chance to participate.
          </p>
          <ul className="text-center">
            <strong>Requirements</strong>
            <li>1250 Weekley Activity Points</li>
            <li>100m preferred but not required</li>
            <li>Participation in Yggsdrasil Clan Event</li>
          </ul>
          <div className="flex gap-2.5">
            <button 
              className="bg-[#f72585] text-white py-1.5 px-2 rounded-md shadow-lg/50 shadow-blue-500/50 transition 
              delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#7209b7] mt-5" 
            >
              <a href="https://discord.com/channels/1130547175600955392/1308152935087214622" target="_blank">Apply</a>
            </button>
            <button
              className="bg-[#4361ee] text-white py-1.5 px-2 rounded-md shadow-lg/50 shadow-blue-500/50 transition 
              delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#7209b7] mt-5" 
            >
              <a href="https://discord.gg/postandpara" target="_blank">Discord</a>
            </button>
          </div>
        </section>
    </main>
  )
}
