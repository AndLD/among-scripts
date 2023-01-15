import LogoutBtn from '../components/Forbidden/LogoutBtn'
import { gameContext } from '../contexts'
import useGameContextValue from '../hooks/pages/Game'
import { useTitle } from '../hooks/pages/layout'
import { useSocket } from '../hooks/socket'
import '../styles/Game.scss'

export default function Game() {
    useTitle('Game')
    useSocket()

    return (
        <gameContext.Provider value={useGameContextValue()}>
            <div>Game</div>
            <LogoutBtn />
        </gameContext.Provider>
    )
}
