'use client'
import Button from '../portal/_components/atoms/Button'
import Heading from '../portal/_components/atoms/Heading'
import InputField from '../portal/_components/atoms/Input'
import { useForm } from 'react-hook-form'

type TLoginAttributes = {
  email: string
  password: string
}
export default function Home() {
  const {
    formState: { isLoading, errors },
    register,
    handleSubmit,
  } = useForm()

  const authenticateUser = async (loginDTO) => {
    console.log('Request body: ', loginDTO)

    // const url = '/api/students'
    // const response = await fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify(loginDTO),
    // })

    // const data = await response.json()
    // console.log(data)
  }

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
      <div>
        <InputField
          label="Email"
          placeholder="student@example.com"
          type="email"
          className="mb-[20px]"
          register={register}
          name="email"
          id="email"
        />
        <InputField
          label="Password"
          placeholder="!#@$ABcd!!1234"
          type="password"
          className="mb-[48px]"
          name="password"
          register={register}
          id="password"
        />
        <Button
          type="button"
          variant="default"
          size="lg"
          onClick={handleSubmit(authenticateUser)}
          className="w-full bg-main-primary-main/95 hover:bg-main-primary-main"
        >
          Login
        </Button>
      </div>
    </>
  )
}
