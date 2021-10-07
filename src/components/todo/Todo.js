import React from 'react'
import './Todo.css'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../../features/todos/todosSlice'

export default function Todo(props) {
	const { todo } = props
	const dispatch = useDispatch()

	const handleDelete = () => {
		console.log('Delete')
		console.log('Todo Description => ' + todo.description)
		dispatch(deleteTodo(todo.description))
	}

	return (
		<div className='container-todo'>
			<span>{todo.description}</span>
			<input type='checkbox' defaultChecked={todo.completed} />
			<button className='btn-delete' onClick={handleDelete}>
				&#9587;
			</button>
		</div>
	)
}
