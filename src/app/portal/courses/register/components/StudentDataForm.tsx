'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const studentSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  matNo: z
    .string()
    .length(9, 'must have a length of 9 characters')
    .refine((value) => {
      if (!/^[A-Z]{2}\d{2}\/\d{4}$/i.test(value)) {
        throw new Error('Invalid Matriculation Number format (XXNN/XXXX)')
      }
      return true
    }),
})

const StudentDataForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      matNo: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof studentSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="matNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matric No</FormLabel>
              <FormControl>
                <Input placeholder="NS00/0001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size={'lg'}
          variant={'outline'}
          className="bg-main-primary-main/10 text-main-primary-main  hover:text-main-primary-main"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default StudentDataForm
