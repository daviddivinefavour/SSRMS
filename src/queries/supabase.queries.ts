import { supabase } from '@/lib/supabase'
import { TSupaBaseResponse } from '@/types/query.types'
import { v4 } from 'uuid'
import { TCourse, TCreateEnrollment, TSession } from './supabase.types'

enum ENTITIES {
  SESSION = 'sessions',
  USER = 'users',
  COURSE = 'courses',
}

export const getAcademicSessionsQuery = async (): Promise<
  TSupaBaseResponse<TSession[]>
> => {
  const { data, error } = await supabase.from(ENTITIES.SESSION).select('*')
  if (!data || error) {
    console.error('Failed to fetch available sessions')
    return {
      isSuccess: false,
    }
  }
  return {
    isSuccess: true,
    data: data as TSession[],
  }
}

export const getCoursesForAcademicSession = async ({
  sessionId,
  level,
  semester,
}: {
  sessionId: string
  level: string
  semester: string
}) => {
  const { data, error } = await supabase
    .from(ENTITIES.COURSE)
    .select('*')
    .eq('session_id', sessionId)
    .eq('level', level)
    .eq('semester', semester)

  if (!data || error) {
    console.error('Failed to fetch available courses')
    return {
      isSuccess: false,
    }
  }

  return {
    isSuccess: true,
    data,
  }
}

export const createCourseEnrollment = async (
  options: TCreateEnrollment
): Promise<TSupaBaseResponse<void>> => {
  const bulkData = options.courseIds.map((course_id: string) => ({
    id: v4(),
    session_id: options.sessionId,
    student_id: options.studentId,
    semester: options.semester,
    level: options.level,
    course_id,
  }))

  const { error } = await supabase.from('enrollments').insert(bulkData)
  if (error) {
    console.error('Failed to enroll to selected courses')
    return {
      isSuccess: false,
    }
  }
  return {
    isSuccess: true,
  }
}
