// library imports
import { signOut } from 'next-auth/react'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const result = await signOut()

    // handle the result of the sign-out attempt
    if (!result || result.error) {
      return NextResponse.json({ error: 'Error during sign-out' })
    } else {
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('Error during sign-out', error)
    return NextResponse.error()
  }
}
