import React, { useState } from 'react'
import { useHistory } from 'react-router'

export default function LoginForm() {
	const history = useHistory()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const hanldeSubmit = () => {
		console.log('submit')
		console.log(email)
		console.log(password)
	}

	return (
		<>
			<div>
				<h1>Login</h1>
				<input
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={hanldeSubmit}>Login</button>
			</div>
			<div>
				<button onClick={() => history.push('/register')}>
					Register
				</button>
			</div>
		</>
	)
}
