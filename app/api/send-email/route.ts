import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  // Simple early check to ensure we're returning valid JSON even if things fail
  if (request.headers.get('content-type') !== 'application/json') {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  try {
    // Get API key and ensure it exists
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('Missing API key in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error', details: 'Missing API key' },
        { status: 500 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Initialize resend with API key
    const resend = new Resend(resendApiKey);
    
    console.log(`Sending email from ${email} to samarthsin2006@gmail.com`);
    
    // Send email
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['samarthsin2006@gmail.com'],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #4a6cf7; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #4a6cf7;">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="font-size: 12px; color: #666; margin-top: 30px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
            <p>This message was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
    });
    
    // Handle possible error from Resend
    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message },
        { status: 500 }
      );
    }
    
    console.log('Email sent successfully with ID:', data?.id);
    
    // Success response
    return NextResponse.json({ success: true, message: 'Email sent successfully', id: data?.id });
    
  } catch (error: any) {
    // Log error for debugging
    console.error('Email sending failed:', error);
    
    // Always return JSON, even on error
    return NextResponse.json(
      { error: 'Server error', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}