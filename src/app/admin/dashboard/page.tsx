import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { FileText, Briefcase, Package, Search, LogOut } from "lucide-react";

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
              <button type="submit" className="inline-flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition-colors">
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-6 rounded-2xl border border-white/5 hover:border-brand-accent/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-brand-text-secondary text-sm font-medium">Total Articles</h3>
              <FileText className="w-4 h-4 text-brand-accent" />
            </div>
            <div className="text-5xl font-black text-brand-accent">{articlesCount || 0}</div>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5 hover:border-brand-accent/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-brand-text-secondary text-sm font-medium">Portfolio Items</h3>
              <Briefcase className="w-4 h-4 text-brand-accent" />
            </div>
            <div className="text-5xl font-black text-brand-accent">{portfolioCount || 0}</div>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5 hover:border-brand-accent/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-brand-text-secondary text-sm font-medium">Active Packages</h3>
              <Package className="w-4 h-4 text-brand-accent" />
            </div>
            <div className="text-5xl font-black text-brand-accent">{packagesCount || 0}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/dashboard/articles" className="bg-white/5 hover:bg-brand-accent text-white hover:text-black p-4 rounded-xl font-medium transition-all group flex flex-col items-start justify-between min-h-[90px]">
            <FileText className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            <span>Manage Articles</span>
          </Link>
          <Link href="/admin/dashboard/portfolio" className="bg-white/5 hover:bg-brand-accent text-white hover:text-black p-4 rounded-xl font-medium transition-all group flex flex-col items-start justify-between min-h-[90px]">
            <Briefcase className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            <span>Manage Portfolio</span>
          </Link>
          <Link href="/admin/dashboard/packages" className="bg-white/5 hover:bg-brand-accent text-white hover:text-black p-4 rounded-xl font-medium transition-all group flex flex-col items-start justify-between min-h-[90px]">
            <Package className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            <span>Manage Packages</span>
          </Link>
          <Link href="/admin/dashboard/seo" className="bg-white/5 hover:bg-brand-accent text-white hover:text-black p-4 rounded-xl font-medium transition-all group flex flex-col items-start justify-between min-h-[90px]">
            <Search className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            <span>Global SEO Settings</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
