import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SqlSetupBox from "../articles/SqlSetupBox";
import { updateQueryStatus, deleteQuery } from "./actions";

export const dynamic = "force-dynamic";

const SETUP_SQL = `-- 1. CREATE QUERIES TABLE
CREATE TABLE IF NOT EXISTS public.queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  business TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  services TEXT[] NOT NULL,
  budget TEXT,
  timeline TEXT,
  details TEXT NOT NULL,
  status TEXT DEFAULT 'new'
);

-- 2. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;

-- 3. POLICIES
DROP POLICY IF EXISTS "Allow service role full access on queries" ON public.queries;
DROP POLICY IF EXISTS "Allow authenticated users full access on queries" ON public.queries;
DROP POLICY IF EXISTS "Allow public insert on queries" ON public.queries;

CREATE POLICY "Allow public insert on queries"
  ON public.queries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access on queries"
  ON public.queries FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 4. GRANT PERMISSIONS TO API ROLES
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;`;

export default async function QueriesDashboard() {
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

  const { data: queries, error } = await supabase
    .from("queries")
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
            <h1 className="text-3xl font-bold">Manage Queries</h1>
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
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Contact Info</th>
                  <th className="p-4 font-medium">Details</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(!queries || queries.length === 0) ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-brand-text-secondary">
                      No queries found yet.
                    </td>
                  </tr>
                ) : (
                  queries.map((q: any) => (
                    <tr key={q.id} className="hover:bg-white/[0.02] transition-colors align-top">
                      <td className="p-4 text-brand-text-secondary whitespace-nowrap">
                        {new Date(q.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white mb-1">{q.name}</div>
                        <div className="text-brand-text-secondary">{q.business}</div>
                        <div className="text-brand-text-secondary">{q.email}</div>
                        <div className="text-brand-text-secondary">{q.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="mb-2">
                          <span className="text-brand-text-secondary">Services:</span>{" "}
                          <span className="text-white">{q.services?.join(", ")}</span>
                        </div>
                        <div className="mb-2">
                          <span className="text-brand-text-secondary">Budget:</span>{" "}
                          <span className="text-white">{q.budget || "N/A"}</span>
                          <span className="mx-2 text-white/20">|</span>
                          <span className="text-brand-text-secondary">Timeline:</span>{" "}
                          <span className="text-white">{q.timeline || "N/A"}</span>
                        </div>
                        <div className="text-brand-text-secondary p-3 bg-white/5 rounded-lg text-xs">
                          {q.details}
                        </div>
                      </td>
                      <td className="p-4">
                        <form action={updateQueryStatus}>
                          <input type="hidden" name="id" value={q.id} />
                          <select 
                            name="status" 
                            defaultValue={q.status}
                            onChange={(e) => e.target.form?.requestSubmit()}
                            className={\`px-3 py-1.5 rounded-lg text-xs font-bold outline-none cursor-pointer \${
                              q.status === 'new' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                              q.status === 'contacted' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 
                              'bg-white/10 text-white/50 border border-white/10'
                            }\`}
                          >
                            <option value="new" className="bg-black text-white">New</option>
                            <option value="contacted" className="bg-black text-white">Contacted</option>
                            <option value="archived" className="bg-black text-white">Archived</option>
                          </select>
                        </form>
                      </td>
                      <td className="p-4 text-right">
                        <form action={deleteQuery}>
                          <input type="hidden" name="id" value={q.id} />
                          <button type="submit" className="text-red-500/70 hover:text-red-500 hover:underline text-xs transition-colors">
                            Delete
                          </button>
                        </form>
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
