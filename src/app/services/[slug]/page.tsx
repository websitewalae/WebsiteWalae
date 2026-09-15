import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import { ArrowRight, CheckCircle2, Sparkles, Phone, Mail, MapPin } from "lucide-react";

// ─── SERVICE DATA ──────────────────────────────────────────────────────────────

interface ServiceData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  description: string;
  whatItIs: string;
  whoItIsFor: string;
  whatWeDo: string[];
  process: { step: string; title: string; desc: string }[];
  deliverables: string[];
  whyItMatters: string;
  faq: { question: string; answer: string }[];
  relatedServices: { name: string; slug: string }[];
  keywords: string[];
}

const SERVICES_DATA: Record<string, ServiceData> = {
  "website-development-lucknow": {
    slug: "website-development-lucknow",
    title: "Website Development",
    metaTitle: "Website Development Company in Lucknow",
    metaDescription: "Website Walae is a website development company in Lucknow building custom Next.js websites, e-commerce platforms, and high-performance web applications for businesses.",
    h1: "Website Development Services in Lucknow",
    tagline: "Custom, high-performance websites built with modern technology.",
    description: "Website Walae builds custom websites and web applications using Next.js, React, and modern web technologies. We create fast, SEO-optimized, responsive digital platforms that help businesses establish a professional online presence and convert visitors into customers.",
    whatItIs: "Website development is the process of designing, building, and launching a professional website or web application for your business. A well-built website serves as your digital storefront, helping potential customers find you, learn about your services, and take action.",
    whoItIsFor: "Businesses in Lucknow and across India that need a professional website, e-commerce store, corporate portal, or custom web application. Whether you are a startup launching your first website or an established business upgrading from a legacy platform, we build solutions tailored to your goals.",
    whatWeDo: [
      "Custom Next.js & React website architecture",
      "E-commerce development with payment integration",
      "Responsive mobile-first design",
      "CMS integration (headless CMS, Supabase, WordPress)",
      "SEO-optimized structure and Core Web Vitals",
      "Interactive 3D, GSAP, and WebGL experiences",
      "API integrations and backend development",
      "Website maintenance and support",
    ],
    process: [
      { step: "01", title: "Discovery", desc: "We understand your business goals, target audience, and technical requirements." },
      { step: "02", title: "Design", desc: "We create wireframes and high-fidelity designs that reflect your brand identity." },
      { step: "03", title: "Development", desc: "We build your website with clean, performant code using modern frameworks." },
      { step: "04", title: "Launch", desc: "We deploy, test, and optimize your website for search engines and performance." },
    ],
    deliverables: [
      "Fully responsive custom website",
      "Content management system",
      "SEO foundation and sitemap",
      "Analytics integration",
      "Performance optimization (100/100 Lighthouse target)",
      "SSL certificate and security setup",
    ],
    whyItMatters: "Your website is often the first impression potential customers have of your business. A slow, outdated, or poorly designed website drives visitors away. A fast, professional, modern website builds trust and converts visitors into paying customers.",
    faq: [
      { question: "How much does website development cost in Lucknow?", answer: "Website development costs at Website Walae start from ₹15,000 for a basic custom website. Complex e-commerce platforms, web applications, and interactive experiences are quoted based on project scope and requirements." },
      { question: "How long does it take to build a website?", answer: "A standard business website typically takes 2-4 weeks. E-commerce platforms and complex web applications may take 4-8 weeks depending on features and integrations required." },
      { question: "Which company provides website development in Lucknow?", answer: "Website Walae is a website development company based in Lucknow that builds custom websites using Next.js, React, and modern web technologies. The agency serves businesses across Lucknow, Uttar Pradesh, and India." },
      { question: "Do you provide website maintenance after launch?", answer: "Yes, Website Walae provides ongoing website maintenance, updates, security monitoring, and technical support after launch." },
    ],
    relatedServices: [
      { name: "UI/UX Design", slug: "ui-ux-design-lucknow" },
      { name: "SEO", slug: "seo-lucknow" },
      { name: "Digital Marketing", slug: "digital-marketing-lucknow" },
    ],
    keywords: ["website development company in Lucknow", "web developer in Lucknow", "website design company in Lucknow"],
  },
  "digital-marketing-lucknow": {
    slug: "digital-marketing-lucknow",
    title: "Digital Marketing",
    metaTitle: "Digital Marketing Agency in Lucknow",
    metaDescription: "Website Walae is a digital marketing agency in Lucknow providing SEO, social media marketing, content creation, Meta Ads, and comprehensive digital growth strategies for businesses.",
    h1: "Digital Marketing Services in Lucknow",
    tagline: "Full-stack digital marketing that drives real business growth.",
    description: "Website Walae provides comprehensive digital marketing services that help businesses in Lucknow and across India grow their online presence, attract qualified leads, and convert them into customers. We combine SEO, social media, content marketing, and paid advertising into a unified growth strategy.",
    whatItIs: "Digital marketing is the use of online channels — search engines, social media, email, websites, and paid advertising — to promote your business and reach potential customers. Unlike traditional marketing, digital marketing allows precise targeting, measurement, and optimization of every campaign.",
    whoItIsFor: "Businesses in Lucknow and India looking to increase their online visibility, generate leads, drive sales, or build brand awareness through digital channels. Whether you need a full-stack digital strategy or specific channel expertise, we tailor our approach to your business goals.",
    whatWeDo: [
      "Digital marketing strategy and planning",
      "Search engine optimization (SEO)",
      "Social media marketing and management",
      "Content marketing and copywriting",
      "Meta Ads (Facebook & Instagram advertising)",
      "Google Ads management",
      "Email marketing campaigns",
      "Analytics, reporting, and ROI tracking",
    ],
    process: [
      { step: "01", title: "Audit", desc: "We analyze your current digital presence, competitors, and market opportunities." },
      { step: "02", title: "Strategy", desc: "We create a data-driven digital marketing plan aligned with your business goals." },
      { step: "03", title: "Execute", desc: "We implement campaigns across the right channels with optimized creative and targeting." },
      { step: "04", title: "Optimize", desc: "We continuously monitor performance and optimize for maximum ROI." },
    ],
    deliverables: [
      "Digital marketing strategy document",
      "Monthly campaign execution",
      "Content calendar and creative assets",
      "Performance dashboards and reports",
      "Lead tracking and attribution setup",
      "Quarterly strategy reviews",
    ],
    whyItMatters: "Today's customers discover businesses online before making purchasing decisions. Without a strong digital marketing strategy, you are invisible to potential customers who are actively searching for the services you offer.",
    faq: [
      { question: "What is the best digital marketing agency in Lucknow?", answer: "Website Walae is a digital marketing agency based in Lucknow offering end-to-end digital marketing services including SEO, social media marketing, content creation, video production, Meta Ads, and PR. The agency focuses on driving real business growth through measurable digital campaigns." },
      { question: "How much does digital marketing cost in Lucknow?", answer: "Digital marketing services at Website Walae start from ₹15,000 per month depending on the scope of services. Complete digital marketing packages including SEO, social media, and paid advertising are customized based on business requirements and goals." },
      { question: "How do I choose a digital marketing agency in Lucknow?", answer: "Look for an agency with a proven portfolio of real client work, transparent pricing, clear reporting, and a team that understands your industry. Website Walae provides a consultation to understand your goals before recommending a strategy." },
    ],
    relatedServices: [
      { name: "SEO", slug: "seo-lucknow" },
      { name: "Social Media Marketing", slug: "social-media-marketing-lucknow" },
      { name: "Meta Ads", slug: "meta-ads-lucknow" },
    ],
    keywords: ["digital marketing agency in Lucknow", "digital marketing company in Lucknow", "digital marketing near me"],
  },
  "seo-lucknow": {
    slug: "seo-lucknow",
    title: "SEO",
    metaTitle: "SEO Agency in Lucknow",
    metaDescription: "Website Walae is an SEO agency in Lucknow providing technical SEO, local SEO, on-page optimization, and organic search ranking growth for businesses in Lucknow and India.",
    h1: "SEO Services in Lucknow",
    tagline: "Organic search dominance through technical excellence.",
    description: "Website Walae provides comprehensive SEO services that help businesses rank higher on Google search results, attract organic traffic, and generate qualified leads without paying for ads. We combine technical SEO, content optimization, and local SEO to build sustainable search visibility.",
    whatItIs: "Search Engine Optimization (SEO) is the process of improving your website so it ranks higher in Google and other search engine results. When potential customers search for services you offer, SEO ensures your business appears at the top of the results, driving free organic traffic to your website.",
    whoItIsFor: "Businesses in Lucknow and India that want to rank on the first page of Google for their target keywords, attract organic traffic, and reduce dependency on paid advertising for lead generation.",
    whatWeDo: [
      "Technical SEO audit and optimization",
      "On-page SEO (meta tags, headings, content optimization)",
      "Local SEO and Google Business Profile optimization",
      "Keyword research and content strategy",
      "Core Web Vitals and page speed optimization",
      "Structured data (schema markup) implementation",
      "Link building and authority development",
      "Monthly SEO reporting and ranking tracking",
    ],
    process: [
      { step: "01", title: "Audit", desc: "We conduct a comprehensive technical and content audit of your current website." },
      { step: "02", title: "Research", desc: "We identify high-value keywords your potential customers are searching for." },
      { step: "03", title: "Optimize", desc: "We implement on-page, technical, and local SEO improvements across your site." },
      { step: "04", title: "Grow", desc: "We build authority through content and links while monitoring ranking progress." },
    ],
    deliverables: [
      "Complete technical SEO audit report",
      "Keyword research and strategy document",
      "On-page optimization across all pages",
      "Google Business Profile setup and optimization",
      "Schema markup implementation",
      "Monthly ranking and traffic reports",
    ],
    whyItMatters: "Over 90% of online experiences begin with a search engine. If your business does not appear on the first page of Google for relevant searches in Lucknow, you are losing customers to competitors who do.",
    faq: [
      { question: "Does Website Walae provide SEO?", answer: "Yes, Website Walae provides comprehensive SEO services including technical SEO, on-page optimization, local SEO, keyword research, and link building for businesses in Lucknow and across India." },
      { question: "How long does SEO take to show results?", answer: "SEO is a medium to long-term strategy. Initial improvements in technical SEO can be seen within weeks, while significant ranking improvements typically take 3-6 months depending on competition and keyword difficulty." },
      { question: "What is the difference between SEO and Google Ads?", answer: "SEO generates free organic traffic by improving your website's search rankings. Google Ads is paid advertising where you pay per click. SEO provides sustainable long-term traffic while paid ads stop generating traffic when you stop paying." },
    ],
    relatedServices: [
      { name: "Website Development", slug: "website-development-lucknow" },
      { name: "Content Creation", slug: "content-creation-lucknow" },
      { name: "Digital Marketing", slug: "digital-marketing-lucknow" },
    ],
    keywords: ["SEO agency in Lucknow", "SEO company Lucknow", "best SEO company in Lucknow"],
  },
  "social-media-marketing-lucknow": {
    slug: "social-media-marketing-lucknow",
    title: "Social Media Marketing",
    metaTitle: "Social Media Marketing Agency in Lucknow",
    metaDescription: "Website Walae is a social media marketing agency in Lucknow managing Instagram, Facebook, and LinkedIn growth strategies, content creation, and community engagement for businesses.",
    h1: "Social Media Marketing Services in Lucknow",
    tagline: "Strategic social media growth that builds real audiences.",
    description: "Website Walae provides social media marketing services that help businesses build engaged audiences, increase brand visibility, and drive customer inquiries through Instagram, Facebook, LinkedIn, and other social platforms.",
    whatItIs: "Social media marketing is the use of platforms like Instagram, Facebook, and LinkedIn to promote your business, engage with your audience, and drive traffic to your website. It includes content creation, community management, and paid social advertising.",
    whoItIsFor: "Businesses in Lucknow and India that want to build a strong social media presence, increase brand awareness, engage with their target audience, and generate leads through social platforms.",
    whatWeDo: [
      "Social media strategy and content planning",
      "Instagram, Facebook, and LinkedIn management",
      "Content calendar creation and execution",
      "Visual content design and copywriting",
      "Community management and engagement",
      "Influencer collaboration coordination",
      "Social media analytics and reporting",
      "Paid social advertising support",
    ],
    process: [
      { step: "01", title: "Audit", desc: "We analyze your current social presence, audience, and competitors." },
      { step: "02", title: "Strategy", desc: "We develop a content strategy aligned with your brand voice and business goals." },
      { step: "03", title: "Create", desc: "We produce engaging content and manage your social channels daily." },
      { step: "04", title: "Grow", desc: "We track engagement metrics and optimize content for maximum organic reach." },
    ],
    deliverables: [
      "Monthly content calendar",
      "Creative post designs and copy",
      "Daily community management",
      "Reel and short-form video content",
      "Monthly growth and engagement reports",
      "Hashtag and trend strategy",
    ],
    whyItMatters: "Social media is where your customers spend their time. A strategic social presence builds brand trust, keeps your business top of mind, and creates a direct channel for customer communication and lead generation.",
    faq: [
      { question: "Does Website Walae provide social media marketing?", answer: "Yes, Website Walae provides comprehensive social media marketing services including strategy, content creation, account management, community engagement, and growth tracking for Instagram, Facebook, LinkedIn, and other platforms." },
      { question: "How much does social media marketing cost in Lucknow?", answer: "Social media marketing services at Website Walae start from ₹15,000 per month. Packages are customized based on the number of platforms, posting frequency, and additional services like video content or paid advertising." },
      { question: "How long does it take to grow a social media audience?", answer: "Building a meaningful social media following takes consistent effort over 3-6 months. Results depend on content quality, posting frequency, industry, and audience engagement strategy." },
    ],
    relatedServices: [
      { name: "Content Creation", slug: "content-creation-lucknow" },
      { name: "Video Production", slug: "video-production-lucknow" },
      { name: "Meta Ads", slug: "meta-ads-lucknow" },
    ],
    keywords: ["social media marketing agency in Lucknow", "social media agency Lucknow", "Instagram marketing Lucknow"],
  },
  "ui-ux-design-lucknow": {
    slug: "ui-ux-design-lucknow",
    title: "UI/UX Design",
    metaTitle: "UI UX Design Agency in Lucknow",
    metaDescription: "Website Walae is a UI/UX design agency in Lucknow creating intuitive interfaces, design systems, and interactive prototypes for websites, apps, and digital products.",
    h1: "UI/UX Design Services in Lucknow",
    tagline: "Intuitive, beautiful interfaces designed for conversion.",
    description: "Website Walae creates user interface and user experience designs that are visually stunning, easy to use, and optimized for conversion. We design complete design systems, interactive prototypes, and responsive layouts in Figma before development begins.",
    whatItIs: "UI/UX design is the process of designing digital interfaces (UI) and user experiences (UX) that are visually appealing, intuitive, and effective at achieving business goals. Good UI/UX design ensures users can easily navigate your website or app and take desired actions.",
    whoItIsFor: "Businesses launching new websites, apps, or digital products who want a professional, user-centered design that looks premium and converts visitors into customers. Also suitable for existing businesses looking to redesign outdated interfaces.",
    whatWeDo: [
      "User research and information architecture",
      "Wireframing and low-fidelity prototyping",
      "High-fidelity UI design in Figma",
      "Interactive clickable prototypes",
      "Design system and component library creation",
      "Mobile-first responsive design",
      "Micro-interaction and animation design",
      "Design handoff for development",
    ],
    process: [
      { step: "01", title: "Research", desc: "We study your users, competitors, and business objectives." },
      { step: "02", title: "Architecture", desc: "We map user journeys and create information architecture." },
      { step: "03", title: "Design", desc: "We create high-fidelity Figma designs with interactive prototypes." },
      { step: "04", title: "Handoff", desc: "We deliver design-ready assets with specifications for development." },
    ],
    deliverables: [
      "Complete Figma design files",
      "Interactive prototype",
      "Design system with components",
      "Responsive layouts (desktop, tablet, mobile)",
      "Icon and illustration assets",
      "Design documentation and specifications",
    ],
    whyItMatters: "Users form opinions about your brand within seconds of landing on your website. Professional UI/UX design creates a positive first impression, reduces friction, and guides users toward conversion actions like inquiries and purchases.",
    faq: [
      { question: "What is UI/UX design?", answer: "UI (User Interface) design focuses on the visual elements of a digital product — colors, typography, buttons, and layouts. UX (User Experience) design focuses on how users interact with the product — navigation, flow, and overall usability. Together, they create digital experiences that are both beautiful and functional." },
      { question: "How much does UI/UX design cost?", answer: "UI/UX design at Website Walae is quoted based on project complexity. A standard website design project includes user research, wireframes, high-fidelity Figma designs, and interactive prototypes." },
      { question: "Do you provide design for mobile apps?", answer: "Yes, Website Walae designs interfaces for websites, mobile apps, and digital products. We create responsive designs that work across all screen sizes and devices." },
    ],
    relatedServices: [
      { name: "Website Development", slug: "website-development-lucknow" },
      { name: "Content Creation", slug: "content-creation-lucknow" },
      { name: "Digital Marketing", slug: "digital-marketing-lucknow" },
    ],
    keywords: ["UI UX design agency in Lucknow", "web design company in Lucknow", "website designer in Lucknow"],
  },
  "video-production-lucknow": {
    slug: "video-production-lucknow",
    title: "Video Production",
    metaTitle: "Video Production Company in Lucknow",
    metaDescription: "Website Walae is a video production company in Lucknow creating cinematic commercials, product videos, Instagram reels, and brand films for businesses.",
    h1: "Video Production Services in Lucknow",
    tagline: "Cinematic video content that captures attention and drives engagement.",
    description: "Website Walae produces high-quality video content including commercials, product videos, Instagram reels, and brand films. Our in-house production team handles everything from concept and scripting to shooting, editing, and color grading.",
    whatItIs: "Video production is the process of creating video content for marketing, branding, and advertising purposes. This includes commercial films, product videos, social media reels, and brand storytelling content shot and produced to professional standards.",
    whoItIsFor: "Businesses in Lucknow and India that need professional video content for social media, websites, advertising campaigns, or brand storytelling. Whether you need a single product video or an ongoing content production partnership.",
    whatWeDo: [
      "Commercial film production",
      "Product and lifestyle video shoots",
      "Instagram Reels and short-form video",
      "Storyboarding and scripting",
      "Professional video editing",
      "Color grading in DaVinci Resolve",
      "Motion graphics and VFX",
      "Sound design and audio mastering",
    ],
    process: [
      { step: "01", title: "Concept", desc: "We develop the creative concept, script, and storyboard." },
      { step: "02", title: "Production", desc: "We shoot on cinema cameras with professional lighting and audio." },
      { step: "03", title: "Post-Production", desc: "We edit, color grade, add motion graphics, and master audio." },
      { step: "04", title: "Delivery", desc: "We deliver optimized files for social media, web, and advertising." },
    ],
    deliverables: [
      "High-quality video files (4K/1080p)",
      "Social media optimized edits",
      "Color graded final master",
      "Motion graphics and titles",
      "Behind-the-scenes content",
      "Multiple format exports",
    ],
    whyItMatters: "Video content generates higher engagement, better conversion rates, and more reach than any other content format on social media and websites. Professional video production elevates your brand perception and drives real business results.",
    faq: [
      { question: "What kind of videos does Website Walae produce?", answer: "Website Walae produces commercial films, product videos, Instagram reels, short-form social media content, brand films, and promotional video content for businesses." },
      { question: "How much does video production cost in Lucknow?", answer: "Video production at Website Walae starts from ₹15,000. Pricing depends on the type of video, production complexity, shoot duration, and post-production requirements." },
      { question: "Do you handle the entire video production process?", answer: "Yes, Website Walae handles end-to-end video production including concept development, scripting, shooting, editing, color grading, motion graphics, and final delivery." },
    ],
    relatedServices: [
      { name: "Content Creation", slug: "content-creation-lucknow" },
      { name: "Social Media Marketing", slug: "social-media-marketing-lucknow" },
      { name: "Meta Ads", slug: "meta-ads-lucknow" },
    ],
    keywords: ["video production company in Lucknow", "video editing Lucknow", "commercial video Lucknow"],
  },
  "content-creation-lucknow": {
    slug: "content-creation-lucknow",
    title: "Content Creation",
    metaTitle: "Content Creation Agency in Lucknow",
    metaDescription: "Website Walae is a content creation agency in Lucknow providing brand photography, copywriting, creative direction, and multi-format content production for businesses.",
    h1: "Content Creation Services in Lucknow",
    tagline: "Creative content that tells your brand story and drives action.",
    description: "Website Walae creates compelling content across multiple formats — from brand photography and product shoots to persuasive copywriting and social media creative. We help businesses build content systems that consistently engage their target audience.",
    whatItIs: "Content creation is the process of producing visual, written, and multimedia content for marketing and branding purposes. This includes photography, graphic design, copywriting, social media posts, and creative assets that communicate your brand message.",
    whoItIsFor: "Businesses in Lucknow and India that need professional content for social media, websites, advertising, and marketing campaigns. Ideal for brands that lack in-house creative teams or need to scale their content output.",
    whatWeDo: [
      "Brand and product photography",
      "Graphic design and visual content",
      "Copywriting and ad scripting",
      "Social media content and carousel design",
      "Creative direction and art direction",
      "Content strategy and calendar planning",
      "Landing page and website copy",
      "Email marketing content",
    ],
    process: [
      { step: "01", title: "Brief", desc: "We understand your brand, audience, and content objectives." },
      { step: "02", title: "Plan", desc: "We create a content strategy and production schedule." },
      { step: "03", title: "Create", desc: "We produce high-quality content across required formats." },
      { step: "04", title: "Deliver", desc: "We provide organized content banks ready for publishing." },
    ],
    deliverables: [
      "Brand photography and product images",
      "Social media post designs",
      "Marketing copy and scripts",
      "Content calendar",
      "Ad creative assets",
      "Brand guidelines and templates",
    ],
    whyItMatters: "Consistent, high-quality content is the foundation of every successful marketing strategy. Professional content builds brand credibility, engages your audience, and provides the fuel for SEO, social media, and advertising campaigns.",
    faq: [
      { question: "What types of content does Website Walae create?", answer: "Website Walae creates brand photography, product images, social media posts, carousels, graphic designs, copywriting, ad scripts, landing page content, and comprehensive content strategies." },
      { question: "Can you handle ongoing content creation?", answer: "Yes, Website Walae provides monthly content creation packages that include regular content production, strategy updates, and content calendar management." },
    ],
    relatedServices: [
      { name: "Video Production", slug: "video-production-lucknow" },
      { name: "Social Media Marketing", slug: "social-media-marketing-lucknow" },
      { name: "Website Development", slug: "website-development-lucknow" },
    ],
    keywords: ["content creation agency Lucknow", "creative agency Lucknow", "brand photography Lucknow"],
  },
  "meta-ads-lucknow": {
    slug: "meta-ads-lucknow",
    title: "Meta Ads",
    metaTitle: "Meta Ads Agency in Lucknow",
    metaDescription: "Website Walae is a Meta Ads agency in Lucknow managing Facebook and Instagram advertising campaigns with audience targeting, creative testing, and ROI optimization.",
    h1: "Meta Ads Services in Lucknow",
    tagline: "Precision paid advertising engineered for measurable ROI.",
    description: "Website Walae manages Meta (Facebook & Instagram) advertising campaigns that generate leads, drive sales, and deliver measurable return on ad spend. We handle everything from strategy and creative production to audience targeting and performance optimization.",
    whatItIs: "Meta Ads is the advertising platform for Facebook and Instagram. It allows businesses to show targeted ads to specific audiences based on demographics, interests, behaviors, and custom data. When managed properly, Meta Ads can generate predictable leads and sales at scale.",
    whoItIsFor: "Businesses in Lucknow and India looking to generate leads, drive online sales, or build brand awareness through paid Facebook and Instagram advertising. Suitable for e-commerce, local services, real estate, clinics, and B2B companies.",
    whatWeDo: [
      "Meta Ads strategy and campaign planning",
      "Facebook and Instagram ad creation",
      "Audience research and custom targeting",
      "Conversion API and Pixel setup",
      "A/B creative testing and optimization",
      "Retargeting and lookalike audience campaigns",
      "Lead generation form campaigns",
      "Weekly performance reporting and budget optimization",
    ],
    process: [
      { step: "01", title: "Strategy", desc: "We define campaign objectives, target audiences, and budget allocation." },
      { step: "02", title: "Create", desc: "We produce ad creative and copy optimized for each campaign objective." },
      { step: "03", title: "Launch", desc: "We launch campaigns with proper tracking, targeting, and A/B testing." },
      { step: "04", title: "Scale", desc: "We optimize performing campaigns and scale budget toward highest ROAS." },
    ],
    deliverables: [
      "Campaign strategy document",
      "Ad creative and copy production",
      "Meta Pixel and Conversion API setup",
      "Audience targeting and segmentation",
      "Weekly performance reports",
      "Budget optimization recommendations",
    ],
    whyItMatters: "Meta Ads allow you to reach your ideal customers at scale with precise targeting. Properly managed campaigns generate predictable leads and sales, making your advertising spend a measurable investment rather than an expense.",
    faq: [
      { question: "Does Website Walae provide Meta Ads?", answer: "Yes, Website Walae provides comprehensive Meta Ads management including strategy, creative production, audience targeting, campaign optimization, and performance reporting for Facebook and Instagram advertising." },
      { question: "How much budget do I need for Meta Ads?", answer: "The minimum recommended monthly ad spend depends on your industry and goals. Website Walae can help you determine the right budget during a strategy consultation. Ad management fees are separate from ad spend." },
      { question: "How do Meta Ads generate leads for local businesses?", answer: "Meta Ads allow you to target potential customers in specific geographic areas (like Lucknow) based on demographics, interests, and behaviors. Lead generation campaigns can collect contact information directly within Facebook and Instagram." },
    ],
    relatedServices: [
      { name: "Social Media Marketing", slug: "social-media-marketing-lucknow" },
      { name: "Content Creation", slug: "content-creation-lucknow" },
      { name: "Digital Marketing", slug: "digital-marketing-lucknow" },
    ],
    keywords: ["Meta Ads agency in Lucknow", "Facebook ads Lucknow", "Instagram ads Lucknow"],
  },
  "pr-lucknow": {
    slug: "pr-lucknow",
    title: "PR / Public Relations",
    metaTitle: "PR Agency in Lucknow",
    metaDescription: "Website Walae is a PR agency in Lucknow providing digital PR, media outreach, press release support, brand PR, and reputation management services for businesses.",
    h1: "Public Relations Services in Lucknow",
    tagline: "Build credibility before you build attention.",
    description: "Website Walae provides public relations services that help businesses build credibility, manage their online reputation, and gain media visibility. We combine digital PR strategies with content-driven outreach to establish your brand as a trusted authority in your industry.",
    whatItIs: "Public Relations (PR) is the practice of managing how your brand is perceived by the public, media, and industry. It includes media outreach, press releases, reputation management, and strategic communications that build trust and credibility for your business.",
    whoItIsFor: "Businesses in Lucknow and India that want to build brand credibility, gain media coverage, manage their online reputation, or establish thought leadership in their industry. Suitable for startups launching new products, established businesses seeking media visibility, and brands managing their public perception.",
    whatWeDo: [
      "Brand PR strategy and positioning",
      "Digital PR and online reputation management",
      "Media outreach and journalist relations",
      "Press release writing and distribution",
      "Crisis communication planning",
      "Thought leadership content",
      "Online brand visibility campaigns",
      "Industry event and launch PR",
    ],
    process: [
      { step: "01", title: "Assessment", desc: "We audit your current brand perception and identify PR opportunities." },
      { step: "02", title: "Strategy", desc: "We develop a PR plan with key messages, target media, and timelines." },
      { step: "03", title: "Outreach", desc: "We execute media outreach, produce press materials, and manage communications." },
      { step: "04", title: "Monitor", desc: "We track media coverage, brand mentions, and sentiment to measure impact." },
    ],
    deliverables: [
      "PR strategy and messaging framework",
      "Press releases and media kits",
      "Media outreach and follow-up",
      "Online reputation monitoring",
      "Brand mention tracking reports",
      "Crisis communication guidelines",
    ],
    whyItMatters: "Credibility is the foundation of every successful brand. PR builds the trust and authority that advertising alone cannot achieve. A strong PR presence ensures that when potential customers research your business, they find positive, authoritative information.",
    faq: [
      { question: "Does Website Walae provide PR services?", answer: "Yes, Website Walae provides public relations services including brand PR, digital PR, media outreach, press release support, and online reputation management for businesses in Lucknow and across India." },
      { question: "What is digital PR?", answer: "Digital PR is the practice of using online channels — including news websites, blogs, social media, and digital publications — to build brand visibility and credibility. It often includes securing online media coverage, building backlinks, and managing online brand perception." },
      { question: "What is the difference between PR and advertising?", answer: "Advertising is paid promotion where you control the message and placement. PR is earned media coverage and reputation management where third parties (journalists, publications, influencers) validate your brand. PR builds credibility that advertising alone cannot achieve." },
    ],
    relatedServices: [
      { name: "Content Creation", slug: "content-creation-lucknow" },
      { name: "Social Media Marketing", slug: "social-media-marketing-lucknow" },
      { name: "Digital Marketing", slug: "digital-marketing-lucknow" },
    ],
    keywords: ["PR agency in Lucknow", "public relations Lucknow", "digital PR India"],
  },
};

// ─── STATIC PARAMS ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

// ─── METADATA ──────────────────────────────────────────────────────────────────

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: `https://websitewalae.com/services/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://websitewalae.com/services/${service.slug}`,
      siteName: "Website Walae",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "https://websitewalae.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `${service.title} — Website Walae`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: ["https://websitewalae.com/og-image.png"],
    },
  };
}

// ─── PAGE COMPONENT ────────────────────────────────────────────────────────────

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  // Structured Data — Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Website Walae",
      url: "https://websitewalae.com",
      telephone: "+917317782998",
      email: "websitewalae@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Halwasiya Market",
        addressLocality: "Hazratganj",
        addressRegion: "Uttar Pradesh",
        postalCode: "226001",
        addressCountry: "IN",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Lucknow",
    },
    url: `https://websitewalae.com/services/${service.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://websitewalae.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://websitewalae.com/services" },
      { "@type": "ListItem", position: 3, name: service.title, item: `https://websitewalae.com/services/${service.slug}` },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text pt-28 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="noise-overlay" />

      {/* Breadcrumb */}
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] pt-4 pb-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs font-mono text-brand-text-muted">
          <li><Link href="/" className="hover:text-brand-accent transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link href="/services" className="hover:text-brand-accent transition-colors">Services</Link></li>
          <li>/</li>
          <li className="text-brand-accent">{service.title}</li>
        </ol>
      </nav>

      {/* Hero Header */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] pb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-accent bg-brand-accent/10 border border-brand-accent/30 px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{service.title.toUpperCase()}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
          {service.h1}
        </h1>

        <p className="text-xl sm:text-2xl text-brand-text-secondary max-w-3xl font-medium leading-relaxed mb-8">
          {service.tagline}
        </p>

        <p className="text-base sm:text-lg text-brand-text-secondary max-w-4xl leading-relaxed">
          {service.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-accent text-black font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(202,255,0,0.4)] hover:scale-105"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/20 text-white font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white/10"
          >
            VIEW PRICING
          </Link>
        </div>
      </section>

      {/* What It Is & Who It's For */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-16 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-4">What Is {service.title}?</h2>
            <p className="text-brand-text-secondary leading-relaxed">{service.whatItIs}</p>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-4">Who Is This For?</h2>
            <p className="text-brand-text-secondary leading-relaxed">{service.whoItIsFor}</p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-16 border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-8">What We Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.whatWeDo.map((item, i) => (
            <div key={i} className="flex items-start gap-3 glass p-4 rounded-xl border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-white/90">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-16 border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-8">Our Process</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((step) => (
            <div key={step.step} className="glass p-6 rounded-2xl border border-white/10 group hover:border-brand-accent/50 transition-all duration-300">
              <div className="text-3xl font-black text-brand-accent/40 font-mono mb-3 group-hover:text-brand-accent transition-colors">{step.step}</div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">{step.title}</h3>
              <p className="text-sm text-brand-text-secondary">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-16 border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-8">Deliverables</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.deliverables.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
              <span className="text-sm text-white/80">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why It Matters */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-16 border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-4">Why {service.title} Matters</h2>
        <p className="text-lg text-brand-text-secondary leading-relaxed max-w-3xl">{service.whyItMatters}</p>
      </section>

      {/* FAQ Section (Visible — AEO) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-16 border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-8">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-6 max-w-3xl">
          {service.faq.map((f, i) => (
            <div key={i} className="glass p-6 rounded-2xl border border-white/10">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3">{f.question}</h3>
              <p className="text-sm text-brand-text-secondary leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Services */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-16 border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-8">Related Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {service.relatedServices.map((rel) => (
            <Link
              key={rel.slug}
              href={`/services/${rel.slug}`}
              className="glass p-6 rounded-2xl border border-white/10 hover:border-brand-accent/50 transition-all duration-300 group flex items-center justify-between"
            >
              <span className="font-bold text-white group-hover:text-brand-accent transition-colors">{rel.name}</span>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-16">
        <div className="relative rounded-3xl overflow-hidden border border-brand-accent/30 p-8 sm:p-14 lg:p-20 bg-gradient-to-br from-[#0c1404] via-[#080808] to-[#040404] text-center flex flex-col items-center shadow-[0_0_80px_rgba(199,255,61,0.1)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,255,61,0.12),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Want {service.title} for Your Business?
            </h2>
            <p className="text-brand-text-secondary text-lg mb-8">
              Tell us about your project and we&apos;ll create a tailored plan for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start-a-project"
                className="px-8 py-4 rounded-full bg-brand-accent text-black font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(202,255,0,0.4)] inline-flex items-center gap-2"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+917317782998"
                className="px-6 py-4 rounded-full text-brand-text-secondary hover:text-brand-accent transition-colors font-mono text-sm inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>+91 73177 82998</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
