"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPackage(formData: FormData) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Unauthorized");

  const featuresRaw = formData.get("features") as string;
  let features: string[] = [];
  try {
    features = featuresRaw ? JSON.parse(featuresRaw) : [];
  } catch {
    features = featuresRaw ? featuresRaw.split("\n").map(f => f.trim()).filter(Boolean) : [];
  }

  const { error } = await supabase.from("packages").insert({
    name: formData.get("name") as string,
    service_name: formData.get("service_name") as string,
    slug: formData.get("slug") as string,
    category: formData.get("category") as string,
    price: formData.get("price") as string,
    starting_price: formData.get("starting_price") as string,
    pricing_label: formData.get("pricing_label") as string,
    description: formData.get("description") as string,
    features,
    cta_text: formData.get("cta_text") as string || "Select Plan",
    cta_link: formData.get("cta_link") as string || "/start-a-project",
    popular: formData.get("popular") === "on",
    display_order: parseInt(formData.get("display_order") as string) || 0,
    active: formData.get("active") === "on",
  });

  if (error) {
    console.error("Error creating package:", error);
    redirect(`/admin/dashboard/pricing?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/dashboard/pricing");
  revalidatePath("/pricing");
  redirect("/admin/dashboard/pricing");
}

export async function updatePackage(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Unauthorized");

  const featuresRaw = formData.get("features") as string;
  let features: string[] = [];
  try {
    features = featuresRaw ? JSON.parse(featuresRaw) : [];
  } catch {
    features = featuresRaw ? featuresRaw.split("\n").map(f => f.trim()).filter(Boolean) : [];
  }

  const { error } = await supabase
    .from("packages")
    .update({
      name: formData.get("name") as string,
      service_name: formData.get("service_name") as string,
      slug: formData.get("slug") as string,
      category: formData.get("category") as string,
      price: formData.get("price") as string,
      starting_price: formData.get("starting_price") as string,
      pricing_label: formData.get("pricing_label") as string,
      description: formData.get("description") as string,
      features,
      cta_text: formData.get("cta_text") as string || "Select Plan",
      cta_link: formData.get("cta_link") as string || "/start-a-project",
      popular: formData.get("popular") === "on",
      display_order: parseInt(formData.get("display_order") as string) || 0,
      active: formData.get("active") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating package:", error);
    redirect(`/admin/dashboard/pricing?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/dashboard/pricing");
  revalidatePath("/pricing");
  redirect("/admin/dashboard/pricing");
}

export async function deletePackage(id: string) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Unauthorized");

  const { error } = await supabase.from("packages").delete().eq("id", id);

  if (error) {
    console.error("Error deleting package:", error);
    redirect(`/admin/dashboard/pricing?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/dashboard/pricing");
  revalidatePath("/pricing");
  redirect("/admin/dashboard/pricing");
}

export async function togglePackageActive(id: string, active: boolean) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("packages")
    .update({ active, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error toggling package:", error);
  }

  revalidatePath("/admin/dashboard/pricing");
  revalidatePath("/pricing");
}

export async function togglePackagePopular(id: string, popular: boolean) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("packages")
    .update({ popular, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error toggling popular:", error);
  }

  revalidatePath("/admin/dashboard/pricing");
  revalidatePath("/pricing");
}
