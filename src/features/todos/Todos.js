import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	selectTodos,
	selectIsLoading,
	selectHasError,
	addTodo,
	deleteTodo,
	toggleCheck,
	loadTodos,
} from './todosSlice'
import './Todos.css'
import TodoForm from '../../components/todoForm/TodoForm'
import TodoList from '../../components/todoList/TodoList'
import BarLoader from 'react-spinners/BarLoader'

export default function Todos() {
	const todos = useSelector(selectTodos)
	const isLoading = useSelector(selectIsLoading)
	const hasError = useSelector(selectHasError)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadTodos())
	}, [dispatch])

	const handleAddTodo = (todo_id) => {
		if (todos.some((todo) => todo.todo_id === todo_id)) return
		dispatch(addTodo(todo_id))
	}

	const handleDeleteTodo = (todo_id) => {
		dispatch(deleteTodo(todo_id))
	}

	const handleToggleTodo = (todo_id) => {
		dispatch(toggleCheck(todo_id))
	}

	const handleTryAgain = () => {
		dispatch(loadTodos())
	}

	return (
		<>
			<TodoForm handleAddTodo={handleAddTodo} />
			{isLoading && (
				<div className='div-barloader'>
					<BarLoader
						css='display: flex; justify-content: center;'
						color={'#0075ff'}
						size={15}
					/>
				</div>
			)}
			{hasError ? (
				<>
					<p>Error Fetching the API.</p>
					<button onClick={handleTryAgain}>Try Again</button>
				</>
			) : (
				<TodoList
					todos={todos}
					handleDeleteTodo={handleDeleteTodo}
					handleToggleTodo={handleToggleTodo}
				/>
			)}
		</>
	)
}
