import { supabase } from '@/lib/supabase'

const getStudentByEmail = async (email: string) => {
  try {
    return supabase.from('students').select().eq('email', email)
  } catch (error) {
    console.log('Get User by Email: ', error)
  }
}

export async function GET() {}

export async function POST(request: any) {
  const { email, password } = request.json()

  const student = await getStudentByEmail(email)
  console.log('\n\n Student :', student)

  // TODO: Compare password;
}
