import Link from "next/link";
import { createArticle } from "../actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function CreateArticle() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect("/admin");

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 border-b border-white/10 pb-6">
          <div className="text-sm text-brand-text-secondary mb-2">
            <Link href="/admin/dashboard/articles" className="hover:text-white transition-colors">← Back to Articles</Link>
          </div>
          <h1 className="text-3xl font-bold">Draft New Article</h1>
        </header>

        <form action={createArticle} className="space-y-8">
          {/* Main Content Section */}
          <div className="glass p-6 rounded-xl border border-white/5 space-y-6">
            <h2 className="text-xl font-bold text-brand-accent mb-4">Core Content</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-text-secondary mb-1">Title *</label>
                <input type="text" name="title" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all" placeholder="e.g. 10 Web Design Trends for 2026" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-text-secondary mb-1">URL Slug *</label>
                <input type="text" name="slug" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all" placeholder="e.g. 10-web-design-trends" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">Author *</label>
              <input type="text" name="author" defaultValue="Website Walae" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">Article Content (HTML/Text) *</label>
              <textarea name="content" required rows={12} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all font-mono text-sm" placeholder="<p>Start writing your article here...</p>"></textarea>
            </div>
            
            <div className="flex items-center gap-3">
              <input type="checkbox" name="published" id="published" className="w-5 h-5 accent-brand-accent bg-black/50 border-white/10" />
              <label htmlFor="published" className="text-sm font-medium text-brand-text">Publish Immediately (make visible to public)</label>
            </div>
          </div>

          {/* SEO Section */}
          <div className="glass p-6 rounded-xl border border-white/5 space-y-6">
            <h2 className="text-xl font-bold text-brand-accent mb-4">Standard SEO (Google)</h2>
            
            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">Meta Description</label>
              <textarea name="seo_description" rows={2} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all text-sm" placeholder="A short 150-character summary for Google search results."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">Keywords (comma separated)</label>
              <input type="text" name="seo_keywords" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all" placeholder="e.g. web design, trends, 2026, website walae" />
            </div>
          </div>

          {/* GEO & AEO Section */}
          <div className="glass p-6 rounded-xl border border-white/5 space-y-6 bg-gradient-to-br from-brand-bg to-brand-accent/5">
            <h2 className="text-xl font-bold text-brand-accent mb-1">Generative & Answer Engine Optimization (GEO/AEO)</h2>
            <p className="text-xs text-brand-text-secondary mb-4">These fields specifically target AI scrapers like ChatGPT, Perplexity, and Google AI Overviews.</p>
            
            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">GEO Summary (for LLMs)</label>
              <textarea name="geo_summary" rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all text-sm" placeholder="Write a highly factual, dense, and objective summary of this article specifically formatted for an AI model to read and quote."></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">AEO FAQ Schema (JSON)</label>
              <textarea name="aeo_faq" rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all font-mono text-xs" placeholder='[{"question": "What is AEO?", "answer": "Answer Engine Optimization..."}]'></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-4 pb-12">
            <Link href="/admin/dashboard/articles" className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 font-medium transition-colors">
              Cancel
            </Link>
            <button type="submit" className="bg-brand-accent text-black font-bold px-8 py-3 rounded-lg hover:bg-brand-accent/90 transition-colors">
              Save Article
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
