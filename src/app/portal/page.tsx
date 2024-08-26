'use client'
import Image from 'next/image'
import moment from 'moment'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/context/auth.context'
import { useEffect, useState } from 'react'
import CourseTable from './_components/CourseTable'

const Dashboard = () => {
  const today = moment().format('MMMM D, YYYY')
  const { user, checkAuthUser } = useAuth()
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [firstSemesterCourses, setFirstSemesterCourses] = useState<any[]>([])
  const [secondSemesterCourses, setSecondSemesterCourses] = useState<any[]>([])

  const getSessions = async () => {
    const response = await fetch(`/api/sessions`)
    const data = await response.json()
    if (data.data) {
      const sess = data.data.map((item: any) => ({
        label: item.session_name,
        value: item.id,
      }))
      const date = new Date()
      const currentSession = `${date.getFullYear() - 1}/${date.getFullYear()}`
      const currentSess = sess.find(
        (item: any) => item.label === currentSession
      )
      if (!selectedSession) {
        setSelectedSession(currentSess?.value || null)
      }
    }
  }

  const getCourses = async () => {
    if (user?.id && selectedSession) {
      const a = await fetch(
        `/api/registered-courses?userId=${user.id}&sessionId=${selectedSession}`
      )
      const data = await a.json()
      if (data.data) {
        const firstSemester = data.data.filter(
          (item: any) => item.courses.semester == 1
        )
        const secondSemester = data.data.filter(
          (item: any) => item.courses.semester == 2
        )

        const firstCourses = firstSemester.map((item: any) => ({
          id: item.id,
          title: item.courses.title,
          code: item.courses.code,
          unit: item.courses.credit_unit,
          status: !item.is_deprecated ? 'Approved' : '',
        }))
        const secondCourses = secondSemester.map((item: any) => ({
          id: item.id,
          title: item.courses.title,
          code: item.courses.code,
          unit: item.courses.credit_unit,
          status: !item.is_deprecated ? 'Approved' : '',
        }))
        setFirstSemesterCourses(firstCourses)
        setSecondSemesterCourses(secondCourses)
      }
    }
  }

  useEffect(() => {
    if (!user) {
      checkAuthUser()
    }
  }, [user])

  useEffect(() => {
    getSessions()
  }, [])

  useEffect(() => {
    if (selectedSession) {
      getCourses()
    }
  }, [selectedSession])

  const columns = [
    {
      accessorKey: 'title',
      header: 'Course Title',
      className: 'px-3 py-3 font-medium w-2/4',
      formatter: (data: any) => (
        <>
          <p className="font-semibold text-[.75rem] uppercase">{data.code}</p>
          <small className="text-[10px]">{data.title}</small>
        </>
      ),
    },
    {
      accessorKey: 'unit',
      header: 'Credit Unit',
      className: 'px-3 py-3 font-medium flex justify-center items-end w-1/4',
      formatter: (data: any) => (
        <p className="font-normal text-[.75rem]">{data.unit}</p>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      className: 'px-3 py-3 font-medium w-1/4 flex justify-center items-end',
      formatter: (data: any) => (
        <p className="font-normal text-[.65rem] bg-green-100 text-green-700 rounded text-center uppercase px-1">
          {data.status}
        </p>
      ),
    },
  ]

  return (
    <>
      <Card className="py-3">
        <CardContent>
          <div className="flex justify-between">
            <div>
              <small className="block text-[#5a5a5a]">{today}</small>
              <div className="mt-5">
                <h1 className="font-bold text-2xl">
                  Welcome back, {user?.name ?? ''}!
                </h1>
                <p className="text-sm">
                  Always stay updated on your personified portal
                </p>
              </div>
            </div>
            <Image
              src="/assets/images/student.svg"
              width={200}
              height={500}
              alt="student"
            />
          </div>
        </CardContent>
      </Card>

      <div className="mt-[50px]">
        <h1 className="mb-2 font-semibold">Registered Courses</h1>
        <Card>
          <CardContent className="px-2 pt-2">
            <Tabs defaultValue="firstSemester" className="p-2">
              <div className="flex justify-between items-center">
                <div>
                  <TabsList>
                    <TabsTrigger value="firstSemester">
                      1st Semester
                    </TabsTrigger>
                    <TabsTrigger value="secondSemester">
                      2nd Semester
                    </TabsTrigger>
                  </TabsList>
                </div>
                <a
                  href="/portal/courses"
                  className="text-main-primary-main text-[.75rem]"
                >
                  View all &#8594;
                </a>
              </div>
              <TabsContent value="firstSemester">
                <div className="mt-4">
                  <CourseTable
                    columns={columns}
                    tableData={firstSemesterCourses}
                  />
                </div>
              </TabsContent>
              <TabsContent value="secondSemester">
                <div className="mt-4">
                  <CourseTable
                    columns={columns}
                    tableData={secondSemesterCourses}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Dashboard
