import { NextRequest, NextResponse } from 'next/server'
import { getCoursesForAcademicSession } from '@/queries/supabase.queries'

export const GET = async (req: NextRequest) => {
  console.log(req)

  const url = new URL(req.url)
  const sessionId = url.pathname.split('/').pop()
  const level = url.searchParams.get('level')
  const semester = url.searchParams.get('semester')

  if (!sessionId) {
    return new NextResponse('Bad Request', { status: 400 })
  }
  const courses = await getCoursesForAcademicSession({
    level: level as string,
    semester: semester as string,
    sessionId: sessionId as string,
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
