import React from 'react'
import Title from '../title/Title'
import Navbar from '../navbar/Navbar'
import Todos from '../../features/todos/Todos'

export default function AuthApp() {
	return (
		<>
			<Navbar />
			<Title />
			<Todos />
		</>
	)
}
