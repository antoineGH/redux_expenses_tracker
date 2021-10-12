import './App.css'
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
			{!logged && <UnAuthApp />}
			{logged && <AuthApp />}
		</div>
	)
}

export default App
