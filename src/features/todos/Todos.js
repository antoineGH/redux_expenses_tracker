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
import { css } from '@emotion/react'
import BarLoader from 'react-spinners/BarLoader'

export default function Todos() {
	const todos = useSelector(selectTodos)
	const isLoading = useSelector(selectIsLoading)
	const hasError = useSelector(selectHasError)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadTodos())
	}, [dispatch])

	const handleAddTodo = (addTodoDesc) => {
		if (todos.some((todo) => todo.description === addTodoDesc)) return
		dispatch(addTodo(addTodoDesc))
	}

	const handleDeleteTodo = (deleteTodoDesc) => {
		dispatch(deleteTodo(deleteTodoDesc))
	}

	const handleToggleTodo = (toggleTodoDesc) => {
		dispatch(toggleCheck(toggleTodoDesc))
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
