import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Website Walae | Contact",
  description: "Get in touch with Website Walae to discuss your next digital project. Call us directly or start a project inquiry.",
  keywords: ["Contact Website Walae", "Digital Agency Contact", "Hire Web Developer Lucknow"],
};

export default function ContactPage() {
  return <ContactPageClient />;
}
