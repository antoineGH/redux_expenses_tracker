import React from 'react'
import { logout } from '../../auth/authHook'
import { Layout } from 'antd'
import './Navbar.css'

export default function Navbar(props) {
	const { logged } = props
	const { Header } = Layout
	return (
		<>
			<Header>Header</Header>
			{/* <div>
				<button onClick={logout}>Logout</button>
			</div> */}
		</>
	)
}
