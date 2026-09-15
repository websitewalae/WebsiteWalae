import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Plus, Upload, Eye, Trash2, ExternalLink, Image as ImageIcon } from "lucide-react";
import SqlSetupBox from "./SqlSetupBox";
import { seedDefaultArticles, deleteArticle } from "./actions";
import { CORNERSTONE_ARTICLES } from "@/lib/articles";

export const dynamic = "force-dynamic";

const SETUP_SQL = `-- 1. CREATE ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  author TEXT DEFAULT 'Website Walae',
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT,
  cover_image TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  geo_summary TEXT,
  aeo_faq JSONB,
  published BOOLEAN DEFAULT false
);

-- 2. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- 3. POLICIES
DROP POLICY IF EXISTS "Allow public read access for articles" ON public.articles;
DROP POLICY IF EXISTS "Allow full access for authenticated users on articles" ON public.articles;

CREATE POLICY "Allow public read access for articles"
  ON public.articles FOR SELECT
  USING (true);

CREATE POLICY "Allow full access for authenticated users on articles"
  ON public.articles FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 4. GRANT PERMISSIONS TO API ROLES
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

-- 5. IF TABLE ALREADY EXISTS, ADD NEW COLUMNS
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS cover_image TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();`;

const CATEGORY_OPTIONS = ["All", "Web Engineering", "Social Media & Ads", "SEO & Discover", "Digital Strategy"];

export default async function ArticlesDashboard(props: { searchParams?: Promise<{ filter?: string; search?: string }> }) {
  const searchParams = await props.searchParams;
  const statusFilter = searchParams?.filter || "all";
  const searchQuery = searchParams?.search || "";

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect("/nomo");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  let projectId = "ypksozcsjuxobxyzqtmy";
  try {
    if (supabaseUrl) {
      projectId = new URL(supabaseUrl).hostname.split(".")[0];
    }
  } catch (e) {}

  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  // Determine if we need to show cornerstone fallback
  const hasDbArticles = !error && articles && articles.length > 0;
  const showSeedPrompt = !error && articles && articles.length === 0;

  // Apply filters
  let displayArticles = articles || [];
  if (statusFilter === "published") {
    displayArticles = displayArticles.filter((a: any) => a.published);
  } else if (statusFilter === "draft") {
    displayArticles = displayArticles.filter((a: any) => !a.published);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayArticles = displayArticles.filter((a: any) =>
      a.title?.toLowerCase().includes(q) || a.slug?.toLowerCase().includes(q) || a.category?.toLowerCase().includes(q)
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <div>
            <div className="text-sm text-brand-text-secondary mb-2">
              <Link href="/nomo/dashboard" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <h1 className="text-3xl font-bold">Manage Articles</h1>
          </div>
          <div className="flex gap-4">
            {showSeedPrompt && (
              <form action={seedDefaultArticles}>
                <button 
                  type="submit"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Seed Default Articles</span>
                </button>
              </form>
            )}
            <Link href="/nomo/dashboard/articles/create" className="inline-flex items-center gap-2 bg-brand-accent text-black font-bold px-6 py-3 rounded-lg hover:bg-brand-accent/90 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Article</span>
            </Link>
          </div>
        </header>

        {error ? (
          <SqlSetupBox 
            sql={SETUP_SQL} 
            projectId={projectId} 
            errorMessage={error.message} 
            errorCode={error.code} 
          />
        ) : (
          <>
            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                {[
                  { key: "all", label: "All" },
                  { key: "published", label: "Published" },
                  { key: "draft", label: "Drafts" },
                ].map((tab) => (
                  <Link
                    key={tab.key}
                    href={`/nomo/dashboard/articles?filter=${tab.key}${searchQuery ? `&search=${searchQuery}` : ""}`}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      statusFilter === tab.key
                        ? "bg-brand-accent text-black"
                        : "bg-white/5 text-brand-text-secondary hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {tab.label}
                  </Link>
                ))}
              </div>
              <form method="GET" action="/nomo/dashboard/articles" className="relative w-full sm:w-72">
                <input type="hidden" name="filter" value={statusFilter} />
                <input
                  type="text"
                  name="search"
                  defaultValue={searchQuery}
                  placeholder="Search by title..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-4 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-brand-accent transition-all"
                />
              </form>
            </div>

            {/* Articles Table */}
            <div className="bg-black/40 border border-white/5 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 border-b border-white/10 text-brand-text-secondary">
                  <tr>
                    <th className="p-4 font-medium w-12"></th>
                    <th className="p-4 font-medium">Title</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Author</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {displayArticles.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="text-brand-text-secondary text-base">
                            {showSeedPrompt
                              ? "No articles yet. Seed the defaults or create your first post!"
                              : "No articles matched your filters."}
                          </div>
                          <Link
                            href="/nomo/dashboard/articles/create"
                            className="inline-flex items-center gap-2 bg-brand-accent text-black font-bold px-6 py-3 rounded-lg hover:bg-brand-accent/90 transition-colors text-sm"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Create Article</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    displayArticles.map((article: any) => {
                      const deleteAction = deleteArticle.bind(null, article.id);
                      return (
                        <tr key={article.id} className="hover:bg-white/[0.02] transition-colors align-middle">
                          {/* Cover Image Thumbnail */}
                          <td className="p-4">
                            <div className="w-12 h-8 rounded overflow-hidden bg-white/5 shrink-0">
                              {article.cover_image ? (
                                <img
                                  src={article.cover_image}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon className="w-3.5 h-3.5 text-white/20" />
                                </div>
                              )}
                            </div>
                          </td>
                          {/* Title + Slug */}
                          <td className="p-4">
                            <div className="font-medium text-white leading-snug">{article.title}</div>
                            <div className="text-[11px] text-white/40 font-mono mt-0.5">/{article.slug}</div>
                          </td>
                          {/* Category */}
                          <td className="p-4">
                            <span className="text-xs text-brand-text-secondary">
                              {article.category || "—"}
                            </span>
                          </td>
                          {/* Status */}
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${article.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {article.published ? "Published" : "Draft"}
                            </span>
                          </td>
                          {/* Author */}
                          <td className="p-4 text-brand-text-secondary text-xs">{article.author}</td>
                          {/* Date */}
                          <td className="p-4 text-brand-text-secondary text-xs whitespace-nowrap">
                            {new Date(article.created_at).toLocaleDateString()}
                          </td>
                          {/* Actions */}
                          <td className="p-4">
                            <div className="flex items-center justify-end gap-3">
                              {article.published && (
                                <Link
                                  href={`/articles/${article.slug}`}
                                  target="_blank"
                                  className="text-white/40 hover:text-brand-accent transition-colors"
                                  title="Preview"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                              )}
                              <Link
                                href={`/nomo/dashboard/articles/${article.id}`}
                                className="text-brand-accent hover:underline text-xs font-bold"
                              >
                                Edit
                              </Link>
                              <form action={deleteAction}>
                                <button
                                  type="submit"
                                  className="text-red-500/60 hover:text-red-400 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Cornerstone Articles Reminder (when DB is empty) */}
            {showSeedPrompt && (
              <div className="mt-8 p-6 rounded-xl border border-brand-accent/20 bg-brand-accent/5">
                <div className="flex items-center gap-2 text-brand-accent text-sm font-bold mb-3">
                  <Eye className="w-4 h-4" />
                  <span>Public Blog Fallback Active</span>
                </div>
                <p className="text-xs text-brand-text-secondary leading-relaxed mb-4">
                  Your public blog is currently showing <strong className="text-white">{CORNERSTONE_ARTICLES.length} cornerstone articles</strong> from a built-in fallback. 
                  These are NOT in your database yet. Click <strong className="text-brand-accent">&quot;Seed Default Articles&quot;</strong> above to import them into Supabase so they appear here and become editable.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {CORNERSTONE_ARTICLES.map((a) => (
                    <div key={a.id} className="bg-black/40 rounded-lg p-3 border border-white/5">
                      <div className="w-full h-20 rounded overflow-hidden mb-2 bg-white/5">
                        <img src={a.coverImage || ""} alt={a.title} className="w-full h-full object-cover opacity-70" />
                      </div>
                      <div className="text-xs font-medium text-white line-clamp-2">{a.title}</div>
                      <div className="text-[10px] text-brand-accent mt-1">{a.category}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
