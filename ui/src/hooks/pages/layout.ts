import { useContext, useEffect, useReducer, useState } from 'react'
import { layoutContext } from '../../contexts'

export default function useLayoutContext() {
    const [title, setTitle] = useReducer((state: string | null, newTitle: string | null) => {
        document.title = newTitle || 'Among Scripts'
        return newTitle
    }, 'Among Scripts')
    const [backPath, setBackPath] = useState<string | null>(null)

    return {
        titleState: [title, setTitle],
        backPathState: [backPath, setBackPath]
    }
}

export function useTitle(title: string) {
    const [_, setTitle] = useContext(layoutContext).titleState

    useEffect(() => {
        setTitle(title)
    }, [])
}

export function useBackPath(path: string) {
    const [_, setBackPath] = useContext(layoutContext).backPathState

    useEffect(() => {
        setBackPath(path)
    }, [])
}
