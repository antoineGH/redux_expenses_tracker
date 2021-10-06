import React from 'react'
import './Todo.css'

export default function Todo(props) {
	const { todo } = props
	return (
		<div className='container-todo'>
			<span>{todo.description}</span>
			<input type='checkbox' defaultChecked={todo.completed} />
			<button>Delete</button>
		</div>
	)
}
