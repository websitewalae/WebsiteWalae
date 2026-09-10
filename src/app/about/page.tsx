import { Heart, Target, Eye, Settings, Users, IndianRupee } from "lucide-react";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Website Walae - Digital Creative Agency",
  description: "Learn about Website Walae's journey from a local web development studio in Hazratganj to a global digital creative agency delivering 25+ services.",
  keywords: ["About Website Walae", "Digital Agency History", "Hazratganj Web Developers", "Best Marketing Agency Values"],
};

export default function AboutPage() {
  const timeline = [
    { year: "The Beginning", title: "Founded in Hazratganj", desc: "Started as a web development studio, helping local businesses build professional online presences." },
    { year: "Expansion", title: "Added SEO & Marketing", desc: "Expanded to SEO & digital marketing to give our clients visibility and leads." },
    { year: "Growth", title: "E-Commerce & Social Media", desc: "Launched full e-commerce solutions to help clients sell globally." },
    { year: "Today", title: "Full Digital Transformation", desc: "25+ Services, 12+ Industries. Your complete digital growth partner." },
  ];

  const values = [
    { title: "Transparency", icon: <Eye className="w-8 h-8 mb-4 text-brand-accent" />, desc: "No hidden fees, no vague reports. You always know exactly what we're working on." },
    { title: "Excellence", icon: <Target className="w-8 h-8 mb-4 text-brand-accent" />, desc: "From the first pixel to the last line of an SEO audit, we deliver premium quality." },
    { title: "Results-Driven", icon: <Heart className="w-8 h-8 mb-4 text-brand-accent" />, desc: "Aesthetics matter, but results matter more. Will this help the client's business grow?" },
    { title: "Customization", icon: <Settings className="w-8 h-8 mb-4 text-brand-accent" />, desc: "No two businesses are the same. We reject generic, one-size-fits-all solutions." },
    { title: "Partnership", icon: <Users className="w-8 h-8 mb-4 text-brand-accent" />, desc: "Your success is our success, and we invest heavily in long-term relationships." },
    { title: "Affordability", icon: <IndianRupee className="w-8 h-8 mb-4 text-brand-accent" />, desc: "We make world-class digital services accessible to businesses of every size." },
  ];

  return (
    <div className="w-full relative bg-brand-bg text-brand-text min-h-screen pt-32">
      <div className="noise-overlay" />
      
      {/* Hero Section */}
      <section className="relative max-w-[1440px] mx-auto px-6 lg:px-[5vw] py-24">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 uppercase">About Us.</h1>
        <p className="text-xl md:text-3xl text-brand-text-secondary leading-relaxed font-medium max-w-4xl">
          Founded with the belief that every business deserves a powerful digital presence, we've grown into a full-service agency delivering 25+ services across 12+ industries.
        </p>
      </section>

      {/* Timeline Section */}
      <section className="relative max-w-[1440px] mx-auto px-6 lg:px-[5vw] py-24">
        <h3 className="text-sm font-mono text-brand-accent tracking-widest uppercase mb-16 border-b border-brand-border-strong pb-4">Our Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {timeline.map((item, i) => (
            <div key={i} className="flex flex-col gap-4 border-l-2 border-brand-border hover:border-brand-accent transition-colors duration-500 pl-6 relative group">
              <div className="absolute top-0 left-[-7px] w-3 h-3 rounded-full bg-brand-accent scale-0 group-hover:scale-100 transition-transform duration-300" />
              <div className="text-xs font-mono text-brand-text-muted">{item.year}</div>
              <h4 className="text-2xl font-bold text-brand-text">{item.title}</h4>
              <p className="text-sm text-brand-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative max-w-[1440px] mx-auto px-6 lg:px-[5vw] py-24 mb-24">
        <h3 className="text-sm font-mono text-brand-accent tracking-widest uppercase mb-16 border-b border-brand-border-strong pb-4">Core Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <div key={i} className="glass p-10 rounded-3xl border border-brand-border hover:border-brand-accent/50 transition-colors flex flex-col group">
              {value.icon}
              <h4 className="text-2xl font-bold text-brand-text group-hover:text-brand-accent transition-colors mb-4">{value.title}</h4>
              <p className="text-brand-text-secondary leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
