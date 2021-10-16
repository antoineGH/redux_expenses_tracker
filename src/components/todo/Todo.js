import React from 'react'
import { Row, Col, Card, Switch, Button, Typography } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

export default function Todo(props) {
	const {
		todo,
		user,
		handleDeleteTodo,
		handleToggleTodo,
		isLoadingDelete,
		isLoadingToggleTodo,
	} = props
	const { Text, Title } = Typography

	return (
		<>
			<Card className='todoCard' style={{ width: 300 }}>
				<Row>
					<Col span={22} className='col-titleTodo'>
						<Title level={4} className='text-capitalize'>
							{todo.todo_description}
						</Title>
					</Col>
					<Col span={1} className='col-btnClose'>
						<Button
							className='btn-closetodo'
							onClick={() => handleDeleteTodo(todo.todo_id)}
							loading={isLoadingDelete}
							icon={<CloseOutlined />}></Button>
					</Col>
				</Row>
				<Row></Row>

				{user && (
					<Row>
						<Col span={20} className='col-userTodo'>
							<Text
								className='text-capitalize'
								style={{
									fontSize: '.9rem',
								}}>
								for {user['first_name']} {user['last_name']}
							</Text>
						</Col>
					</Row>
				)}
				<Row>
					<Col span={24} className='col-switchTodo'>
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
