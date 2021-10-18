import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	selectTodos,
	selectIsLoading,
	selectHasError,
	addTodo,
	deleteTodo,
	toggleCheck,
	loadTodos,
	selectIsLoadingAddTodo,
	selectIsLoadingDeleteTodo,
	selectIsLoadingToggleTodo,
} from './todosSlice'
import { selectUser } from '../user/userSlice'
import './Todos.css'
import TopMenu from '../../components/topMenu/TopMenu'
import TodoList from '../../components/todoList/TodoList'
import { openNotificationWithIcon } from '../../utils/notification'
import { Spin, Typography, Row, Col, Button } from 'antd'

export default function Todos() {
	const todos = useSelector(selectTodos)
	const user = useSelector(selectUser)
	const isLoading = useSelector(selectIsLoading)
	const hasError = useSelector(selectHasError)
	const isLoadingAddTodo = useSelector(selectIsLoadingAddTodo)
	const isLoadingDeleteTodo = useSelector(selectIsLoadingDeleteTodo)
	const isLoadingToggleTodo = useSelector(selectIsLoadingToggleTodo)
	const dispatch = useDispatch()
	const { Title } = Typography

	const [sort, setSort] = useState(true)
	const [sortBy, setSortBy] = useState('Date')

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

	const handleToggleTodo = (todo_id, completed) => {
		// sortBy if Date dispatch ToggleDate, if Status dispatch ToggleStatus
		console.log('Dispatch by =>' + sortBy)
		// dispatch(toggleCheck({ todo_id, completed }))
	}

	const handleTryAgain = () => {
		dispatch(loadTodos())
	}

	return (
		<>
			<Title level={2}>Todos</Title>
			<Row justify='flex-start' align='middle' className='row-topmenu'>
				<TopMenu
					todos={todos}
					sortBy={sortBy}
					setSortBy={setSortBy}
					sort={sort}
					setSort={setSort}
					handleAddTodo={handleAddTodo}
					isLoadingAdd={isLoadingAddTodo}
					user={user}
				/>
			</Row>
			<Row className='row-todolist'>
				{hasError && (
					<Col className='col-notodo'>
						<p>Error Fetching the API.</p>
						<Button onClick={handleTryAgain}>Try Again</Button>
					</Col>
				)}
				{isLoading && (
					<Col className='div-barloader'>
						<Spin />
					</Col>
				)}
				{!isLoading && (
					<TodoList
						todos={todos}
						user={user}
						sort={sort}
						sortBy={sortBy}
						handleDeleteTodo={handleDeleteTodo}
						handleToggleTodo={handleToggleTodo}
						isLoadingDelete={isLoadingDeleteTodo}
						isLoadingToggleTodo={isLoadingToggleTodo}
					/>
				)}
				{!hasError && !isLoading && todos.length === 0 && (
					<p>No Todos</p>
				)}
			</Row>
		</>
	)
}
