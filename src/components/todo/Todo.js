import React from 'react'
import { Card, Switch } from 'antd'
import './Todo.css'

export default function Todo(props) {
	const {
		todo,
		user,
		count,
		handleDeleteTodo,
		handleToggleTodo,
		isLoadingDelete,
		isLoadingToggleTodo,
	} = props

	return (
		<>
			<Card
				title={todo.todo_description}
				extra={
					<button
						className='btn-delete'
						onClick={() => handleDeleteTodo(todo.todo_id)}
						disabled={isLoadingDelete}>
						&#9587;
					</button>
				}
				style={{ width: 300 }}>
				{/* <p className='text-capitalize'>
					{user['first_name']} {user['last_name']}
				</p> */}
				<p>Todo n°{count}</p>
				<p>Status</p>
				<Switch
					id='completed'
					name='completed'
					onChange={() =>
						handleToggleTodo(todo.todo_id, !todo.completed)
					}
					defaultChecked={todo.completed}
					disabled={isLoadingToggleTodo}
				/>
			</Card>
		</>
	)
}
