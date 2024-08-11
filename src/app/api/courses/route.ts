import {
  getAcademicSessionsQuery,
  getCoursesForAcademicSession,
} from '@/queries/supabase.queries'
import { NextRequest, NextResponse } from 'next/server'

//  http://localhost:3000/api/courses?sessionId=8e0dc54f-b2ee-4e82-9b4c-fc4ad1476eb7&level=ND1&semester=2
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
    return new NextResponse('Unprocessable Entity', {
      status: 422,
      statusText: 'Unprocessable Entity',
    })
  }
  return NextResponse.json({
    message: 'Successfully fetched courses',
    data: courses.data,
  })
}
