import React from 'react'
import { logout } from '../../auth/authHook'

export default function Navbar() {
	return (
		<>
			<div>
				<button onClick={logout}>Logout</button>
			</div>
		</>
	)
}
