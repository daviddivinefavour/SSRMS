import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { LuLogOut } from 'react-icons/lu'

const LogOutButton = () => {
  return (
    <Button
      className="flex w-full rounded-lg items-center text-[.85rem] font-medium text-[#ffffff] 
              px-4 py-2 gap-2  bg-main-primary-main"
      variant={'ghost'}
      onClick={() => signOut()}
    >
      <LuLogOut className="text-[20px]" />
      {'Logout'}
    </Button>
  )
}

export default LogOutButton
