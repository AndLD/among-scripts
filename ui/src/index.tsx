import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { setupStore } from './store'
import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={setupStore()}>
        <App />
    </Provider>
)
