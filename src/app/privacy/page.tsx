import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Website Walae | Privacy Policy",
  description: "Learn how Website Walae collects, uses, and protects your personal and project information. Comprehensive privacy policy for our digital creative studio.",
  alternates: {
    canonical: "https://websitewalae.com/privacy",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "September 12, 2026";

  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text pt-28 pb-16">
      <div className="noise-overlay" />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-brand-text-secondary hover:text-brand-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          BACK TO HOME
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
            <Shield className="w-4 h-4" />
            LEGAL & COMPLIANCE
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-4">
            PRIVACY <span className="text-brand-accent">POLICY</span>
          </h1>
          <p className="text-sm font-mono text-brand-text-muted">
            Last Updated: {lastUpdated} // Website Walae Studio
          </p>
        </div>

        {/* Intro Card */}
        <div className="glass p-6 sm:p-8 rounded-2xl border border-white/10 mb-12 bg-gradient-to-br from-white/[0.03] to-transparent">
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed mb-4">
            At <strong className="text-white">Website Walae</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we take your privacy and business confidentiality seriously. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website (<a href="https://websitewalae.com" className="text-brand-accent hover:underline">websitewalae.com</a>), engage our digital services, or communicate with our creative studio team.
          </p>
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10 text-xs font-mono text-white/80">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" /> 100% Client Data Confidentiality</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" /> No Unauthorized Selling of Data</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" /> Secure Supabase / Cloud Infrastructure</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 text-sm sm:text-base text-brand-text-secondary leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">01.</span> Information We Collect
            </h2>
            <p>We collect information that you directly provide to us when submitting inquiries, onboarding for projects, or contacting our team:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li><strong>Contact & Identification Data:</strong> Full name, company/brand name, email address, phone number, and physical billing address.</li>
              <li><strong>Project Inquiries & Briefs:</strong> Project requirements, design preferences, budget estimates, timeline constraints, and creative assets you share with us.</li>
              <li><strong>Technical Data & Usage:</strong> IP address, browser type, device information, operating system, and anonymous interaction metrics via Google Analytics.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">02.</span> How We Use Your Information
            </h2>
            <p>We use collected data solely for legitimate business operations, project delivery, and improving your studio experience:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>To evaluate project briefs and generate accurate commercial estimates and service contracts.</li>
              <li>To develop, design, test, and deploy websites, creative assets, and advertising campaigns requested by you.</li>
              <li>To communicate project milestones, deliverables, invoice details, and support inquiries.</li>
              <li>To monitor website performance, security, and user experience optimizations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">03.</span> Client Data & Confidentiality (NDA Standard)
            </h2>
            <p>
              We treat all client business logic, unpublished designs, media footage, and source code with strict professional confidentiality. We never sell, rent, or trade your proprietary assets, customer lists, or internal metrics to third parties or marketing brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">04.</span> Cookies & Analytics
            </h2>
            <p>
              Our website uses modern session cookies and privacy-friendly Google Analytics (GA4) measurement tags to understand traffic volume, page load speeds, and navigation flows. You may configure your browser to block or alert you about cookies; our website functions completely even with cookies disabled.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">05.</span> Third-Party Services
            </h2>
            <p>We partner with high-security industry providers to deliver our services:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li><strong>Hosting & Infrastructure:</strong> Next.js on Vercel and Supabase cloud for secure databases and authentication.</li>
              <li><strong>Advertising & Analytics:</strong> Google Analytics and Meta Business Suite (strictly for client campaign management).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">06.</span> Data Retention & Rights
            </h2>
            <p>
              You retain the right to request access to, correction of, or permanent deletion of any personal data stored with Website Walae. To submit a data request or request asset removal, email us at <a href="mailto:support@websitewalae.com" className="text-brand-accent hover:underline">support@websitewalae.com</a>.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">07.</span> Contact & Grievance Officer
            </h2>
            <p>For questions regarding this policy or data practices, please reach out directly:</p>
            <div className="glass p-5 rounded-xl border border-white/10 font-mono text-xs text-white/90 space-y-1 mt-3">
              <div className="font-bold text-brand-accent">WEBSITE WALAE CREATIVE STUDIO</div>
              <div>Halwasiya Market, Hazratganj, Lucknow, Uttar Pradesh, 226001, India</div>
              <div>Direct Phone: +91 7317782998</div>
              <div>Email: support@websitewalae.com / websitewalae@gmail.com</div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
