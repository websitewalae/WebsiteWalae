import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ArticlesDashboard() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect("/admin");

  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <div>
            <div className="text-sm text-brand-text-secondary mb-2">
              <Link href="/admin/dashboard" className="hover:text-white transition-colors">← Back to Dashboard</Link>
            </div>
            <h1 className="text-3xl font-bold">Manage Articles</h1>
          </div>
          <Link href="/admin/dashboard/articles/create" className="bg-brand-accent text-black font-bold px-6 py-3 rounded-lg hover:bg-brand-accent/90 transition-colors">
            + New Article
          </Link>
        </header>

        {error ? (
          <div className="bg-red-500/10 border border-red-500/30 text-white p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-3 text-red-400 font-bold text-lg">
              <span>⚠️ Database Setup Required</span>
            </div>
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              The <code className="bg-black/60 px-2 py-0.5 rounded text-brand-accent">public.articles</code> table was not found in your Supabase database schema.
            </p>
            <div className="bg-black/80 p-4 rounded-lg border border-white/10 font-mono text-xs text-brand-accent overflow-x-auto space-y-2">
              <div className="text-white/60 font-bold mb-2">// Copy & Paste this SQL in your Supabase SQL Editor (Database ➔ SQL Editor):</div>
              <pre>{`CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  author TEXT DEFAULT 'Website Walae',
  content TEXT NOT NULL,
  seo_description TEXT,
  seo_keywords TEXT,
  geo_summary TEXT,
  aeo_faq JSONB,
  published BOOLEAN DEFAULT false
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for articles"
  ON public.articles FOR SELECT USING (true);

CREATE POLICY "Allow full access for authenticated users on articles"
  ON public.articles FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');`}</pre>
            </div>
            <p className="text-xs text-brand-text-muted">
              Note: You can also find the complete SQL setup file at <code className="text-white">supabase.sql</code> in your project repository.
            </p>
          </div>
        ) : (
          <div className="bg-black/40 border border-white/5 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-brand-text-secondary">
                <tr>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Author</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {articles?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-brand-text-secondary">
                      No articles found. Create your first post!
                    </td>
                  </tr>
                ) : (
                  articles?.map((article) => (
                    <tr key={article.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-medium">{article.title}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${article.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {article.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="p-4 text-brand-text-secondary">{article.author}</td>
                      <td className="p-4 text-brand-text-secondary">{new Date(article.created_at).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <Link href={`/admin/dashboard/articles/${article.id}`} className="text-brand-accent hover:underline text-xs">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
