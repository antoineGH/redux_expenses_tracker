import React from 'react'
import './Todo.css'

export default function Todo(props) {
	const { todo, handleDeleteTodo, handleToggleTodo } = props

	return (
		<div className='container-todo'>
			<span>{todo.description}</span>
			<input
				type='checkbox'
				checked={todo.completed}
				onChange={() => handleToggleTodo(todo.description)}
			/>
			<button
				className='btn-delete'
				onClick={() => handleDeleteTodo(todo.description)}>
				&#9587;
			</button>
		</div>
	)
}
