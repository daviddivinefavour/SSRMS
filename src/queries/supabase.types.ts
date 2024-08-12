export type TCourse = {
  id: string
  title: string
  description: string
  level: string
  semester: number
  session_id: string
  is_deprecated: boolean
  code: string
  credit_unit: number
}

export type TSession = {
  id: string
  session_name: string
}

export type TCreateEnrollment = {
  courseIds: string[]
  sessionId: string
  studentId: string
  semester: number
  level: string
}
