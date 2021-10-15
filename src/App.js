import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Switch } from 'react-router-dom'
import { useAuth } from './auth/authHook'
import Navbar from './components/navbar/Navbar'
import UnAuthApp from './layouts/UnAuthApp'
import AuthApp from './layouts/AuthApp'
import SiderTodo from './components/siderTodo/SiderTodo'
import FooterTodo from './components/footerTodo/FooterTodo'
import { Layout } from 'antd'
import { useDispatch } from 'react-redux'
import { loadUser, selectUser } from './features/user/userSlice'
import { useSelector } from 'react-redux'

function App() {
	const { Content } = Layout
	const [logged] = useAuth()

	const dispatch = useDispatch()
	useEffect(() => {
		if (logged) {
			dispatch(loadUser())
		}
	}, [dispatch, logged])

	const user = useSelector(selectUser)

	return (
		<div className='App'>
			<BrowserRouter>
				<Layout>
					<SiderTodo />
					<Layout>
						{logged ? (
							<Navbar logged={true} user={user} />
						) : (
							<Navbar logged={false} user='' />
						)}
						<Content>
							<div className='div-content'>
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
