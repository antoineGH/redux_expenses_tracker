import React from 'react'
import Todo from '../todo/Todo'
import { Row, Col } from 'antd'
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
		<Row className='container-todolist'>
			{[]
				.concat(todos)
				.sort((a, b) => (a.todo_id > b.todo_id ? 1 : -1))
				.map((todo, count) => {
					return (
						<Col key={todo.todo_id}>
							<Todo
								count={count + 1}
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
		</Row>
	)
}
