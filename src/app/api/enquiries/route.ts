import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface EnquiryItem {
  id: string
  name: string
  quantity: number
  price: number | null
  priceType: string
}

function formatPrice(price: number | null, priceType: string): string {
  if (priceType === 'on_request' || price === null) return 'Price on Request'
  const formatted = `R${price.toLocaleString()}`
  if (priceType === 'from') return `From ${formatted}`
  return formatted
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, eventDate, message, items } = body as {
      name: string
      email: string
      phone: string
      eventDate?: string
      message?: string
      items: EnquiryItem[]
    }

    if (!name || !email || !phone || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Build items table
    const itemsHtml = items
      .map(
        (item: EnquiryItem) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(item.price, item.priceType)}</td>
        </tr>`
      )
      .join('')

    const emailHtml = `
      <h2>New Equipment Rental Enquiry</h2>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;"><a href="tel:${phone}">${phone}</a></td></tr>
        ${eventDate ? `<tr><td style="padding: 8px; font-weight: bold;">Event Date:</td><td style="padding: 8px;">${eventDate}</td></tr>` : ''}
      </table>

      <h3>Items Requested:</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 10px; text-align: left;">Item</th>
            <th style="padding: 10px; text-align: center;">Qty</th>
            <th style="padding: 10px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      ${message ? `<h3>Additional Notes:</h3><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
    `

    // Send email
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
      subject: `Equipment Rental Enquiry from ${name} (${items.length} items)`,
      html: emailHtml,
    })

    // Also send confirmation to the customer
    await transporter.sendMail({
      from: `"More2Xplore Event Solutions" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your More2Xplore Rental Enquiry',
      html: `
        <h2>Thank you for your enquiry, ${name}!</h2>
        <p>We've received your rental enquiry and will get back to you shortly with availability and pricing.</p>
        ${emailHtml.replace('<h2>New Equipment Rental Enquiry</h2>', '')}
        <hr>
        <p style="color: #888; font-size: 12px;">
          More2Xplore Event Solutions<br>
          083 516 02 42 | 084 407 3494<br>
          gary@more2xplore.co.za | roxy@more2xplore.co.za
        </p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Enquiry submission error:', error)
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 })
  }
}
