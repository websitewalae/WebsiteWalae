import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAllPackages, type PricingPackage } from "@/lib/packages";
import PricingAdminClient from "./PricingAdminClient";

export const dynamic = "force-dynamic";

export default async function PricingAdminPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  let packages: PricingPackage[] = [];
  try {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) {
      packages = data as PricingPackage[];
    }
  } catch (err) {
    console.error("Error loading packages:", err);
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 pt-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/nomo/dashboard" className="text-xs font-mono text-brand-text-muted hover:text-brand-accent transition-colors mb-2 block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tight">
              Manage Pricing
            </h1>
            <p className="text-brand-text-secondary text-sm mt-1">
              {packages.length} package{packages.length !== 1 ? "s" : ""} total
            </p>
          </div>
        </div>

        <PricingAdminClient packages={packages} />
      </div>
    </div>
  );
}
