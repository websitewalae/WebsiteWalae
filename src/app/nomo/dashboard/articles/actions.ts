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
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const cover_image = formData.get("cover_image") as string;
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
    excerpt: excerpt || null,
    category: category || null,
    cover_image: cover_image || null,
    seo_description,
    seo_keywords,
    geo_summary,
    aeo_faq,
    published,
  });

  if (error) {
    console.error("Error inserting article:", error);
    redirect(`/nomo/dashboard/articles/create?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/nomo/dashboard/articles");
  revalidatePath("/articles");
  revalidatePath("/sitemap.xml");
  redirect("/nomo/dashboard/articles");
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
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const cover_image = formData.get("cover_image") as string;
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
      excerpt: excerpt || null,
      category: category || null,
      cover_image: cover_image || null,
      seo_description,
      seo_keywords,
      geo_summary,
      aeo_faq,
      published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating article:", error);
    redirect(`/nomo/dashboard/articles/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/nomo/dashboard/articles");
  revalidatePath("/articles");
  revalidatePath(`/articles/${slug}`);
  revalidatePath("/sitemap.xml");
  redirect("/nomo/dashboard/articles");
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
    redirect(`/nomo/dashboard/articles?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/nomo/dashboard/articles");
  revalidatePath("/articles");
  revalidatePath("/sitemap.xml");
  redirect("/nomo/dashboard/articles");
}

export async function seedDefaultArticles() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Unauthorized");

  const { CORNERSTONE_ARTICLES } = await import("@/lib/articles");

  const { error } = await supabase.from("articles").insert(
    CORNERSTONE_ARTICLES.map(a => ({
      title: a.title,
      slug: a.slug,
      author: a.author,
      content: a.content,
      excerpt: a.excerpt || a.seo_description || null,
      category: a.category || null,
      cover_image: a.coverImage || null,
      seo_description: a.seo_description,
      seo_keywords: a.seo_keywords,
      geo_summary: a.geo_summary,
      aeo_faq: a.aeo_faq,
      published: a.published,
    }))
  );

  if (error) {
    console.error("Error seeding articles:", error);
    redirect(`/nomo/dashboard/articles?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/nomo/dashboard/articles");
  revalidatePath("/articles");
  redirect("/nomo/dashboard/articles");
}
