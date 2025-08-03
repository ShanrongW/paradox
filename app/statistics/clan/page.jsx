import { createClient } from "@/lib/supabase/client";

export default async function ClanPage() {

  const supabase = await createClient();
    const { data } = await supabase
      .from("members")
      .select()

  

  return (
    <main>
      <section>
        <h1></h1>
      </section>
    </main>
  )
}