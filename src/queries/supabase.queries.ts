import { supabase } from '@/lib/supabase'
import { TSupaBaseResponse } from '@/types/query.types'

enum ENTITIES {
  SESSION = 'sessions',
  USER = 'users',
  COURSE = 'courses',
}

type TSession = {
  id: string
  session_name: string
}
export const getAcademicSessionsQuery = async (): Promise<
  TSupaBaseResponse<TSession[]>
> => {
  const sessions = await supabase.from(ENTITIES.SESSION).select('*')
  if (!sessions.data || sessions.error) {
    console.error('Failed to fetch available sessions')
    return {
      isSuccess: false,
    }
  }
  return {
    isSuccess: true,
    data: sessions.data as TSession[],
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
  const courses = await supabase
    .from(ENTITIES.COURSE)
    .select('*')
    .eq('session_id', sessionId)
    .eq('level', level)
    .eq('semester', semester)

  if (!courses.data || courses.error) {
    console.error('Failed to fetch available courses')
    return {
      isSuccess: false,
    }
  }
  return {
    isSuccess: true,
    data: courses.data as TSession[],
  }
}
