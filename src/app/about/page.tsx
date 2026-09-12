import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "Website Walae | About Our Digital Creative Studio",
  description: "Learn about Website Walae, a digital creative studio combining creative, design, technology, content, and digital marketing to build ecosystems.",
  keywords: ["Website Walae", "Digital Creative Studio", "About Us", "Creative Agency"],
};

export default function AboutPage() {
  return <AboutPageClient />;
}
