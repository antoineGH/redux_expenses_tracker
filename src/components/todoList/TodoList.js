import React from 'react'
import Todo from '../todo/Todo'
import { Row, Col } from 'antd'
import './TodoList.css'

export default function TodoList(props) {
	const {
		todos,
		handleDeleteTodo,
		handleToggleTodo,
		isLoadingDelete,
		isLoadingToggleTodo,
	} = props
	return (
		<Row className='container-todolist'>
			{todos.map((todo, count) => {
				count++
				return (
					<Col key={todo.todo_id}>
						<Todo
							count={count}
							todo={todo}
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
