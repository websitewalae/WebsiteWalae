"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateQueryStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  
  if (!id || !status) return;

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("queries")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating query status:", error);
  }

  revalidatePath("/nomo/dashboard/queries");
}

export async function deleteQuery(formData: FormData) {
  const id = formData.get("id") as string;
  
  if (!id) return;

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("queries")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting query:", error);
  }

  revalidatePath("/nomo/dashboard/queries");
}
