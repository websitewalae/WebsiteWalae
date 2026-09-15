"use server";

import { createClient } from "@/utils/supabase/server";
import { Resend } from "resend";

export async function submitProjectQuery(formData: any) {
  try {
    const supabase = await createClient();

    // 1. Insert into Supabase
    const { data: queryData, error: dbError } = await supabase
      .from("queries")
      .insert([
        {
          name: formData.name,
          business: formData.business,
          email: formData.email,
          phone: formData.phone,
          services: formData.services,
          budget: formData.budget,
          timeline: formData.timeline,
          details: formData.details,
          status: "new",
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      throw new Error("Failed to save query to database.");
    }

    // 2. Send Email via Resend (if API key is present)
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      
      const emailHtml = `
        <h2>New Project Inquiry from Website Walae</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Business/Brand:</strong> ${formData.business}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Services Needed:</strong> ${formData.services.join(", ")}</p>
        <p><strong>Budget:</strong> ${formData.budget || "Not Specified"}</p>
        <p><strong>Timeline:</strong> ${formData.timeline || "Not Specified"}</p>
        <h3>Project Details:</h3>
        <p>${formData.details.replace(/\n/g, '<br/>')}</p>
        <hr/>
        <p>Log in to the <a href="https://websitewalae.com/nomo">Admin Dashboard</a> to manage this lead.</p>
      `;

      await resend.emails.send({
        from: "Website Walae <onboarding@resend.dev>", // Default testing domain, user can change to their verified domain later
        to: "support@websitewalae.com",
        subject: `New Lead: ${formData.business} - ${formData.name}`,
        html: emailHtml,
        replyTo: formData.email,
      });
    } else {
      console.warn("RESEND_API_KEY not found. Database entry was created, but email was not sent.");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Submission error:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
