"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CourseTable } from "../page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth.context";

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

const Courses = () => {
  const { user } = useAuth();
  const [session, setSession] = useState<TSelectSession[] | []>([]);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const getCourses = async () => {
    if (user?.level && selectedSession && selectedSession !== currentSession) {
      const a = await fetch(
        `/api/courses?sessionId=${selectedSession}&level=${user?.level}`
      );
      const data = await a.json();
      if (data.data) {
        const courses = data.data.map((item: any) => ({
          id: item.id,
          title: item.course_name,
          code: item.code,
          unit: item.credit_unit,
          status: !item.is_deprecated ? "Approved" : "",
        }));
        setCourses(courses);
      }
    }
  };

  const getSessions = async () => {
    const response = await fetch(`/api/sessions`);
    const data = await response.json();
    if (data.data) {
      const sess = data.data.map((item: any) => ({
        label: item.session_name,
        value: item.id,
      }));
      const date = new Date();
      const currentSession = `${date.getFullYear() - 1}/${date.getFullYear()}`;
      const currentSess = sess.find(
        (item: any) => item.label === currentSession
      );
      setSession(sess);

      // Set selected session only if it hasn't been set
      if (!selectedSession) {
        setSelectedSession(currentSess?.value || null);
      }
    }
  };

  useEffect(() => {
    getSessions();
  }, []);
  useEffect(() => {
    if (selectedSession) {
      getCourses();
    }
  }, [selectedSession]);

  return (
    <>
      <div className="flex justify-between mb-5">
        <div className="">
          <h1 className="font-bold text-2xl">Courses</h1>
          {user && (
            <p className="font-normal text-sm my-1">Level : {user.level}</p>
          )}
          {currentSession && (
            <p className="font-normal text-sm">Session: {currentSession}</p>
          )}
        </div>
        <div className="">
          <SelectSession
            sessions={session}
            setSelectedSession={setSelectedSession}
            setCurrentSession={setCurrentSession}
            selectedSession={selectedSession}
          />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-12 gap-4 ">
          <div className="col-span-9">
            {/* <h4 className="mb-2 font-semibold">Courses ()</h4> */}
            <Card>
              <CardContent className="px-2 pt-2">
                <CourseTable columns={columns} tableData={courses ?? []} />
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
  setSelectedSession: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentSession: React.Dispatch<React.SetStateAction<string | null>>;
  selectedSession: string | null;
};

export const SelectSession = ({
  sessions,
  setSelectedSession,
  setCurrentSession,
}: TSelectionProps) => {
  return (
    <Select
      onValueChange={(e) => {
        setSelectedSession(e);
        const currentSession = sessions.find((session) => session.value === e);
        setCurrentSession(currentSession!.label);
      }}
    >
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
