import { gameContext } from '../contexts'
import useGameContextValue from '../hooks/pages/Game'
import { useTitle } from '../hooks/pages/layout'
import '../styles/Game.scss'

export default function Game() {
    useTitle('Game')

    return (
        <gameContext.Provider value={useGameContextValue()}>
            <div>Game</div>
        </gameContext.Provider>
    )
}
