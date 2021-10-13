import './App.css'
import { BrowserRouter, Switch } from 'react-router-dom'
import { useAuth } from './auth/authHook'
import UnAuthApp from './layouts/UnAuthApp'
import AuthApp from './layouts/AuthApp'
import getPayload from './utils/getPayload'
import Navbar from './components/navbar/Navbar'
import SiderTodo from './components/siderTodo/SiderTodo'
import FooterTodo from './components/footerTodo/FooterTodo'
import { Layout } from 'antd'

function App() {
	const { Content } = Layout
	const [logged] = useAuth()
	let payload = ''
	if (logged) {
		payload = getPayload()
	}
	console.log('Payload => ' + payload)
	// Store Payload in Redux Store

	return (
		<div className='App'>
			<BrowserRouter>
				<Layout>
					<SiderTodo />
					<Layout>
						<Navbar payload={payload} logged={logged} />
						<Content>
							<div>
								<Switch>
									{!logged && <UnAuthApp />}
									{logged && <AuthApp />}
								</Switch>
							</div>
						</Content>
						<FooterTodo />
					</Layout>
				</Layout>
			</BrowserRouter>
		</div>
	)
}

export default App
