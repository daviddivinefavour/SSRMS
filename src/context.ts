import { createContext } from 'react'
import { TAuthUser } from './app/api/auth/[...nextauth]/route'

export const PortalContext = createContext<TAuthUser | undefined>(undefined)
