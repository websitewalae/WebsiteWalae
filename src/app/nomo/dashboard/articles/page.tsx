import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Plus, Upload } from "lucide-react";
import SqlSetupBox from "./SqlSetupBox";
import { seedDefaultArticles } from "./actions";

export const dynamic = "force-dynamic";

const SETUP_SQL = `-- 1. CREATE ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.articles (
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
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;`;

export default async function ArticlesDashboard() {
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

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
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
            {articles?.length === 0 && (
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
                        <Link href={`/nomo/dashboard/articles/${article.id}`} className="text-brand-accent hover:underline text-xs">
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
