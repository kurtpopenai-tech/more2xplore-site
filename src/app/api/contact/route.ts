import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, email, phone, company, eventType, eventDate, message, _honey } = body

    // Honeypot check
    if (_honey) {
      return NextResponse.json({ success: true }) // silently succeed for bots
    }

    // Basic validation
    if (!fullName || !email || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Build email content
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${fullName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;"><a href="tel:${phone}">${phone}</a></td></tr>
        ${company ? `<tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${company}</td></tr>` : ''}
        ${eventType ? `<tr><td style="padding: 8px; font-weight: bold;">Event Type:</td><td style="padding: 8px;">${eventType}</td></tr>` : ''}
        ${eventDate ? `<tr><td style="padding: 8px; font-weight: bold;">Event Date:</td><td style="padding: 8px;">${eventDate}</td></tr>` : ''}
      </table>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `

    // Send email via SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const recipients = process.env.CONTACT_EMAIL_TO || 'gary@more2xplore.co.za,roxy@more2xplore.co.za'

    await transporter.sendMail({
      from: `"More2Xplore Website" <${process.env.SMTP_USER}>`,
      to: recipients,
      replyTo: email,
      subject: `New Enquiry from ${fullName}${eventType ? ` - ${eventType}` : ''}`,
      html: emailHtml,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
