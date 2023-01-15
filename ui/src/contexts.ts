import { createContext } from 'react'
import { useDashboardContextValue } from './hooks/pages/Dashboard'
import useGameContextValue from './hooks/pages/Game'
import useLayoutContext from './hooks/pages/layout'
import { useUsersContextValue } from './hooks/pages/Users'

export const usersContext = createContext({} as ReturnType<typeof useUsersContextValue>)
export const dashboardContext = createContext({} as ReturnType<typeof useDashboardContextValue>)
export const gameContext = createContext({} as ReturnType<typeof useGameContextValue>)
export const layoutContext = createContext<any>({} as ReturnType<typeof useLayoutContext>)
