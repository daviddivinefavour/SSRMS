import { validateStudentPassword } from '@/lib/bcryptjs'
import { supabase } from '@/lib/supabase'

type Data = {
  message?: string
  user?: Student
  error?: string
}
type Student = {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
}

const getStudentByEmail = async (email: string) => {
  try {
    const dataResponse = await supabase
      .from('students')
      .select('*')
      .eq('email', email)

    if (!dataResponse.data) return false
    return dataResponse.data[0]
  } catch (error) {
    console.log('Error fetching one student\n', error)
    return false
  }
}

export const verifyUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<{ isSuccess: boolean; data?: Student }> => {
  const student = await getStudentByEmail(email)
  if (!student) {
    return {
      isSuccess: false,
    }
  }

  const isValidCredentials = validateStudentPassword(
    password,
    student.hashed_password
  )
  if (!isValidCredentials) {
    return {
      isSuccess: false,
    }
  }
  delete student.hashed_password
  return {
    isSuccess: true,
    data: student,
  }
}
