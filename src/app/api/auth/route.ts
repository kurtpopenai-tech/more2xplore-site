import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import * as jose from 'jose'

// In production, these would come from your Supabase database
// For initial setup, use these env vars or hard-code a hash
const ADMIN_USERS = [
  {
    email: 'gary@more2xplore.co.za',
    // Default password: "m2xadmin2024" — change this immediately after setup
    passwordHash: '$2a$10$l2Xx7.CD8kRIyVmLCMBEcuaqdcOZzuMG8z1yE3G1CVgD5md0xRSxi',
  },
]

// POST: Login
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const user = ADMIN_USERS.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Create JWT
    const secret = new TextEncoder().encode(
      process.env.ADMIN_JWT_SECRET || 'dev-secret-change-this'
    )
    const token = await new jose.SignJWT({ email: user.email, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret)

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE: Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('admin_token')
  return response
}
