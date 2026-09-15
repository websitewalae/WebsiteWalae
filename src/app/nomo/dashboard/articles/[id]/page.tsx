import Link from "next/link";
import { updateArticle, deleteArticle } from "../actions";
import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import { Trash2, ArrowLeft, Save } from "lucide-react";

interface EditArticleProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string }>;
}

export default async function EditArticle(props: EditArticleProps) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;
  const errorMsg = searchParams?.error;

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect("/nomo");

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  const query = supabase.from("articles").select("*");
  const { data: article, error } = await (isUuid ? query.eq("id", id) : query.eq("slug", id)).single();

  if (error || !article) {
    if (error && error.code !== "PGRST116") {
      return (
        <div className="min-h-screen bg-brand-bg text-brand-text p-8">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8 border-b border-white/10 pb-6">
              <Link href="/nomo/dashboard/articles" className="inline-flex items-center gap-1.5 text-brand-text-secondary hover:text-white transition-colors mb-4">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Articles
              </Link>
              <h1 className="text-3xl font-bold">Error Loading Article</h1>
            </header>
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-xl space-y-2">
              <p className="font-semibold">{error.message}</p>
              <p className="text-xs text-white/50">Code: {error.code}</p>
            </div>
          </div>
        </div>
      );
    }
    notFound();
  }

  const updateAction = updateArticle.bind(null, article.id);
  const deleteAction = deleteArticle.bind(null, article.id);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-brand-text-secondary mb-2">
              <Link href="/nomo/dashboard/articles" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Articles
              </Link>
            </div>
            <h1 className="text-3xl font-bold">Edit Article</h1>
          </div>

          <form action={deleteAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold hover:bg-red-500/20 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>DELETE ARTICLE</span>
            </button>
          </form>
        </header>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 text-sm">
            <strong>Error:</strong> {errorMsg}
          </div>
        )}

        {/* Edit Form */}
        <form action={updateAction} className="space-y-8">
          {/* Main Content Section */}
          <div className="glass p-6 rounded-xl border border-white/5 space-y-6">
            <h2 className="text-xl font-bold text-brand-accent mb-4">Core Content</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-text-secondary mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={article.title}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-text-secondary mb-1">URL Slug *</label>
                <input
                  type="text"
                  name="slug"
                  defaultValue={article.slug}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">Author *</label>
              <input
                type="text"
                name="author"
                defaultValue={article.author || "Website Walae"}
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">Article Content (HTML/Text) *</label>
              <textarea
                name="content"
                defaultValue={article.content}
                required
                rows={12}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                id="published"
                defaultChecked={article.published}
                className="w-5 h-5 accent-brand-accent bg-black/50 border-white/10"
              />
              <label htmlFor="published" className="text-sm font-medium text-brand-text">
                Published (visible to public)
              </label>
            </div>
          </div>

          {/* SEO Section */}
          <div className="glass p-6 rounded-xl border border-white/5 space-y-6">
            <h2 className="text-xl font-bold text-brand-accent mb-4">Standard SEO (Google)</h2>

            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">Meta Description</label>
              <textarea
                name="seo_description"
                defaultValue={article.seo_description || ""}
                rows={2}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">Keywords (comma separated)</label>
              <input
                type="text"
                name="seo_keywords"
                defaultValue={article.seo_keywords || ""}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
              />
            </div>
          </div>

          {/* GEO & AEO Section */}
          <div className="glass p-6 rounded-xl border border-white/5 space-y-6 bg-gradient-to-br from-brand-bg to-brand-accent/5">
            <h2 className="text-xl font-bold text-brand-accent mb-1">Generative & Answer Engine Optimization (GEO/AEO)</h2>
            <p className="text-xs text-brand-text-secondary mb-4">
              These fields specifically target AI scrapers like ChatGPT, Perplexity, and Google AI Overviews.
            </p>

            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">GEO Summary (for LLMs)</label>
              <textarea
                name="geo_summary"
                defaultValue={article.geo_summary || ""}
                rows={4}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">AEO FAQ Schema (JSON)</label>
              <textarea
                name="aeo_faq"
                defaultValue={article.aeo_faq ? JSON.stringify(article.aeo_faq, null, 2) : ""}
                rows={4}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all font-mono text-xs"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pb-12">
            <Link
              href="/nomo/dashboard/articles"
              className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 font-medium transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-brand-accent text-black font-bold px-8 py-3 rounded-lg hover:bg-brand-accent/90 transition-colors shadow-[0_0_20px_rgba(199,255,61,0.3)]"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
