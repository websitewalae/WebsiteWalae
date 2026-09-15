"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createArticle(formData: FormData) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const author = formData.get("author") as string;
  const content = formData.get("content") as string;
  const seo_description = formData.get("seo_description") as string;
  const seo_keywords = formData.get("seo_keywords") as string;
  const geo_summary = formData.get("geo_summary") as string;
  const published = formData.get("published") === "on";

  // Parse dynamic FAQs if provided
  const aeo_faq_raw = formData.get("aeo_faq") as string;
  let aeo_faq = null;
  if (aeo_faq_raw) {
    try {
      aeo_faq = JSON.parse(aeo_faq_raw);
    } catch (e) {
      console.error("Failed to parse AEO FAQ JSON", e);
    }
  }

  const { error } = await supabase.from("articles").insert({
    title,
    slug,
    author,
    content,
    seo_description,
    seo_keywords,
    geo_summary,
    aeo_faq,
    published,
  });

  if (error) {
    console.error("Error inserting article:", error);
    redirect(`/admin/dashboard/articles/create?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/dashboard/articles");
  revalidatePath("/articles");
  revalidatePath("/sitemap.xml");
  redirect("/admin/dashboard/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const author = formData.get("author") as string;
  const content = formData.get("content") as string;
  const seo_description = formData.get("seo_description") as string;
  const seo_keywords = formData.get("seo_keywords") as string;
  const geo_summary = formData.get("geo_summary") as string;
  const published = formData.get("published") === "on";

  const aeo_faq_raw = formData.get("aeo_faq") as string;
  let aeo_faq = null;
  if (aeo_faq_raw) {
    try {
      aeo_faq = JSON.parse(aeo_faq_raw);
    } catch (e) {
      console.error("Failed to parse AEO FAQ JSON", e);
    }
  }

  const { error } = await supabase
    .from("articles")
    .update({
      title,
      slug,
      author,
      content,
      seo_description,
      seo_keywords,
      geo_summary,
      aeo_faq,
      published,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating article:", error);
    redirect(`/admin/dashboard/articles/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/dashboard/articles");
  revalidatePath("/articles");
  revalidatePath(`/articles/${slug}`);
  revalidatePath("/sitemap.xml");
  redirect("/admin/dashboard/articles");
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    console.error("Error deleting article:", error);
    redirect(`/admin/dashboard/articles?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/dashboard/articles");
  revalidatePath("/articles");
  revalidatePath("/sitemap.xml");
  redirect("/admin/dashboard/articles");
}
