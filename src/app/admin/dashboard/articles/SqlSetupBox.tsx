"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink, Terminal } from "lucide-react";

interface SqlSetupBoxProps {
  sql: string;
  projectId: string;
}

export default function SqlSetupBox({ sql, projectId }: SqlSetupBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy SQL", err);
    }
  };

  const sqlEditorUrl = projectId 
    ? `https://supabase.com/dashboard/project/${projectId}/sql/new`
    : `https://supabase.com/dashboard`;

  return (
    <div className="bg-[#0a0a0a] border border-red-500/30 text-white p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
            <Terminal className="w-5 h-5" />
            <span>One-Time Database Setup Required</span>
          </div>
          <p className="text-xs sm:text-sm text-brand-text-secondary">
            The <code className="bg-black/60 px-2 py-0.5 rounded text-brand-accent">public.articles</code> table does not exist in your Supabase project yet.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold transition-all hover:scale-105"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-brand-accent" />
                <span className="text-brand-accent">COPIED TO CLIPBOARD!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-brand-accent" />
                <span>COPY SQL</span>
              </>
            )}
          </button>

          <a
            href={sqlEditorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-brand-accent text-black text-xs font-mono font-bold transition-all hover:bg-white hover:scale-105 shadow-[0_0_15px_rgba(199,255,61,0.3)]"
          >
            <span>OPEN SUPABASE SQL EDITOR</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-xs font-mono text-white/70">
          <strong>Step 1:</strong> Click <strong className="text-brand-accent">&quot;COPY SQL&quot;</strong> above. <br />
          <strong>Step 2:</strong> Click <strong className="text-brand-accent">&quot;OPEN SUPABASE SQL EDITOR&quot;</strong> to open your project ({projectId}). <br />
          <strong>Step 3:</strong> Paste the script into the SQL editor and click <strong className="text-white bg-emerald-700/60 px-2 py-0.5 rounded">Run</strong>. Then refresh this page!
        </div>

        <div className="bg-black/90 p-4 rounded-xl border border-white/10 font-mono text-xs text-brand-accent/90 overflow-x-auto max-h-72">
          <pre>{sql}</pre>
        </div>
      </div>
    </div>
  );
}
