import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Todos from '../features/todos/Todos'
import UserForm from '../components/userForm/UserForm'

export default function AuthApp() {
	return (
		<>
			<Switch>
				<Route path='/todo' component={Todos} />
				<Route path='/user' component={UserForm} />
				<Redirect from='*' to='/todo' />
			</Switch>
		</>
	)
}
