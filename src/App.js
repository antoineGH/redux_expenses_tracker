import './App.css'
import { BrowserRouter, Switch } from 'react-router-dom'
import { useAuth } from './auth/authHook'
import UnAuthApp from './components/unAuthApp/UnAuthApp'
import AuthApp from './components/authApp/AuthApp'
import getPayload from './utils/getPayload'

function App() {
	const [logged] = useAuth()
	let payload = ''
	if (logged) {
		payload = getPayload()
	}
	console.log(payload)

	return (
		<div className='App'>
			<BrowserRouter>
				<Switch>
					{!logged && <UnAuthApp />}
					{logged && <AuthApp />}
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
