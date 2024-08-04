import {
  getAcademicSessionsQuery,
  getCoursesForAcademicSession,
} from '@/queries/supabase.queries'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const sessions = await getAcademicSessionsQuery()

  if (!sessions.isSuccess) {
    return new NextResponse('Unprocessable Entity', {
      status: 422,
      statusText: 'Unprocessable Entity',
    })
  }
  return NextResponse.json({
    message: 'Successfully fetched sessions',
    data: sessions.data,
  })
}
