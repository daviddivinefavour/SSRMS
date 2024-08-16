import {
  createCourseEnrollment,
  getAcademicSessionsQuery,
  getAllCoursesForASessionAndLevel,
  getCoursesForAcademicSession,
} from '@/queries/supabase.queries'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const sessionId = searchParams.get('sessionId')!
  const level = searchParams.get('level')!
  const semester = searchParams.get('semester')!

  const courses = semester
    ? await getCoursesForAcademicSession({
        level,
        semester,
        sessionId,
      })
    : await getAllCoursesForASessionAndLevel({ sessionId, level })
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
