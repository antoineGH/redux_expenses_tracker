import React from 'react'
import Todo from '../todo/Todo'
import { Col } from 'antd'

import './TodoList.css'

export default function TodoList(props) {
	const {
		todos,
		user,
		handleDeleteTodo,
		handleToggleTodo,
		isLoadingDelete,
		isLoadingToggleTodo,
	} = props

	return (
		<>
			{[]
				.concat(todos)
				.sort((a, b) => (a.todo_id > b.todo_id ? 1 : -1))
				.map((todo) => {
					return (
						<Col key={todo.todo_id} className='col-todo'>
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
