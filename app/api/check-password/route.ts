import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const { pathname } = await req.json()

    // Determine which cookie to check based on pathname
    let cookieName = ''

    if (pathname?.startsWith('/lp')) {
      cookieName = 'lp_access'
    } else if (pathname?.startsWith('/lpcopy')) {
      cookieName = 'lpcopy_access'
    } else {
      return NextResponse.json({ authenticated: false })
    }

    const cookieStore = await cookies()
    const accessCookie = cookieStore.get(cookieName)

    return NextResponse.json({
      authenticated: accessCookie?.value === 'authenticated',
    })
  } catch (error) {
    console.error('Password check error:', error)
    return NextResponse.json({ authenticated: false })
  }
}

