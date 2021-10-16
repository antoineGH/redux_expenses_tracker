import React from 'react'
import Todo from '../todo/Todo'
import { Col } from 'antd'

import './TodoList.css'

export default function TodoList(props) {
	const {
		todos,
		user,
		sort,
		handleDeleteTodo,
		handleToggleTodo,
		isLoadingDelete,
		isLoadingToggleTodo,
	} = props

	const sortAsc = (a, b) => {
		return a.todo_id > b.todo_id ? 1 : -1
	}
	const sortDesc = (a, b) => {
		return a.todo_id < b.todo_id ? 1 : -1
	}

	return (
		<>
			{[]
				.concat(todos)
				.sort(sort ? sortAsc : sortDesc)
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
