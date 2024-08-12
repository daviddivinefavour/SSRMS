import {
  createCourseEnrollment,
  getAcademicSessionsQuery,
  getCoursesForAcademicSession,
} from '@/queries/supabase.queries'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const sessionId = searchParams.get('sessionId')!
  const level = searchParams.get('level')!
  const semester = searchParams.get('semester')!

  const courses = await getCoursesForAcademicSession({
    level,
    semester,
    sessionId,
  })
  if (!courses.isSuccess) {
    return new NextResponse('Failed to fetch course list', {
      status: 422,
      statusText: 'Unprocessable Entity',
    })
  }
  return NextResponse.json({
    message: 'Successfully fetched courses',
    data: courses.data,
  })
}
