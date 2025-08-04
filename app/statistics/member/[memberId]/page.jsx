import { createClient } from "@/lib/supabase/client";

export default async function MemberPage({params}) {
  const {slug} = await params

  const supabase = await createClient();
  const { data } = await supabase
    .from("members")
    .select()
    .eq('id', slug)

  return (
    <h1>page</h1>
  )
}