import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(4).max(160),
  message: z.string().trim().min(10).max(5000),
  botCheck: z.string().max(200).optional(),
});

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0];
  if (contentType !== "application/json") {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form fields and try again." },
        { status: 400 },
      );
    }

    const { name, email, subject, message, botCheck } = parsed.data;
    if (botCheck) {
      return NextResponse.json({ success: true });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: "The contact service is temporarily unavailable. Please use the email link instead." },
        { status: 503 },
      );
    }

    const resend = new Resend(resendApiKey);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["samarthsin2006@gmail.com"],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #4a6cf7; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="margin: 20px 0;">
            <p><strong>From:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #4a6cf7;">${safeEmail}</a></p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">${safeMessage}</div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend request failed");
      return NextResponse.json(
        { error: "Failed to send the message. Please use the email link instead." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch {
    return NextResponse.json(
      { error: "The contact service is temporarily unavailable. Please use the email link instead." },
      { status: 500 },
    );
  }
}
