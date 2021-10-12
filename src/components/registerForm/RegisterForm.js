import React from 'react'
import { useHistory } from 'react-router'

export default function RegisterForm() {
	const history = useHistory()
	return (
		<>
			<div>
				<h1>Register</h1>
				<button onClick={() => history.push('/login')}>Login</button>
			</div>
		</>
	)
}
