import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { useQuery } from 'react-query'

export type TCourseObj = {
  id: number
  title: string
  code: string
  credit_unit: number
}

// const courseList: TCourseObj[] = [
//   {
//     id: 1,
//     title: 'COMPUTER TECHNOLOGY I (OO BASIC)',
//     code: 'Com 211',
//     credit_unit: 4,
//   },
//   {
//     id: 2,
//     title: 'INTRODUCTION TO SYSTEM PROGRAMMING',
//     code: 'Com 212',
//     credit_unit: 4,
//   },
//   {
//     id: 3,
//     title: 'COMMERCIAL PROGRAMMING LANGUAGE',
//     code: 'Com 213',
//     credit_unit: 4,
//   },
//   {
//     id: 4,
//     title: 'FILE ORG. & MANAGEMENT',
//     code: 'Com 214',
//     credit_unit: 4,
//   },
// ]

export const CourseList = ({
  sessionId,
  level,
  semester,
}: {
  sessionId: string
  level: string
  semester: number
}) => {
  const fetchCourses = async () => {
    const url = `/api/courses?sessionId=${sessionId}&level=${level}&semester=${semester}`
    const response = await fetch(url)
    const res = await response.json()
    return res.data
  }

  const { data, error, isLoading } = useQuery('courses', fetchCourses)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {'Unable to fetch courses, try again later.'}</p>
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Course Title</TableHead>
          <TableHead>Course Code</TableHead>
          <TableHead>Credit Unit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((courseObj: TCourseObj) => {
          const { id, title, code, credit_unit } = courseObj
          return (
            <TableRow key={courseObj.code}>
              <TableCell className="text-right">
                <Checkbox id={`course_${id}`} />
              </TableCell>
              <TableCell className="font-medium">{title}</TableCell>
              <TableCell className="font-medium">{code}</TableCell>
              <TableCell className="font-medium">{credit_unit}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
