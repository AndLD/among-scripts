import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { appSlice } from '../store/app.reducer'
import { API_URL } from '../utils/constants'
import { IUserState } from '../utils/interfaces/user'

export function useSocket() {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.appReducer.token)

    useEffect(() => {
        if (token && jwtDecode<{ user: IUserState }>(token)?.user.active) {
            const socket = io(API_URL, {
                withCredentials: true,
                reconnectionDelay: 1000,
                extraHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })

            socket.on('connected', () => {
                dispatch(appSlice.actions.setSocket(socket))
            })
        } else {
            dispatch(appSlice.actions.setSocket(null))
        }
    }, [token])
}
