'use client'
import UserAuthForm from '@/components/forms/user-auth-form'
import Button from '../portal/_components/atoms/Button'
import Heading from '../portal/_components/atoms/Heading'
import InputField from '../portal/_components/atoms/InputField'
import { useForm } from 'react-hook-form'

// type TLoginAttributes = {
//   email: string
//   password: string
// }
export default function Home() {
  return (
    <>
      <div className="mb-[40px]">
        <Heading
          type="h2"
          className="text-[#000] text-[20px] leading-[19.5px]"
          fontWeight="font-bold"
        >
          Welcome back
        </Heading>
        <p className="text-base text-[#898B8C] font-normal mb-[42px] leading-[19.5px] mt-3">
          Sign in to continue...
        </p>
      </div>
      <UserAuthForm />
    </>
  )
}
