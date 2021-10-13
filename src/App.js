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
	console.log(payload)
	// Store Payload in Redux Store

	return (
		<div className='App'>
			<BrowserRouter>
				<Layout>
					<SiderTodo />
					<Layout>
						<Navbar />
						<Switch>
							<Content>
								<div>
									{!logged && <UnAuthApp />}
									{logged && <AuthApp />}
								</div>
							</Content>
							<FooterTodo />
						</Switch>
					</Layout>
				</Layout>
			</BrowserRouter>
		</div>
	)
}

export default App
