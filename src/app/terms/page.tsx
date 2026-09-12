import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale, CheckCircle2, AlertCircle } from "lucide-react";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Website Walae | Terms and Conditions",
  description: "Terms and conditions governing our digital creative, web development, UI/UX, SEO, video production, and marketing services at Website Walae.",
  alternates: {
    canonical: "https://websitewalae.com/terms",
  },
};

export default function TermsPage() {
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
            <Scale className="w-4 h-4" />
            TERMS OF SERVICE
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-4">
            TERMS & <span className="text-brand-accent">CONDITIONS</span>
          </h1>
          <p className="text-sm font-mono text-brand-text-muted">
            Last Updated: {lastUpdated} // Website Walae Studio Agreement
          </p>
        </div>

        {/* Intro Summary Box */}
        <div className="glass p-6 sm:p-8 rounded-2xl border border-white/10 mb-12 bg-gradient-to-br from-white/[0.03] to-transparent">
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed mb-4">
            These Terms and Conditions (&quot;Terms&quot;) govern the relationship between <strong className="text-white">Website Walae</strong> (&quot;Agency,&quot; &quot;we,&quot; &quot;us&quot;) and any client, business entity, or individual (&quot;Client,&quot; &quot;you&quot;) engaging our services for website development, UI/UX design, SEO, social media marketing, content creation, and video production.
          </p>
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10 text-xs font-mono text-white/80">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" /> Full Source Code & Asset Ownership to Client</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" /> Transparent Scope & Deliverable Milestones</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" /> Lucknow, UP Jurisdiction</span>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-12 text-sm sm:text-base text-brand-text-secondary leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">01.</span> Engagement & Scope of Work
            </h2>
            <p>
              Each project undertaken by Website Walae is defined by an agreed scope of work (&quot;SOW&quot;), proposal, or invoice outlining deliverables, timelines, and commercial terms. Any modifications, additional features, or out-of-scope requests will be quoted separately as a change order.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">02.</span> Payments, Pricing & Invoicing
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>All project fees are quoted in Indian Rupees (INR ₹) or US Dollars ($) as explicitly agreed in writing.</li>
              <li>Standard project structure requires an advance deposit (typically 40%–50%) before commencement of architecture, wireframing, or production.</li>
              <li>Final deliverables, code repositories, domain DNS transfers, and production credentials are released upon settlement of the final milestone payment.</li>
              <li>Invoices are due within 7 business days of issuance unless otherwise agreed.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">03.</span> Intellectual Property & Code Ownership
            </h2>
            <p>
              Upon 100% receipt of all agreed fees:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li><strong>Client Ownership:</strong> You retain complete ownership of all custom website source code, UI/UX designs, brand assets, graphics, and video master files created specifically for your project.</li>
              <li><strong>Agency Portfolio Rights:</strong> Website Walae reserves the right to display the completed work, project visuals, case studies, and live URLs in our portfolio, case studies, and marketing channels unless a formal non-disclosure agreement (NDA) explicitly prohibits it.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">04.</span> Client Responsibilities & Approvals
            </h2>
            <p>
              Timely completion of projects depends on client collaboration. The Client agrees to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Provide brand assets, copy, product images, credentials, and feedback in a timely manner.</li>
              <li>Review deliverables and provide structured feedback within 5 business days of each milestone preview.</li>
              <li>Ensure all assets, trademarks, and images provided to Website Walae are legally licensed by the Client.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">05.</span> Revisions & Quality Assurance
            </h2>
            <p>
              Each design and development phase includes structured revision rounds (typically 2 to 3 revision cycles per milestone as defined in your proposal) to ensure the end product meets the highest standards. Revisions cover refinements to existing scope; fundamental architectural changes after milestone sign-off may incur additional hours.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">06.</span> Warranties & Limitation of Liability
            </h2>
            <p>
              Website Walae warrants that all custom code and digital deliverables will perform in accordance with modern web standards (Chrome, Safari, Firefox, Edge). We provide a complimentary 30-day bug-fix warranty on all custom web applications following production launch.
            </p>
            <p>
              In no event shall Website Walae be liable for indirect, incidental, consequential, or punitive damages resulting from third-party hosting outages, domain registrar disputes, search engine ranking algorithm shifts, or cyber-attacks beyond our reasonable control.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">07.</span> Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of India. The courts of <strong>Lucknow, Uttar Pradesh, India</strong> shall have exclusive jurisdiction to settle any disputes.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-brand-accent font-mono text-base">08.</span> Contact Us
            </h2>
            <div className="glass p-5 rounded-xl border border-white/10 font-mono text-xs text-white/90 space-y-1 mt-3">
              <div className="font-bold text-brand-accent">WEBSITE WALAE CREATIVE STUDIO</div>
              <div>Halwasiya Market, Hazratganj, Lucknow, Uttar Pradesh, 226001, India</div>
              <div>Direct Phone: +91 7317782998</div>
              <div>Email: support@websitewalae.com</div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
