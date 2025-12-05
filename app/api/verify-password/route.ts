import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const LP_PASSWORD = process.env.LP_PASSWORD || 'default-password-123'
const LPCOPY_PASSWORD = process.env.LPCOPY_PASSWORD || 'default-password-456'

export async function POST(req: NextRequest) {
  try {
    const { password, pathname } = await req.json()

    // Determine which password to check based on pathname
    // Check /lpcopy first since /lp would match /lpcopy otherwise
    let correctPassword = ''
    let cookieName = ''

    if (pathname?.startsWith('/lpcopy')) {
      correctPassword = LPCOPY_PASSWORD
      cookieName = 'lpcopy_access'
    } else if (pathname?.startsWith('/lp')) {
      correctPassword = LP_PASSWORD
      cookieName = 'lp_access'
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid path' },
        { status: 400 }
      )
    }

    // Server-side logging for debugging
    console.log('=== PASSWORD VERIFICATION DEBUG ===')
    console.log('Pathname:', pathname)
    console.log('Received password length:', password?.length)
    console.log('Received password (first 3 chars):', password?.substring(0, 3) + '...')
    console.log('Expected password length:', correctPassword?.length)
    console.log('Expected password (first 3 chars):', correctPassword?.substring(0, 3) + '...')
    console.log('Passwords match:', password === correctPassword)
    console.log('Password comparison (strict):', password === correctPassword)
    console.log('Password comparison (trimmed):', password?.trim() === correctPassword?.trim())
    console.log('===================================')

    if (password === correctPassword) {
      // Set cookie that expires in 1 hour
      const cookieStore = await cookies()
      cookieStore.set(cookieName, 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour
        path: '/',
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { success: false, error: 'Incorrect password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Password verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}

