import { supabase } from '@/lib/supabase'
import { compareSync, hashSync } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
type Student = {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
}
type Data = {
  message?: string
  user?: Student
  error?: string
}

const getStudentByEmail = async (email: string) => {
  try {
    const dataResponse = await supabase
      .from('users')
      .select('*')
      .eq('email', email)

    if (!dataResponse.data) return false
    return dataResponse.data[0]
  } catch (error) {
    console.log('Error fetching one student\n', error)
    return false
  }
}
const validateStudentPassword = (password: string, hashedPassword: string) =>
  compareSync(password, hashedPassword)

const verifyUser = async (
  email: string,
  password: string
): Promise<{ isSuccess: boolean; data?: Student }> => {
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

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return new NextResponse('Invalid credentials', {
        status: 400,
        statusText: 'Bad request',
      })
    }

    const user = await verifyUser(email, password)
    if (user.isSuccess) {
      return NextResponse.json({
        message: 'Login successful',
        user: user.data,
      })
    }

    return new NextResponse('Invalid credentials', {
      status: 401,
      statusText: 'Unauthorized',
    })
  } catch (error) {
    return new NextResponse('Internal Server Error', {
      status: 500,
    })
  }
}
