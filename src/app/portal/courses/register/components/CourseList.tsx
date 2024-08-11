import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'

export type TCourseObj = {
  id: number
  title: string
  code: string
  credit_unit: number
}

export const CourseList = ({
  sessionId,
  level,
  semester,
  onCoursesSelected,
}: {
  sessionId: string
  level: string
  semester: number
  onCoursesSelected: (selectedCourses: TCourseObj[]) => void
}) => {
  const [selectedCourses, setSelectedCourses] = useState<TCourseObj[]>([])

  const fetchCourses = async () => {
    const url = `/api/courses?sessionId=${sessionId}&level=${level}&semester=${semester}`
    const response = await fetch(url)
    const res = await response.json()
    return res.data
  }

  const { data, error, isLoading } = useQuery('courses', fetchCourses)

  const handleCheckboxChange = (course: TCourseObj, checked: boolean) => {
    setSelectedCourses((prevSelectedCourses) => {
      if (checked) {
        return [...prevSelectedCourses, course]
      } else {
        return prevSelectedCourses.filter((c) => c.id !== course.id)
      }
    })
  }

  useEffect(() => {
    onCoursesSelected(selectedCourses)
  }, [selectedCourses, onCoursesSelected])

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
                <Checkbox
                  id={`course_${id}`}
                  onCheckedChange={(checked: boolean) =>
                    handleCheckboxChange(courseObj, checked)
                  }
                />
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
