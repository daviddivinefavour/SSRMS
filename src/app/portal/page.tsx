"use client";
import Image from "next/image";
import moment from "moment";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = () => {
  const today = moment().format("MMMM D, YYYY");
  const coursePercentage = 66;
  const assessmentPercentage = 80;
  const projectPercentage = 90;
  return (
    <>
      <Card className="py-3">
        <CardContent>
          <div className="flex justify-between">
            <div>
              <small className="block text-[#5a5a5a]">{today}</small>
              <div className="mt-5">
                <h1 className="font-bold text-2xl">Welcome back, Jame!</h1>
                <p className="text-sm">
                  Always stay updated in your school portal
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

      <div className="grid grid-cols-12 gap-4 mt-[50px]">
        <div className="col-span-7">
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
                  <a href="" className="text-main-primary-main text-[.75rem]">
                    View all &#8594;
                  </a>
                </div>
                <TabsContent value="firstSemester">
                  <div className="mt-4">
                    <CourseTable columns={columns} tableData={movies} />
                  </div>
                </TabsContent>
                <TabsContent value="secondSemester">
                  <div className="mt-4">
                    <CourseTable columns={columns} tableData={movies} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        {/* <div className="col-span-2"></div> */}
        <div className="col-span-5">
          <h1 className="mb-2 font-semibold">Cumulative Grade</h1>
          <Card>
            <CardContent className="flex flex-col justify-between  py-2 gap-1">
              <div className="flex justify-between items-center py-2 gap-1 border-b">
                <div>
                  <h4 className="font-semibold text-sm">Course Progress</h4>
                  <p className="text-xs text-gray-400 mt-2">5 Completed</p>
                  <small className="text-green-700 text-[.65rem] mt-[20px] block">
                    2.76% &#8593; &#8593;
                  </small>
                </div>
                <div style={{ width: 100, height: 100 }}>
                  <CircularProgressbar
                    value={coursePercentage}
                    text={`${coursePercentage}%`}
                    styles={{
                      path: {
                        // Path color
                        stroke: `rgba(254, 98, 2)`,
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                      text: {
                        fill: "#fe6202",
                        fontSize: "16px",
                      },
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center py-2 gap-1 border-b">
                <div>
                  <h4 className="font-semibold text-sm">Assessment Progress</h4>
                  <p className="text-xs text-gray-400 mt-2">7 Completed</p>
                  <small className="text-green-700 text-[.65rem] mt-[20px] block">
                    4.76% &#8593; &#8593;
                  </small>
                </div>
                <div style={{ width: 100, height: 100 }}>
                  <CircularProgressbar
                    value={assessmentPercentage}
                    text={`${assessmentPercentage}%`}
                    styles={{
                      path: {
                        // Path color
                        stroke: `rgba(21, 128, 61 )`,
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                      text: {
                        fill: "#15803d",
                        fontSize: "16px",
                      },
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center py-2 gap-1">
                <div>
                  <h4 className="font-semibold text-sm">Project Progress</h4>
                  <p className="text-xs text-gray-400 mt-2">1 Completed</p>
                  <small className="text-green-700 text-[.65rem] mt-[20px] block">
                    1.76% &#8593; &#8593;
                  </small>
                </div>
                <div style={{ width: 100, height: 100 }}>
                  <CircularProgressbar
                    value={projectPercentage}
                    text={`${projectPercentage}%`}
                    styles={{
                      path: {
                        // Path color
                        stroke: `rgba(0, 37, 243, 1)`,
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                      text: {
                        fill: "#0027f2",
                        fontSize: "16px",
                      },
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

const movies = [
  {
    id: 1,
    title: "COMPUTER TECHNOLOGY I (OO BASIC)",
    code: "Com 211",
    unit: "4",
    grade: 4,
    status: "Approved",
  },
  {
    id: 2,
    title: "INTRODUCTION TO SYSTEM PROGRAMMING",
    code: "Com 212",
    unit: "4",
    grade: 4,
    status: "Approved",
  },
  {
    id: 3,
    title: "COMMERCIAL PROGRAMMING LANGUAGE",
    code: "Com 213",
    unit: "4",
    grade: 4,
    status: "Approved",
  },
  {
    id: 4,
    title: "FILE ORG. & MANAGEMENT",
    code: "Com 214",
    unit: "4",
    grade: 4,
    status: "Approved",
  },
];

const columns = [
  {
    accessorKey: "title",
    header: "Course Title",
    className: "px-3 py-3 font-medium w-2/4",
    formatter: (data: any, _) => (
      <>
        <p className="font-semibold text-[.75rem] uppercase">{data.code}</p>
        <small className="text-[10px]">{data.title}</small>
      </>
    ),
  },
  {
    accessorKey: "unit",
    header: "Credit Unit",
    className: "px-3 py-3 font-medium flex justify-center items-center w-1/6",
    formatter: (data: any, _) => (
      <p className="font-normal text-[.75rem]">{data.unit}</p>
    ),
  },
  {
    accessorKey: "grade",
    header: "Grade",
    className: "px-3 py-3 font-medium flex justify-center items-center w-1/6",
    formatter: (data: any, _) => (
      <p className="font-normal text-[.75rem]">{data.grade}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    className: "px-3 py-3 font-medium w-1/6 flex justify-start items-center",
    formatter: (data: any, _) => (
      <p className="font-normal text-[.65rem] bg-green-100 text-green-700 rounded text-center uppercase px-1">
        {data.status}
      </p>
    ),
  },
];

type TCoursColumnProp = {
  accessorKey: string;
  header: string;
  className?: string;
  formatter?: (data: any, id?: string | number) => React.ReactNode;
};

type TCourseTableProp = {
  columns: TCoursColumnProp[];
  tableData: any[];
};
export const CourseTable = ({ columns, tableData }: TCourseTableProp) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right grid">
      <thead className="text-xs text-gray-700 uppercase font-medium">
        <tr className="flex border-b">
          {columns.map((column, id) => (
            <th key={id} scope="col" className={`${column.className}`}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, id) => (
          <tr key={id} className="border-b last:border-none flex">
            {columns.map((col, idx) => (
              <td key={idx} className={`${col.className}`}>
                {col.formatter !== undefined
                  ? col.formatter(data, id)
                  : data[`${col.accessorKey}`]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
