import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin");
  }

  // Fetch quick stats
  const { count: articlesCount } = await supabase.from('articles').select('*', { count: 'exact', head: true });
  const { count: portfolioCount } = await supabase.from('portfolio').select('*', { count: 'exact', head: true });
  const { count: packagesCount } = await supabase.from('packages').select('*', { count: 'exact', head: true });

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text p-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase font-inter-tight">Control Panel</h1>
            <p className="text-brand-text-secondary mt-1">Manage Website Walae content, portfolio, and SEO parameters.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-brand-text-secondary">{session.user.email}</div>
            <form action="/auth/logout" method="post">
              <button type="submit" className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition-colors">
                Sign Out
              </button>
            </form>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-6 rounded-2xl border border-white/5 hover:border-brand-accent/50 transition-colors">
            <h3 className="text-brand-text-secondary text-sm font-medium mb-2">Total Articles</h3>
            <div className="text-5xl font-black text-brand-accent">{articlesCount || 0}</div>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5 hover:border-brand-accent/50 transition-colors">
            <h3 className="text-brand-text-secondary text-sm font-medium mb-2">Portfolio Items</h3>
            <div className="text-5xl font-black text-brand-accent">{portfolioCount || 0}</div>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5 hover:border-brand-accent/50 transition-colors">
            <h3 className="text-brand-text-secondary text-sm font-medium mb-2">Active Packages</h3>
            <div className="text-5xl font-black text-brand-accent">{packagesCount || 0}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/admin/dashboard/articles" className="bg-white/5 hover:bg-brand-accent text-white hover:text-black p-4 rounded-xl font-medium transition-all group">
            <span className="block text-xl mb-1 group-hover:-translate-y-1 transition-transform">📝</span>
            Manage Articles
          </a>
          <a href="/admin/dashboard/portfolio" className="bg-white/5 hover:bg-brand-accent text-white hover:text-black p-4 rounded-xl font-medium transition-all group">
            <span className="block text-xl mb-1 group-hover:-translate-y-1 transition-transform">💼</span>
            Manage Portfolio
          </a>
          <a href="/admin/dashboard/packages" className="bg-white/5 hover:bg-brand-accent text-white hover:text-black p-4 rounded-xl font-medium transition-all group">
            <span className="block text-xl mb-1 group-hover:-translate-y-1 transition-transform">📦</span>
            Manage Packages
          </a>
          <a href="/admin/dashboard/seo" className="bg-white/5 hover:bg-brand-accent text-white hover:text-black p-4 rounded-xl font-medium transition-all group">
            <span className="block text-xl mb-1 group-hover:-translate-y-1 transition-transform">🔍</span>
            Global SEO Settings
          </a>
        </div>

      </div>
    </div>
  );
}
