import type { Metadata } from "next";
import StartProjectClient from "./StartProjectClient";

export const metadata: Metadata = {
  title: "Website Walae | Start a Project",
  description: "Start your next digital project with Website Walae. Tell us what you're building, and we'll figure out the rest.",
  keywords: ["Start a Project", "Hire Digital Agency", "Web Development Inquiry", "SEO Quote"],
};

export default function StartProjectPage() {
  return <StartProjectClient />;
}
