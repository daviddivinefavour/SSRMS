'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import Cookies from 'js-cookie'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { verifyUser } from '@/app/(root)/hooks/useValidateStudent'
import { LoadingSpinner } from '../LoadingSpinner'
import { hashString } from '@/lib/bcryptjs'

const formSchema = z.object({
  email: z
    .string({ required_error: 'email is required' })
    .email('Must be a valid email address'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
})

type UserFormValue = z.infer<typeof formSchema>

export default function UserAuthForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const defaultValues = {
    email: '',
    password: '',
  }
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const handleSubmit = async (data: UserFormValue) => {
    setLoading(true)
    setFormError(null)
    const { email, password } = data
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (response?.error) {
      setFormError(
        'Something went wrong. Please check your email and password and try again.'
      )
      setLoading(false)
      return
    }

    const validateResponse = await verifyUser({
      email,
      password,
    })

    if (!validateResponse.isSuccess) {
      setFormError(
        'Something went wrong. Please check your email and password and try again.'
      )
      setLoading(false)
      return
    }

    Cookies.set('kenpoly_T', hashString(validateResponse.data?.id))
    setLoading(false)
    router.push('/portal')
    router.refresh()
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-2 w-full"
        >
          {formError && <FormError error={formError} />}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    disabled={loading}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setFormError(null)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="pr-10"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password..."
                      disabled={loading}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setFormError(null)
                      }}
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeClosedIcon className="w-6 h-6" />
                      ) : (
                        <EyeOpenIcon className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className="w-full bg-main-primary-main/95 hover:bg-main-primary-80"
            type="submit"
          >
            {loading ? <LoadingSpinner /> : 'Login'}
          </Button>
        </form>
      </Form>
    </>
  )
}

type FormErrorProps = {
  error: string
}

function FormError({ error }: FormErrorProps) {
  return (
    <div className="flex items-center gap-x-2 justify-center text-fittok-primary-50 text-md-regular">
      <ExclamationTriangleIcon className="h-[16px] w-[16px]" />
      <AlertDescription>{error}</AlertDescription>
    </div>
  )
}
