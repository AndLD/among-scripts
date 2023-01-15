import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { appSlice } from '../store/app.reducer'
import { API_URL } from '../utils/constants'

export function useSocket() {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.appReducer.token)

    useEffect(() => {
        if (token) {
            const socket = io(API_URL, {
                withCredentials: true,
                reconnectionDelay: 1000,
                auth: {
                    token
                }
            })

            socket.on('hello', () => console.log('hello emitted'))

            socket.on('connected', () => {
                dispatch(appSlice.actions.setSocket(socket))
            })
        } else {
            dispatch(appSlice.actions.setSocket(null))
        }
    }, [token])
}
