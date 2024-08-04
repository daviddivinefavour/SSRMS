"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseList, TCourseObj } from "./components/CourseList";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePaystackPayment } from "react-paystack";
import { v4 as uuid } from "uuid";
import { useAuth } from "@/context/auth.context";

type TSelectSession = {
  label: string;
  value: string;
};

type TSelectionProps = {
  sessions: TSelectSession[];
};

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

const levels = [
  { value: "nd-one", label: "ND I" },
  { value: "nd-two", label: "ND II" },
  { value: "hnd-one", label: "HND I" },
  { value: "hnd-two", label: "HND II" },
];

export default function RegisterCourses() {
  const [selectedCourses, setSelectedCourses] = useState<TCourseObj[]>([]);
  const [showCourseTable, setShowCourseTable] = useState(false);

  const addToSelectedCourses = (course: TCourseObj) => {
    setSelectedCourses([...selectedCourses, course]);
  };

  const removeFromSelectedCourses = (id: number) => {
    setSelectedCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== id)
    );
  };

  const handleFetchCourse = () => {
    //TODO: while Check if the user has selected a course already in this collection and disable that course hence it's selected by that student already
    setShowCourseTable(true);
  };

  const config = {
    reference: uuid(),
    email: "student1@example.com", // Hardcoded email
    amount: 50000, // Amount in Kobo, e.g., 50000 Kobo = N500
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const onSuccess = (reference: string) => {
    // Handle successful payment here
    console.log("Successfully completed payment, reference ID: ", reference);
  };

  const onClose = () => {
    // Handle Paystack dialog closure here
    console.log("Paystack dialog closed");
  };

  const initializePayment = usePaystackPayment(config);
  /*
  You can get the user from the global context like this
  const { user } = useAuth();
  console.log("user------------", user);
  */
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
                <Button
                  className="w-full hover:bg-secondary hover:text-black"
                  onClick={handleFetchCourse}
                >
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
                    <AlertDialog>
                      <AlertDialogTrigger className="bg-black rounded-lg text-[#ffffff] w-full py-3 px-3 hover:bg-secondary hover:text-black">
                        Continue
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            You would need to pay ₦500.00 to register the
                            course(s). Do you want to proceed?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              initializePayment({ onSuccess, onClose });
                            }}
                          >
                            Proceed
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// const SelectSession = ({ sessions }: TSelectionProps) => {
//   return (
//     <Select>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Select a session" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           {sessions.map((item) => (
//             <SelectItem key={item.value} value={item.value}>
//               {item.label}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   )
// }
