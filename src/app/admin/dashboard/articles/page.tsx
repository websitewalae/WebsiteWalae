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
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">Error loading articles: {error.message}. Did you run the SQL schema setup?</div>
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
