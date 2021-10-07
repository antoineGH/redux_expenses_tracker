import React from 'react'
import './Todo.css'
import { useDispatch } from 'react-redux'
import { deleteTodo, toggleCheck } from '../../features/todos/todosSlice'

export default function Todo(props) {
	const { todo } = props
	const dispatch = useDispatch()

	return (
		<div className='container-todo'>
			<span>{todo.description}</span>
			<input
				type='checkbox'
				// defaultChecked={todo.completed}
				checked={todo.completed}
				onChange={() => dispatch(toggleCheck(todo.description))}
			/>
			<button
				className='btn-delete'
				onClick={() => dispatch(deleteTodo(todo.description))}>
				&#9587;
			</button>
		</div>
	)
}
