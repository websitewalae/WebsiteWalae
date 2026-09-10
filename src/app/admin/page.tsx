import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Website Walae",
  robots: "noindex, nofollow", // Keep Google out of the admin panel
};

export default async function AdminLogin(props: { searchParams?: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  const errorMsg = searchParams?.error;

  let session = null;
  let isConfigured = false;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getSession();
    session = data.session;
    isConfigured = true;
  } catch (error) {
    // If createClient throws, it means the URL is invalid or missing
    isConfigured = false;
  }

  // If already logged in, redirect to the dashboard
  if (session) {
    redirect("/admin/dashboard");
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-brand-text px-4 relative">
        <div className="w-full max-w-lg glass p-8 rounded-2xl relative z-10 border border-brand-accent/30 text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-4 text-brand-accent">Setup Required</h1>
          <p className="text-brand-text-secondary mb-6">
            Your Supabase environment variables are missing or invalid. Please open <code className="bg-black/50 px-2 py-1 rounded text-white">.env.local</code> and add your <strong>NEXT_PUBLIC_SUPABASE_URL</strong> and <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong>.
          </p>
          <a href="/" className="inline-block bg-brand-accent text-black font-bold px-6 py-2 rounded-lg">Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-brand-text px-4 relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 bg-brand-bg/40 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-bg via-[#050505]/80 to-transparent pointer-events-none" />

      <div className="w-full max-w-md glass p-8 rounded-2xl relative z-10 border border-white/5">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center mx-auto mb-4 border border-brand-accent/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">System Access</h1>
          <p className="text-brand-text-secondary text-sm mt-2">Enter your credentials to access the Website Walae control panel.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form action="/auth/login" method="post" className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-text-secondary mb-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              placeholder="admin@websitewalae.com"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-text-secondary mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-accent text-black font-bold rounded-lg px-4 py-3 mt-6 hover:bg-brand-accent/90 transition-colors"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
