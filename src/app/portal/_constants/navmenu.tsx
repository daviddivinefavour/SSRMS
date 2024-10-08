import {
  LuBook,
  LuLayoutDashboard,
  LuMenuSquare,
  LuLogOut,
} from 'react-icons/lu'

type MenuItem = {
  url: string
  title: string
  icon: React.ReactNode
  special?: string
}

const students: MenuItem[] = [
  {
    url: '/portal',
    title: 'Dashboard',
    icon: <LuLayoutDashboard className="text-[20px]" />,
  },
  {
    url: '/portal/courses',
    title: 'Courses',
    icon: <LuMenuSquare className="text-[20px]" />,
  },
  {
    url: '/portal/courses/register',
    title: 'Course Registration',
    icon: <LuMenuSquare className="text-[20px]" />,
  },
]

export const sidebarItems = {
  students,
}
