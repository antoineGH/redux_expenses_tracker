import React from 'react'
import { Card, Switch, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

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
					<Button
						onClick={() => handleDeleteTodo(todo.todo_id)}
						loading={isLoadingDelete}
						icon={<CloseOutlined />}></Button>
				}
				style={{ width: 300 }}>
				{todo.length >= 1 && (
					<p className='text-capitalize'>
						{user['first_name']} {user['last_name']}
					</p>
				)}
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
