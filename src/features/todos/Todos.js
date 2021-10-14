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
import { openNotificationWithIcon } from '../../utils/notification'
import { Spin, Typography } from 'antd'

export default function Todos() {
	const todos = useSelector(selectTodos)
	const isLoading = useSelector(selectIsLoading)
	const hasError = useSelector(selectHasError)
	const dispatch = useDispatch()
	const { Title } = Typography

	useEffect(() => {
		dispatch(loadTodos())
	}, [dispatch])

	const handleAddTodo = (todo_description, isCompleted) => {
		if (!todo_description) {
			openNotificationWithIcon(
				'info',
				'No Changes',
				'Todo was not saved.'
			)
			return
		}
		dispatch(addTodo({ todo_description, isCompleted }))
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
			<Title level={2}>Todos</Title>
			<TodoForm handleAddTodo={handleAddTodo} />
			{isLoading && (
				<div className='div-barloader'>
					<Spin />
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
