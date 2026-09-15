"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2.5 py-4 border-y border-white/10 my-8">
      <span className="text-xs font-mono text-white/50 flex items-center gap-1.5 mr-2">
        <Share2 className="w-3.5 h-3.5" />
        <span>Share:</span>
      </span>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all text-xs font-mono font-medium"
      >
        WhatsApp
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all text-xs font-mono font-medium"
      >
        LinkedIn
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all text-xs font-mono font-medium"
      >
        Facebook
      </a>

      {/* Copy Link Button */}
      <button
        onClick={handleCopy}
        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-brand-accent" />
            <span className="text-brand-accent">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
