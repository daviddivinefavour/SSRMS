'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CourseList, TCourseObj } from './components/CourseList'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { usePaystackPayment } from 'react-paystack'
import { v4 as uuid } from 'uuid'
import { useQuery } from 'react-query'

const levels = [
  { value: 'ND1', label: 'ND I' },
  { value: 'ND2', label: 'ND II' },
  { value: 'HND1', label: 'HND I' },
  { value: 'HND2', label: 'HND II' },
]

export default function RegisterCourses() {
  const [selectedCourses, setSelectedCourses] = useState<TCourseObj[]>([])
  const [showCourseTable, setShowCourseTable] = useState(false)
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null)

  const addToSelectedCourses = (course: TCourseObj) => {
    setSelectedCourses([...selectedCourses, course])
  }

  const removeFromSelectedCourses = (id: number) => {
    setSelectedCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== id)
    )
  }

  const handleFetchCourse = () => {
    if (selectedSession && selectedLevel && selectedSemester !== null) {
      setShowCourseTable(true)
    } else {
      alert('Please select session, level, and semester.')
    }
  }

  const config = {
    reference: uuid(),
    email: 'student1@example.com', // Hardcoded email
    amount: 50000, // Amount in Kobo, e.g., 50000 Kobo = N500
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  }

  const initializePayment = usePaystackPayment(config)

  const { data, error, isLoading } = useQuery(
    'academic sessions',
    fetchSessions
  )

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {'Unable to fetch sessions, try again later.'}</p>

  return (
    <>
      <div className="mb-5">
        <h3 className="font-semibold text-2md">Register Courses</h3>
      </div>
      <div className="grid grid-cols-4 gap-x-3 col-auto">
        <div className="col-span-1">
          <Card>
            <CardContent className="px-2 pt-2">
              <div className="mt-4">
                <Label className="mb-3 block font-semibold">
                  Select Session
                </Label>
                <Select onValueChange={(value) => setSelectedSession(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Please select session" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.map((session: any) => (
                      <SelectItem
                        value={session.session_name}
                        key={session.session_name}
                      >
                        {session.session_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4">
                <Label className="mb-3 block font-semibold">Select Level</Label>
                <Select onValueChange={(value) => setSelectedLevel(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Please select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4">
                <Label className="mb-3 block font-semibold">Semester</Label>
                <Select
                  onValueChange={(value) => setSelectedSemester(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Please Select a semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">First Semester</SelectItem>
                    <SelectItem value="2">Second Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-10">
                <Button
                  className="w-full hover:bg-secondary hover:text-black"
                  onClick={handleFetchCourse}
                  disabled={
                    !selectedSession ||
                    !selectedLevel ||
                    selectedSemester === null
                  }
                >
                  Process
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3">
          <div className="col-span-3">
            {showCourseTable && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <h4 className="mb-2 font-semibold">Available Courses</h4>
                  </div>
                </CardHeader>
                <CardContent className="px-2 pt-2">
                  <CourseList
                    level={selectedLevel!}
                    sessionId={
                      data.find(
                        (session: any) =>
                          session.session_name === selectedSession
                      )?.id!
                    }
                    semester={selectedSemester!}
                  />
                  <hr />
                  <div className="flex justify-end mt-10">
                    <AlertDialog>
                      <AlertDialogTrigger className="bg-black rounded-lg text-[#ffffff] w-full py-3 px-3 hover:bg-secondary hover:text-black">
                        Continue
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            You would need to pay ₦500.00 to register the
                            course(s). Do you want to proceed?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              initializePayment({ onSuccess, onClose })
                            }}
                          >
                            Proceed
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const onSuccess = (reference: string) => {
  // Handle successful payment here
  console.log('Successfully completed payment, reference ID: ', reference)
}

const onClose = () => {
  // Handle Paystack dialog closure here
  console.log('Paystack dialog closed')
}

const fetchSessions = async () => {
  const response = await fetch('/api/sessions')
  const res = await response.json()
  return res.data
}
