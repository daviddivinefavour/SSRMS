import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export type TCourseObj = {
  id: number;
  title: string;
  code: string;
  unit: number;
};

const courseList: TCourseObj[] = [
  {
    id: 1,
    title: "COMPUTER TECHNOLOGY I (OO BASIC)",
    code: "Com 211",
    unit: 4,
  },
  {
    id: 2,
    title: "INTRODUCTION TO SYSTEM PROGRAMMING",
    code: "Com 212",
    unit: 4,
  },
  {
    id: 3,
    title: "COMMERCIAL PROGRAMMING LANGUAGE",
    code: "Com 213",
    unit: 4,
  },
  {
    id: 4,
    title: "FILE ORG. & MANAGEMENT",
    code: "Com 214",
    unit: 4,
  },
];

export const CourseList = ({
  addToSelectedCourses,
  removeFromSelectedCourses,
}) => {
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
        {courseList.map((courseObj: TCourseObj) => {
          const { id, ...courseDetails } = courseObj;
          return (
            <TableRow key={courseObj.code}>
              <TableCell className="text-right">
                <Checkbox id={`course_${id}`} />
              </TableCell>
              {Object.values(courseDetails).map((cellItem, index) => (
                <TableCell className="font-medium" key={`${cellItem}_${index}`}>
                  {cellItem}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const AddButton = ({
  addToSelectedCourses,
  removeFromSelectedCourses,
  course,
}) => {
  const [registerCourse, setRegisterCourse] = React.useState(false);
  const handleButtonClick = () => {
    setRegisterCourse((prev) => {
      if (prev) {
        removeFromSelectedCourses(course.id);
      } else {
        addToSelectedCourses(course);
      }

      return !prev;
    });
  };
  return (
    <Button
      variant={!registerCourse ? "outline" : "destructive"}
      size={"sm"}
      onClick={handleButtonClick}
    >
      {!registerCourse ? "Add" : "Remove"}
    </Button>
  );
};
