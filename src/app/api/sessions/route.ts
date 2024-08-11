import {
  getAcademicSessionsQuery,
  getCoursesForAcademicSession,
} from '@/queries/supabase.queries'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const sessions = await getAcademicSessionsQuery()
  if (!sessions.isSuccess) {
    return new NextResponse('Could not fetch sessions', {
      status: 422,
      statusText: 'Unprocessable Entity',
    })
  }
  return NextResponse.json({
    status: 200,
    message: 'Successfully fetched sessions',
    data: sessions.data,
  })
}
