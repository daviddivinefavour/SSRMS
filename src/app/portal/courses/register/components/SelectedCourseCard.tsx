import { CardHeader, CardContent, Card, CardFooter } from '@/components/ui/card'
import { TCourseObj } from './CourseList'

type TSelectedCourseProps = {
  courses: TCourseObj[]
  maxCredit: number
}
const SelectedCourseCard = (props: TSelectedCourseProps) => {
  const totalCredits = props.courses.reduce(
    (total, course) => total + course.unit,
    0
  )

  return (
    <Card>
      <CardHeader>
        <h4 className="mb-2 font-semibold">Selected Courses</h4>
      </CardHeader>
      <CardContent>
        <ul>
          {props.courses.map((course, index) => (
            <>
              <li className="" key={index}>
                {course.title}
              </li>
              <br></br>
            </>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-3">
        <p>
          {props.courses.length > 0 ? 'Total Credits' : 'Total Credit'}:
          {totalCredits}
        </p>
        <p> Max Credits:{props.maxCredit}</p>
      </CardFooter>
    </Card>
  )
}

export default SelectedCourseCard
