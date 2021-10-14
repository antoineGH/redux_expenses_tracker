import React from 'react'
import './Todo.css'

export default function Todo(props) {
	const { todo, handleDeleteTodo, handleToggleTodo } = props

	return (
		<div className='container-todo'>
			<span>{todo.todo_description}</span>
			<input
				type='checkbox'
				checked={todo.completed}
				onChange={() => handleToggleTodo(todo.todo_id, !todo.completed)}
			/>
			<button
				className='btn-delete'
				onClick={() => handleDeleteTodo(todo.todo_id)}>
				&#9587;
			</button>
		</div>
	)
}
