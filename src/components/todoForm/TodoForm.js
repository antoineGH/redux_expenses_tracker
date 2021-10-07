import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../../features/todos/todosSlice'
import { selectTodos } from '../../features/todos/todosSlice'

export default function TodoForm(props) {
	const [addTodoValue, setAddTodoValue] = useState('')
	const dispatch = useDispatch()
	const todos = useSelector(selectTodos)

	const handleAddTodo = () => {
		if (!addTodoValue) return
		if (todos.some((todo) => todo.description === addTodoValue)) return

		dispatch(addTodo(addTodoValue))
		setAddTodoValue('')
	}

	return (
		<div>
			<input
				className='input-todo'
				aria-label='New Todo'
				placeholder='New Todo'
				value={addTodoValue}
				onChange={(e) => setAddTodoValue(e.target.value)}
			/>
			<button className='btn-addtodo' onClick={handleAddTodo}>
				Add Todo
			</button>
		</div>
	)
}
