"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CourseTable } from "../page";
import Image from "next/image";
import { dummyAvatarUrl } from "../_components/molecules/Navbar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { db } from "@/database/config";
import { supabase } from "@/lib/supabase";

const movies = [
  {
    id: 1,
    title: "COMPUTER TECHNOLOGY I (OO BASIC)",
    code: "Com 211",
    unit: "4",
    lecturer: {
      name: "Dr. Phia P.Z",
      image: "",
    },
    status: "Approved",
  },
  {
    id: 2,
    title: "INTRODUCTION TO SYSTEM PROGRAMMING",
    code: "Com 212",
    unit: "4",
    lecturer: {
      name: "Dr. Phia P.Z",
      image: "",
    },
    status: "Approved",
  },
  {
    id: 3,
    title: "COMMERCIAL PROGRAMMING LANGUAGE",
    code: "Com 213",
    unit: "4",
    lecturer: {
      name: "Dr. Phia P.Z",
      image: "",
    },
    status: "Enrol Now",
  },
  {
    id: 4,
    title: "FILE ORG. & MANAGEMENT",
    code: "Com 214",
    unit: "4",
    lecturer: {
      name: "Dr. Phia P.Z",
      image: "",
    },
    status: "Approved",
  },
];

const columns = [
  {
    accessorKey: "title",
    header: "Course Title",
    className: "px-3 py-3 font-medium w-2/3",
    formatter: (data: any, _) => (
      <>
        <p className="font-semibold text-[.75rem] uppercase">{data.code}</p>
        <small className="text-[10px]">{data.title}</small>
      </>
    ),
  },
  {
    accessorKey: "title",
    header: "Lecturer",
    className: "px-3 py-3 font-medium w-1/6",
    formatter: (data: any, _) => (
      <div className="flex gap-1">
        <Image
          src={dummyAvatarUrl}
          width={20}
          height={20}
          className="rounded-full"
          alt="lecturer"
        />
        <p className="text-[10px]">{data.lecturer.name}</p>
      </div>
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
    accessorKey: "status",
    header: "Status",
    className: "px-3 py-3 font-medium w-1/6 flex justify-start items-center",
    formatter: (data: any, _) => (
      <p
        className={`font-normal text-[.65rem] ${
          data.status === "Enrol Now"
            ? "bg-main-primary-main cursor-pointer text-white px-2"
            : data.status === "Approved"
            ? "bg-green-100 text-green-700"
            : ""
        }  rounded text-center uppercase px-1`}
      >
        {data.status}
      </p>
    ),
  },
];

const sessions = [
  {
    label: "2023/2024",
    value: "2023/2024",
  },
  {
    label: "2022/2023",
    value: "2022/2023",
  },
];

const Courses = () => {
  return (
    <>
      <div className="flex justify-between mb-5">
        <div className="">
          <h1 className="font-bold text-2xl">Courses</h1>
          <p className="font-normal text-sm my-1">
            Program: Higher National Diploma (HND 1) - Fulltime{" "}
          </p>
          <p className="font-normal text-sm">Session: 2023/2024</p>
        </div>
        <div className="">
          <SelectSession sessions={sessions} />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-12 gap-4 ">
          <div className="col-span-9">
            <h4 className="mb-2 font-semibold">Courses ()</h4>
            <Card>
              <CardContent className="px-2 pt-2">
                <CourseTable columns={columns} tableData={movies} />
              </CardContent>
            </Card>
          </div>
          <div className="col-span-3">
            <h4 className="mb-2 font-semibold">Carry Over</h4>
            <Card>
              <CardContent className="px-2 pt-2">
                <ul>
                  <li></li>
                </ul>
              </CardContent>
            </Card>

            <h4 className="mb-2 font-semibold">Repeat</h4>
            <Card>
              <CardContent className="px-2 pt-2">
                <ul>
                  <li></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
type TSelectSession = {
  label: string;
  value: string;
};

type TSelectionProps = {
  sessions: TSelectSession[];
};

export const SelectSession = ({ sessions }: TSelectionProps) => {
  return (
    <Select>
      <p className="font-semibold mb-2">Sessions</p>
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
  );
};
