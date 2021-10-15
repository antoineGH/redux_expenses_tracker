import React from 'react'
import { Row, Col, Card, Switch, Button } from 'antd'
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
				{user && (
					<Row>
						<Col span={24}>
							<p className='text-capitalize'>
								{user['first_name']} {user['last_name']}
							</p>
						</Col>
					</Row>
				)}

				<p>Todo n°{count}</p>
				<Row justify='center'>
					<Col span={5}>
						<p>Status:</p>
					</Col>
					<Col span={5}>
						<Switch
							id='completed'
							name='completed'
							onChange={() =>
								handleToggleTodo(todo.todo_id, !todo.completed)
							}
							defaultChecked={todo.completed}
							disabled={isLoadingToggleTodo}
						/>
					</Col>
				</Row>
			</Card>
		</>
	)
}
