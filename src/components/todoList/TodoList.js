import React from 'react'
import Todo from '../todo/Todo'
import { Col } from 'antd'

import './TodoList.css'

export default function TodoList(props) {
	const {
		todos,
		user,
		sort,
		sortBy,
		searchParam,
		handleDeleteTodo,
		handleToggleTodo,
		isLoadingDelete,
		isLoadingToggleTodo,
	} = props

	const sortDateAsc = (a, b) => {
		return a.todo_id > b.todo_id ? 1 : -1
	}
	const sortDateDesc = (a, b) => {
		return a.todo_id < b.todo_id ? 1 : -1
	}

	const sortCompletedAsc = (a, b) => {
		return a.completed === b.completed ? 0 : a.completed ? -1 : 1
	}

	const sortCompletedDesc = (a, b) => {
		return a.completed === b.completed ? 0 : a.completed ? 1 : -1
	}

	const selectSort = (a, b) => {
		if (sort && sortBy === 'Status') return sortCompletedAsc(a, b)
		if (!sort && sortBy === 'Status') return sortCompletedDesc(a, b)
		if (sort && sortBy === 'Date') return sortDateAsc(a, b)
		return sortDateDesc(a, b)
	}

	return (
		<>
			{[]
				.concat(todos)
				.sort(selectSort)
				.map((todo) => {
					return (
						<Col key={todo.todo_id} className='col-todo' span={7}>
							<Todo
								todo={todo}
								user={user}
								handleDeleteTodo={handleDeleteTodo}
								handleToggleTodo={handleToggleTodo}
								isLoadingDelete={isLoadingDelete}
								isLoadingToggleTodo={isLoadingToggleTodo}
							/>
						</Col>
					)
				})}
		</>
	)
}
