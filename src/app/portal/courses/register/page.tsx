'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CourseList, TCourseObj } from './components/CourseList'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getSession, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

type TSelectSession = {
  label: string
  value: string
}

type TSelectionProps = {
  sessions: TSelectSession[]
}

const sessions = [
  {
    label: '2023/2024',
    value: '2023/2024',
  },
  {
    label: '2022/2023',
    value: '2022/2023',
  },
]

const levels = [
  { value: 'nd-one', label: 'ND I' },
  { value: 'nd-two', label: 'ND II' },
  { value: 'hnd-one', label: 'HND I' },
  { value: 'hnd-two', label: 'HND II' },
]

export default async function RegisterCourses() {
  const [selectedCourses, setSelectedCourses] = useState<TCourseObj[]>([])
  const [showCourseTable, setShowCourseTable] = useState(false)

  const router = useRouter()
  const session = await getSession()

  if (!session) {
    return router.push('/')
  }

  const addToSelectedCourses = (course: TCourseObj) => {
    setSelectedCourses([...selectedCourses, course])
  }

  const removeFromSelectedCourses = (id: number) => {
    setSelectedCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== id)
    )
  }

  const handleFetchCourse = () => {
    //TODO: while Check if the user has selected a course already in this collection and disable that course hence it's selected by that student already
    setShowCourseTable(true)
  }

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
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Please select session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((session) => (
                      <SelectItem value={session.value} key={session.value}>
                        {session.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4">
                <Label className="mb-3 block font-semibold">Select Level</Label>
                <Select>
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
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Please Select a semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-semester">
                      First Semester
                    </SelectItem>
                    <SelectItem value="second-semester">
                      Second Semester
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-10">
                <Button className="w-full" onClick={handleFetchCourse}>
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
                    <p>Total Credit Unit: 0</p>
                  </div>
                </CardHeader>
                <CardContent className="px-2 pt-2">
                  <CourseList
                    addToSelectedCourses={addToSelectedCourses}
                    removeFromSelectedCourses={removeFromSelectedCourses}
                  />
                  <hr />
                  <div className="flex justify-end mt-10">
                    <Button className="" disabled={true}>
                      Save Selected Course(s)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex gap-1 py-2 col-auto">
            <Label htmlFor="level" className=" font-semibold">
              Level:
            </Label>

          </div>
          <div className="flex gap-1 py-2 col-auto">
            <Label htmlFor="session" className=" font-semibold">
              Sessions
            </Label>
            <SelectSession sessions={sessions} />
          </div> */}
      {/* <div className="grid grid-cols-4 gap-x-3 col-auto">
            <div className="col-span-3">
              <Card>
                <CardHeader>
                  <h4 className="mb-2 font-semibold">Available Courses</h4>
                </CardHeader>
                <CardContent className="px-2 pt-2">
                  <CourseList
                    addToSelectedCourses={addToSelectedCourses}
                    removeFromSelectedCourses={removeFromSelectedCourses}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="col-span-1">
              <SelectedCourseCard courses={selectedCourses} maxCredit={30} />
            </div>
          </div> */}
    </>
  )
}

const SelectSession = ({ sessions }: TSelectionProps) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a session" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sessions.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
