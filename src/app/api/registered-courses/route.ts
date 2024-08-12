import {
  createCourseEnrollment,
  getAcademicSessionsQuery,
  getCoursesForAcademicSession,
  getEnrolledCoursesForAcademicSession,
} from '@/queries/supabase.queries'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const { sessionId, studentId, semester, level, courseIds } =
      await req.json()

    const enrolled = await createCourseEnrollment({
      sessionId,
      studentId,
      semester,
      level,
      courseIds,
    })
    if (!enrolled.isSuccess) {
      return new NextResponse('Failed to enroll for courses', {
        status: 422,
        statusText: 'Unprocessable Entity',
      })
    }
    return NextResponse.json({
      message: 'Successfully enrolled courses',
      data: enrolled.data,
    })
  } catch (error) {
    console.log('Error from api', error)
    return new NextResponse('Internal Server Error', {
      status: 500,
    })
  }
}

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const userId = searchParams.get('userId')!
  const sessionId = searchParams.get('sessionId')!

  try {
    const courses = await getEnrolledCoursesForAcademicSession({
      sessionId,
      userId,
    })
    if (!courses.isSuccess) {
      return new NextResponse('Failed to fetch registered courses', {
        status: 422,
        statusText: 'Unprocessable Entity',
      })
    }
    return NextResponse.json({
      message: 'Successfully fetched registered courses',
      data: courses.data,
    })
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Server Error', {
      status: 500,
    })
  }
}
