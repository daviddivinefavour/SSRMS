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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import SelectedCourseCard from './components/SelectedCourseCard'
import { useState } from 'react'
import StudentDataForm from './components/StudentDataForm'

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
  { key: 'nd-one', value: 'ND I' },
  { key: 'nd-two', value: 'ND II' },
  { key: 'hnd-one', value: 'HND I' },
  { key: 'hnd-two', value: 'HND II' },
]

const dummyCourses: TCourseObj[] = [
  // {
  //   id: 1,
  //   title: 'COMPUTER TECHNOLOGY I (OO BASIC)',
  //   code: 'Com 211',
  //   unit: 4,
  // },
  // {
  //   id: 2,
  //   title: 'INTRODUCTION TO SYSTEM PROGRAMMING',
  //   code: 'Com 212',
  //   unit: 4,
  // },
  // {
  //   id: 3,
  //   title: 'COMMERCIAL PROGRAMMING LANGUAGE',
  //   code: 'Com 213',
  //   unit: 4,
  // },
  // {
  //   id: 4,
  //   title: 'FILE ORG. & MANAGEMENT',
  //   code: 'Com 214',
  //   unit: 4,
  // },
]

const RegisterCourses = () => {
  const [selectedCourses, setSelectedCourses] = useState<TCourseObj[]>([])

  const addToSelectedCourses = (course: TCourseObj) => {
    setSelectedCourses([...selectedCourses, course])
  }

  const removeFromSelectedCourses = (id: number) => {
    setSelectedCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== id)
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-y-8">
        <section>
          <div className="flex justify-between mb-5">
            <div className="">
              <h3 className="font-semibold text-2md">Register Courses</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4">
            <div className="flex gap-1 py-2 col-auto">
              <Label htmlFor="level" className=" font-semibold">
                Level:
              </Label>
              <RadioGroup
                defaultValue={levels[0].key}
                className="flex justify-between"
              >
                {levels.map((level) => {
                  return (
                    <div
                      className="flex items-center space-x-2"
                      key={level.key}
                    >
                      <RadioGroupItem value={level.key} id={level.key} />
                      <Label htmlFor={level.key}>{level.value}</Label>
                    </div>
                  )
                })}
              </RadioGroup>
            </div>
            <div className="flex gap-1 py-2 col-auto">
              <Label htmlFor="session" className=" font-semibold">
                Sessions
              </Label>
              <SelectSession sessions={sessions} />
            </div>
            <div className="grid grid-cols-4 gap-x-3 col-auto">
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
            </div>
          </div>
        </section>
        <section>
          <div className="flex justify-between mb-5">
            <div className="">
              <h3 className="font-semibold text-2md">Student Data</h3>
            </div>
          </div>
          <Card>
            <CardHeader>
              <h4 className="mb-2 font-semibold">Profile Information</h4>
            </CardHeader>
            <CardContent className="px-2 pt-2 mx-2">
              <StudentDataForm />
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  )
}

export default RegisterCourses
type TSelectSession = {
  label: string
  value: string
}

type TSelectionProps = {
  sessions: TSelectSession[]
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
