import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Website Walae | Digital Marketing & Creative Services",
  description: "Explore our premium services including Website Development, UI/UX Design, SEO, Social Media Marketing, Content Creation, Video Production, and Meta Ads.",
  keywords: ["Digital Marketing Services", "Web Development Agency", "UI UX Design", "SEO Services", "Video Production", "Meta Ads"],
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
